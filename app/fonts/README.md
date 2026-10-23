# Site fonts

Playfair Display (400/700) and Source Sans 3 (400/italic, 500, 600, 700)
latin `.woff2` files, served with `next/font/local`.

These used to load through `next/font/google`. Next.js 15.5.28 still crashes the
webpack build when Google Fonts returns an extensionless `/l/font?kit=` URL
(vercel/next.js#99114). Vendoring the files keeps CI and preview builds offline
for fonts.

Source Sans 3 500, 700, and italic were added from the official Adobe release
(`adobe-fonts/source-sans` `release` WOFF2/TTF), then subset to the same latin
Unicode range as the existing 400/600 files so `font-medium`, `<strong>`, and
`<em>` do not synthesize those faces.

Both families are SIL Open Font License 1.1 (`OFL-Playfair-Display.txt`,
`OFL-Source-Sans-3.txt`).
