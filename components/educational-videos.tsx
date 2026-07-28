import { Card } from "@/components/ui/card"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import Link from "next/link"

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
      <div className="text-center">
        <h2 className="font-serif text-2xl sm:text-3xl text-brand-merlot mb-4">{title}</h2>
        {description && <p className="text-base sm:text-lg text-brand-dark-text/80 max-w-3xl mx-auto">{description}</p>}
      </div>
      <div className={`grid gap-8 ${videos.length === 2 ? "md:grid-cols-2" : "max-w-2xl mx-auto"}`}>
        {videos.map((video) => {
          const writtenGuide = writtenGuidesByVideoId[video.vimeoId]
          const writtenGuideHref = video.writtenGuideHref ?? writtenGuide?.href
          const writtenGuideLabel = video.writtenGuideLabel ?? writtenGuide?.label

          return (
            <Card key={video.vimeoId} className="overflow-hidden shadow-lg">
              <AspectRatio ratio={16 / 9}>
                <iframe
                  src={`https://player.vimeo.com/video/${video.vimeoId}?title=0&byline=0&portrait=0`}
                  allow="fullscreen; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                  title={video.title}
                  className="w-full h-full"
                />
              </AspectRatio>
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
                  <p>
                    A word-for-word transcript is not currently published.{" "}
                    <Link
                      href="/accessibility#request-help"
                      className="font-medium text-brand-merlot underline underline-offset-4"
                    >
                      Request this video in an accessible format
                    </Link>
                    .
                  </p>
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
