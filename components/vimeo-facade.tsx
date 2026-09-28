import type { ReactElement } from "react"
import Image from "next/image"
import { Play } from "lucide-react"

import { LazyEmbedFacade } from "@/components/lazy-embed-facade"

interface VimeoPoster {
  thumbnailUrl: string
  durationSeconds?: number
}

const VIMEO_PLAYER_PARAMS = "title=0&byline=0&portrait=0"
const VIMEO_THUMBNAIL_PREFIX = "https://i.vimeocdn.com/video/"

/**
 * Poster metadata from Vimeo's public oEmbed endpoint (no API key). Fetched while
 * the page is statically rendered and kept in the Next data cache, so visitors never
 * call Vimeo for it. Any failure (network, rate limit, unexpected shape) returns null
 * and the facade falls back to a branded gradient poster.
 */
async function getVimeoPoster(vimeoId: string): Promise<VimeoPoster | null> {
  if (!/^\d+$/.test(vimeoId)) {
    return null
  }

  try {
    const endpoint = `https://vimeo.com/api/oembed.json?url=${encodeURIComponent(
      `https://vimeo.com/${vimeoId}`,
    )}&width=1280`
    const response = await fetch(endpoint, {
      cache: "force-cache",
      signal: AbortSignal.timeout(5000),
    })
    if (!response.ok) {
      return null
    }

    const data: unknown = await response.json()
    if (!data || typeof data !== "object") {
      return null
    }

    const { thumbnail_url: thumbnailUrl, duration } = data as { thumbnail_url?: unknown; duration?: unknown }
    if (typeof thumbnailUrl !== "string" || !thumbnailUrl.startsWith(VIMEO_THUMBNAIL_PREFIX)) {
      return null
    }

    return {
      thumbnailUrl,
      durationSeconds: typeof duration === "number" && duration > 0 ? Math.round(duration) : undefined,
    }
  } catch {
    return null
  }
}

function formatRuntime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${minutes}:${seconds.toString().padStart(2, "0")}`
}

interface VimeoFacadeProps {
  vimeoId: string
  title: string
  /** `sizes` for the poster image; defaults to a half-width card on desktop. */
  sizes?: string
}

/**
 * Click-to-play Vimeo embed. Ships a static poster + play button instead of the
 * Vimeo player (~400 KB, ~20 requests per video); the player iframe loads with
 * autoplay only after the visitor presses play.
 */
async function VimeoFacadeServer({
  vimeoId,
  title,
  sizes = "(min-width: 768px) 50vw, 100vw",
}: VimeoFacadeProps) {
  const poster = await getVimeoPoster(vimeoId)
  const src = `https://player.vimeo.com/video/${vimeoId}?${VIMEO_PLAYER_PARAMS}`
  const runtime = poster?.durationSeconds ? formatRuntime(poster.durationSeconds) : null

  return (
    <LazyEmbedFacade
      className="group relative aspect-video overflow-hidden bg-brand-merlot"
      activeClassName="relative aspect-video overflow-hidden bg-black"
      iframe={{
        src,
        title,
        allow: "autoplay; fullscreen; picture-in-picture",
        allowFullScreen: true,
        className: "absolute inset-0",
      }}
      activeSrc={`${src}&autoplay=1`}
      poster={
        <>
          {poster ? (
            <Image
              src={poster.thumbnailUrl}
              alt=""
              fill
              sizes={sizes}
              className="object-cover"
            />
          ) : (
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-br from-brand-merlot via-brand-merlot to-brand-rose-beige"
            />
          )}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-black/25" />
          {runtime && poster?.durationSeconds ? (
            <span className="pointer-events-none absolute bottom-3 right-3 z-10 rounded-sm bg-black/75 px-2 py-1 text-sm font-semibold text-white">
              <span className="sr-only">Video length </span>
              <time dateTime={`PT${poster.durationSeconds}S`}>{runtime}</time>
            </span>
          ) : null}
        </>
      }
      triggerLabel={`Play video: ${title}`}
      triggerClassName="group/play absolute inset-0 flex h-full w-full items-center justify-center focus-visible:shadow-none focus-visible:outline-white focus-visible:outline-offset-[-6px]"
      trigger={
        <span className="inline-flex min-h-11 items-center gap-2 rounded-full bg-white/95 px-5 py-3 font-semibold text-brand-merlot shadow-lg ring-offset-2 ring-offset-white transition-transform duration-200 group-hover:scale-105 group-focus-visible/play:ring-4 group-focus-visible/play:ring-brand-merlot motion-reduce:transition-none motion-reduce:group-hover:scale-100">
          <Play aria-hidden="true" focusable="false" className="h-5 w-5 fill-current" />
          Play video
        </span>
      }
    />
  )
}

/**
 * Async Server Component. The cast only works around the installed @types/react
 * (19.0.0), whose JSX constructor type does not yet accept Promise-returning
 * components; Next renders async server components natively.
 */
export const VimeoFacade = VimeoFacadeServer as unknown as (props: VimeoFacadeProps) => ReactElement
