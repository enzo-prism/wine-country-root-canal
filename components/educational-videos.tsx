import { Card } from "@/components/ui/card"
import { AspectRatio } from "@/components/ui/aspect-ratio"

interface VideoProps {
  title: string
  description: string
  vimeoId: string
}

interface EducationalVideosProps {
  videos: VideoProps[]
  title?: string
  description?: string
  className?: string
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
        {videos.map((video, index) => (
          <Card key={index} className="overflow-hidden shadow-lg">
            <AspectRatio ratio={16 / 9}>
              <iframe
                src={`https://player.vimeo.com/video/${video.vimeoId}?title=0&byline=0&portrait=0`}
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
                title={video.title}
                className="w-full h-full"
              />
            </AspectRatio>
            <div className="p-6">
              <h3 className="font-serif text-xl text-brand-dark-text mb-3">{video.title}</h3>
              <p className="text-brand-dark-text/80">{video.description}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
