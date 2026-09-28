import { Card } from "@/components/ui/card"
import { VimeoFacade } from "@/components/vimeo-facade"
import Link from "next/link"
import { ChevronDown } from "lucide-react"

interface VideoProps {
  title: string
  description: string
  vimeoId: string
  writtenGuideHref?: string
  writtenGuideLabel?: string
}

interface EducationalVideosProps {
  videos: VideoProps[]
  title?: string
  description?: string
  className?: string
}

const writtenGuidesByVideoId: Record<string, { href: string; label: string }> = {
  "1095465278": {
    href: "/endodontic-procedures/root-canal-therapy",
    label: "Read our root canal therapy guide",
  },
  "1095465301": {
    href: "/resources/after-your-root-canal",
    label: "Read our aftercare guide",
  },
}

export function EducationalVideos({
  videos,
  title = "Dr. Anderson Explains",
  description,
  className = "",
}: EducationalVideosProps) {
  return (
    <div className={`space-y-8 ${className}`}>
      <div>
        <h2 className="font-serif text-2xl sm:text-3xl text-brand-merlot mb-4">{title}</h2>
        {description && <p className="text-base sm:text-lg text-brand-dark-text/80 max-w-3xl">{description}</p>}
      </div>
      <div className={`grid gap-8 ${videos.length === 2 ? "md:grid-cols-2" : "max-w-2xl"}`}>
        {videos.map((video) => {
          const writtenGuide = writtenGuidesByVideoId[video.vimeoId]
          const writtenGuideHref = video.writtenGuideHref ?? writtenGuide?.href
          const writtenGuideLabel = video.writtenGuideLabel ?? writtenGuide?.label

          return (
            <Card key={video.vimeoId} className="overflow-hidden shadow-lg">
              <VimeoFacade
                vimeoId={video.vimeoId}
                title={video.title}
                sizes={videos.length === 2 ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 672px) 672px, 100vw"}
              />
              <div className="p-6">
                <h3 className="font-serif text-xl text-brand-dark-text mb-3">{video.title}</h3>
                <p className="text-brand-dark-text/80">{video.description}</p>
                <div className="mt-4 space-y-2 text-sm text-brand-dark-text">
                  {writtenGuideHref && writtenGuideLabel && (
                    <p>
                      <Link href={writtenGuideHref} className="font-medium text-brand-merlot underline underline-offset-4">
                        {writtenGuideLabel}
                      </Link>
                      .
                    </p>
                  )}
                  <details className="group">
                    <summary className="inline-flex min-h-11 cursor-pointer list-none items-center gap-1 font-medium text-brand-merlot underline underline-offset-4 [&::-webkit-details-marker]:hidden">
                      Transcript and accessible formats
                      <ChevronDown
                        aria-hidden="true"
                        focusable="false"
                        className="h-4 w-4 shrink-0 transition-transform group-open:rotate-180 motion-reduce:transition-none"
                      />
                    </summary>
                    <p className="mt-1">
                      A word-for-word transcript is not currently published.{" "}
                      <Link
                        href="/accessibility#request-help"
                        className="font-medium text-brand-merlot underline underline-offset-4"
                      >
                        Request this video in an accessible format
                      </Link>
                      .
                    </p>
                  </details>
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
