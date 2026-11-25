// Run from the repository root with Node 22 and Playwright Chromium installed.
import { mkdir, readFile } from "node:fs/promises"
import { dirname } from "node:path"
import { chromium } from "@playwright/test"
import { shareImagePath, sitePages } from "../lib/site-pages.ts"

async function dataUrl(path, type) {
  const bytes = await readFile(path)
  return `data:${type};base64,${bytes.toString("base64")}`
}

const [serif, sans, mark, sonoma, molar] = await Promise.all([
  dataUrl("app/fonts/playfair-display-latin-400.woff2", "font/woff2"),
  dataUrl("app/fonts/source-sans-3-latin-600.woff2", "font/woff2"),
  dataUrl("public/icons/molar-180.png", "image/png"),
  dataUrl("scripts/share-art/sonoma.jpg", "image/jpeg"),
  dataUrl("scripts/share-art/molar.jpg", "image/jpeg"),
])
const browser = await chromium.launch()
try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 } })
  await page.setContent(`
    <style>
      @font-face{font-family:Playfair;src:url(${serif})}
      @font-face{font-family:Source;src:url(${sans})}
      *{box-sizing:border-box}
      body{margin:0;color:#571a2a;font-family:Source;background:#fbead4}
      main{position:relative;width:1200px;height:630px;overflow:hidden}
      .art,.wash{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
      .wash{background:linear-gradient(90deg,#fbecd9 4%,rgba(251,236,217,.98) 29%,rgba(251,236,217,.90) 42%,rgba(251,236,217,0) 65%)}
      .copy{position:absolute;inset:60px 0 62px 64px;width:552px;display:flex;flex-direction:column;align-items:flex-start}
      header{display:flex;align-items:center;gap:16px;font-size:26px}
      header img{width:54px;height:54px;border-radius:11px}
      h1{margin:auto 0;width:100%;font:76px/1.07 Playfair;letter-spacing:-.045em;text-wrap:balance}
      footer{border-top:2px solid #9c6e65;padding-top:14px;font-size:23px;letter-spacing:.015em}
    </style>
    <main><img class="art" alt=""><div class="wash"></div><div class="copy">
      <header><img src="${mark}" alt=""><span></span></header><h1></h1><footer></footer>
    </div></main>`)
  await mkdir(dirname("public" + shareImagePath("/")), { recursive: true })
  for (const { path, name, group } of sitePages) {
    const home = path === "/"
    const clinical = group === "guides" || group === "treatments"
    const title = home ? "Wine Country Root Canal" : name.replace(/ in Santa Rosa(?:, CA)?$/, "")
    await page.evaluate(async ({ home, title, art }) => {
      const background = document.querySelector(".art")
      background.src = art
      document.querySelector("header span").textContent = home ? "Santa Rosa, California" : "Wine Country Root Canal"
      document.querySelector("footer").textContent = home ? "Specialist endodontic care" : "Santa Rosa, California"
      const heading = document.querySelector("h1")
      heading.textContent = title
      heading.style.fontSize = home ? "92px" : "76px"
      await document.fonts.ready
      await Promise.all(Array.from(document.images, (img) => img.decode()))
      while (heading.offsetHeight > 280 && parseFloat(heading.style.fontSize) > 54) {
        heading.style.fontSize = (parseFloat(heading.style.fontSize) - 2) + "px"
      }
    }, { home, title, art: clinical ? molar : sonoma })
    const file = "public" + shareImagePath(path)
    await page.screenshot({ path: file, type: "jpeg", quality: 88 })
  }
} finally {
  await browser.close()
}
