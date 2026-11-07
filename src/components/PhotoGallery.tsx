import { Reveal } from '@/components/Reveal'
import type { Photo } from '@/data/photos'

type PhotoGalleryProps = {
  photos: Photo[]
  className?: string
}

/**
 * Responsive grid of captioned photos. Five photos render as a mosaic with a large lead
 * image; any other count renders as an even row.
 */
export function PhotoGallery({ photos, className = '' }: PhotoGalleryProps) {
  const mosaic = photos.length === 5
  const cols = photos.length === 1 ? '' : photos.length === 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-3'

  return (
    <div
      className={`grid grid-cols-1 gap-4 ${
        mosaic ? 'sm:grid-cols-2 lg:auto-rows-[15rem] lg:grid-cols-4' : cols
      } ${className}`}
    >
      {photos.map((photo, i) => {
        const lead = mosaic && i === 0
        const aspect = mosaic
          ? 'aspect-[4/3] lg:aspect-auto'
          : photos.length === 1
            ? 'aspect-[16/9]'
            : 'aspect-[4/3]'
        return (
          <Reveal
            key={photo.src}
            delay={(i % 3) * 90}
            variant="scale"
            className={lead ? 'sm:col-span-2 lg:row-span-2' : ''}
          >
            <figure
              className={`group relative h-full w-full overflow-hidden rounded-2xl bg-[var(--color-ink)] ${aspect}`}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                decoding="async"
                style={photo.position ? { objectPosition: photo.position } : undefined}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {photo.caption && (
                <figcaption
                  className="absolute inset-x-0 bottom-0 px-5 pb-4 pt-12 text-sm font-semibold text-white"
                  style={{ background: 'linear-gradient(180deg, rgba(5,5,5,0) 0%, rgba(5,5,5,0.78) 100%)' }}
                >
                  {photo.caption}
                </figcaption>
              )}
            </figure>
          </Reveal>
        )
      })}
    </div>
  )
}
