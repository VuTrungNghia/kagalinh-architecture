// Scans public/images/{project}/ and subfolders for jpg/png
// Writes WebP + JPEG variants to public/images-opt/
// Generates src/data/projects.generated.ts
// Run: npm run optimize-images
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')
const INPUT_DIR = path.join(ROOT, 'public', 'images')
const OUTPUT_DIR = path.join(ROOT, 'public', 'images-opt')
const META_PATH = path.join(ROOT, 'src', 'data', 'projects.meta.json')
const OUT_TS = path.join(ROOT, 'src', 'data', 'projects.generated.ts')

const WIDTHS = [480, 960, 1920]
const WEBP_QUALITY = 82
const JPEG_QUALITY = 85
function slugify(text) {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
}

function titleFromFolder(name) {
  return name.replace(/\s+/g, ' ').trim()
}

async function collectImages(dir, base = '') {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  const files = []
  for (const entry of entries) {
    const rel = base ? `${base}/${entry.name}` : entry.name
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...(await collectImages(full, rel)))
    } else if (/\.(jpe?g|png)$/i.test(entry.name) && !/thumbs\.db/i.test(entry.name)) {
      files.push(rel.replace(/\\/g, '/'))
    }
  }
  return files.sort()
}

async function optimizeOne(inputPath, outBase) {
  const meta = await sharp(inputPath).metadata()
  const originalWidth = meta.width ?? 1920
  const originalHeight = meta.height ?? 1080

  const webp = []
  const jpeg = []

  for (const w of WIDTHS) {
    if (w > originalWidth) continue
    const webpOut = `${outBase}-${w}.webp`
    const jpegOut = `${outBase}-${w}.jpg`
    await sharp(inputPath)
      .resize(w, null, { withoutEnlargement: true, fit: 'inside' })
      .webp({ quality: WEBP_QUALITY, effort: 4 })
      .toFile(webpOut)
    await sharp(inputPath)
      .resize(w, null, { withoutEnlargement: true, fit: 'inside' })
      .jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
      .toFile(jpegOut)
    webp.push({ width: w, url: toPublicUrl(webpOut) })
    jpeg.push({ width: w, url: toPublicUrl(jpegOut) })
  }

  const display =
    webp.find((v) => v.width === 1920) ??
    webp.find((v) => v.width === 960) ??
    webp[webp.length - 1]

  return {
    width: originalWidth,
    height: originalHeight,
    webp,
    jpeg,
    image: display?.url ?? toPublicUrl(inputPath),
  }
}

function toPublicUrl(absPath) {
  const rel = path.relative(path.join(ROOT, 'public'), absPath).replace(/\\/g, '/')
  return '/' + rel.split('/').map(encodeURIComponent).join('/')
}

function toOriginalPublicUrl(relFromImages) {
  return '/' + ['images', ...relFromImages.split('/').map(encodeURIComponent)].join('/')
}

async function main() {
  let metaOverrides = {}
  try {
    metaOverrides = JSON.parse(await fs.readFile(META_PATH, 'utf8'))
  } catch {
    /* optional */
  }

  await fs.rm(OUTPUT_DIR, { recursive: true, force: true })
  await fs.mkdir(OUTPUT_DIR, { recursive: true })

  const projectDirs = await fs.readdir(INPUT_DIR, { withFileTypes: true })
  const projects = []
  let totalIn = 0
  let totalOut = 0

  for (const dirent of projectDirs) {
    if (!dirent.isDirectory()) continue
    const folderName = dirent.name
    const projectId = slugify(folderName)
    const projectInDir = path.join(INPUT_DIR, folderName)
    const projectOutDir = path.join(OUTPUT_DIR, projectId)
    await fs.mkdir(projectOutDir, { recursive: true })

    const imageFiles = await collectImages(projectInDir)
    if (imageFiles.length === 0) continue

    const slides = []
    const override = metaOverrides[projectId] ?? {}

    for (const relFile of imageFiles) {
      const inputPath = path.join(projectInDir, relFile)
      const slideId = slugify(relFile.replace(/\.[^.]+$/, ''))
      const outBase = path.join(projectOutDir, slideId)
      const statIn = await fs.stat(inputPath)
      totalIn += statIn.size

      console.log(`  ${projectId}/${relFile}`)
      const opt = await optimizeOne(inputPath, outBase)

      for (const v of opt.webp) {
        const s = await fs.stat(path.join(ROOT, 'public', decodeURIComponent(v.url.slice(1))))
        totalOut += s.size
      }

      const fileName = path.basename(relFile, path.extname(relFile))
      slides.push({
        id: slideId,
        alt: `${override.title ?? titleFromFolder(folderName)} — ${fileName}`,
        image: opt.image,
        original: toOriginalPublicUrl(`${folderName}/${relFile}`),
        webp: opt.webp,
        jpeg: opt.jpeg,
        width: opt.width,
        height: opt.height,
      })
    }

    projects.push({
      id: projectId,
      title: override.title ?? titleFromFolder(folderName),
      subtitle: override.subtitle ?? 'Kiến trúc & nội thất',
      description:
        override.description ??
        `Dự án ${titleFromFolder(folderName)} — hình ảnh thực tế và thiết kế 3D bởi Kagalinh Architecture.`,
      date: override.date ?? '',
      location: override.location ?? 'Việt Nam',
      client: override.client ?? 'Khách hàng',
      services: override.services ?? ['Thiết kế kiến trúc', 'Nội thất', 'Visualization 3D'],
      slides,
    })
  }

  const ts = `/* eslint-disable */
// Auto-generated by scripts/optimize-images.mjs — do not edit manually
import type { Project } from './projects.types'

export const projects: Project[] = ${JSON.stringify(projects, null, 2)} as Project[]

export const imageStats = {
  projects: ${projects.length},
  slides: ${projects.reduce((n, p) => n + p.slides.length, 0)},
  inputBytes: ${totalIn},
  optimizedBytes: ${totalOut},
} as const
`

  await fs.writeFile(OUT_TS, ts, 'utf8')

  const inMb = (totalIn / 1024 / 1024).toFixed(1)
  const outMb = (totalOut / 1024 / 1024).toFixed(1)
  const saved = totalIn > 0 ? (((totalIn - totalOut) / totalIn) * 100).toFixed(0) : 0

  console.log('\n✓ Done')
  console.log(`  Projects: ${projects.length}`)
  console.log(`  Slides: ${projects.reduce((n, p) => n + p.slides.length, 0)}`)
  console.log(`  Original: ~${inMb} MB → Optimized (variants): ~${outMb} MB (~${saved}% smaller per request uses 1 variant)`)
  console.log(`  → ${path.relative(ROOT, OUT_TS)}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
