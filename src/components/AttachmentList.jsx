import { useState } from 'react'
import { formatFileSize } from '../utils'
import ImageLightbox from './ImageLightbox'

function ImageAttachment({ att }) {
  const [open, setOpen] = useState(false)
  const [error, setError] = useState(false)
  return (
    <>
      {error ? (
        <div className="w-full h-32 rounded-xl bg-gray-200 flex items-center justify-center text-gray-400 text-xs">
          Gambar tidak tersedia
        </div>
      ) : (
        <img
          src={att.thumbnail_url || att.url}
          alt={att.file_name}
          onClick={() => setOpen(true)}
          onError={() => setError(true)}
          className="w-full h-32 object-cover rounded-xl cursor-zoom-in hover:opacity-90 transition-opacity shadow-sm"
        />
      )}
      {open && !error && (
        <ImageLightbox url={att.url} fileName={att.file_name} onClose={() => setOpen(false)} />
      )}
    </>
  )
}

function VideoAttachment({ att, isMine }) {
  return (
    <div className="rounded-xl overflow-hidden max-w-[260px] w-full shadow-sm bg-black">
      <video
        controls
        poster={att.thumbnail_url || undefined}
        className="w-full h-auto max-h-48 object-cover"
      >
        <source src={att.url} type={att.mime_type} />
        Browser tidak mendukung video.
      </video>
      <div className={`mt-1 flex items-center gap-2 text-xs px-2 pb-1 ${
        isMine ? 'text-blue-200' : 'text-gray-500'
      }`}>
        <span>🎬</span>
        <span className="truncate">{att.file_name}</span>
        <span className="flex-shrink-0">{formatFileSize(att.file_size)}</span>
      </div>
    </div>
  )
}

function PdfAttachment({ att, isMine }) {
  return (
    <a
      href={att.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center gap-3 rounded-xl px-3 py-3 transition-colors max-w-[260px] w-full group shadow-sm ${
        isMine
          ? 'bg-blue-500/30 hover:bg-blue-500/50'
          : 'bg-gray-100 hover:bg-gray-200'
      }`}
    >
      <div className={`p-2 rounded-lg flex-shrink-0 ${
        isMine ? 'bg-blue-400/30' : 'bg-red-100'
      }`}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 ${isMine ? 'text-blue-100' : 'text-red-600'}`}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
      </div>
      <div className="min-w-0 overflow-hidden">
        <p className={`text-sm font-semibold truncate ${
          isMine ? 'text-white' : 'text-gray-800'
        }`}>
          {att.file_name}
        </p>
        <p className={`text-xs ${isMine ? 'text-blue-200' : 'text-gray-500'}`}>{formatFileSize(att.file_size)} • PDF</p>
      </div>
    </a>
  )
}

export default function AttachmentList({ attachments = [], isMine = false }) {
  if (!attachments.length) return null

  const images = attachments.filter((a) => a.type === 'image')
  const others = attachments.filter((a) => a.type !== 'image')

  return (
    <div className="flex flex-col gap-2 mt-1.5">
      {/* Image grid: 2-column when >1, single when 1 */}
      {images.length > 0 && (
        <div className={`grid gap-1.5 ${
          images.length >= 2 ? 'grid-cols-2' : 'grid-cols-1'
        }`}>
          {images.map((att) => (
            <ImageAttachment key={att.id} att={att} />
          ))}
        </div>
      )}
      {others.map((att) => {
        if (att.type === 'video') return <VideoAttachment key={att.id} att={att} isMine={isMine} />
        if (att.type === 'pdf')   return <PdfAttachment   key={att.id} att={att} isMine={isMine} />
        return null
      })}
    </div>
  )
}
