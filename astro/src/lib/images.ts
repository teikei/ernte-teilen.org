import type { ImageMetadata } from 'astro'

// Eagerly import every processed asset image. Replaces Gatsby's `allFile`
// GraphQL queries + lodash `zipObject` slug-keying.
const modules = import.meta.glob<{ default: ImageMetadata }>(
  '../assets/**/*.{jpg,jpeg,png}',
  { eager: true }
)

// Build a lookup keyed by "<folder>/<basename-without-ext>",
// e.g. "cards/consumers", "partners/solawi_de", "pages/farms".
const byKey: Record<string, ImageMetadata> = {}
for (const [path, mod] of Object.entries(modules)) {
  const match = path.match(/\/assets\/(.+)\.(jpg|jpeg|png)$/)
  if (match) byKey[match[1]] = mod.default
}

/** Look up a processed image by "<folder>/<slug>" (without extension). */
export function getAssetImage(key: string): ImageMetadata | undefined {
  return byKey[key]
}

/** All images in a folder, keyed by slug (basename without extension). */
export function getAssetImages(folder: string): Record<string, ImageMetadata> {
  const result: Record<string, ImageMetadata> = {}
  const prefix = `${folder}/`
  for (const [key, image] of Object.entries(byKey)) {
    if (key.startsWith(prefix)) result[key.slice(prefix.length)] = image
  }
  return result
}
