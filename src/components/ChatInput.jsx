import { useState, useRef } from 'react'

export default function ChatInput({ onSend, onSendFile }) {
  const [value, setValue] = useState('')
  const fileInputRef = useRef(null)
  const textareaRef = useRef(null)

  const handleSend = () => {
    if (!value.trim()) return
    onSend(value.trim())
    setValue('')
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
    }
  }

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleInput = (e) => {
    setValue(e.target.value)
    // Auto-resize textarea
    const el = e.target
    el.style.height = 'auto'
    el.style.height = Math.min(el.scrollHeight, 120) + 'px'
  }

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    onSendFile(file)
    e.target.value = ''
  }

  return (
    <div className="flex-shrink-0 px-3 py-3 bg-white border-t border-gray-200 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
      <div className="flex items-end gap-2">
        {/* Attachment icon */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,video/*,.pdf"
          className="hidden"
          onChange={handleFileChange}
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          className="text-gray-400 hover:text-blue-600 p-2 transition-colors rounded-full hover:bg-gray-100 flex-shrink-0 mb-0.5"
          title="Lampirkan file"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
          </svg>
        </button>

        {/* Textarea auto-resize */}
        <textarea
          ref={textareaRef}
          rows={1}
          value={value}
          onChange={handleInput}
          onKeyDown={handleKey}
          placeholder="Ketik pesan Anda..."
          className="flex-1 bg-gray-100 text-sm text-gray-800 placeholder-gray-400 rounded-2xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all resize-none leading-relaxed"
          style={{ minHeight: '42px', maxHeight: '120px' }}
        />

        {/* Send button */}
        <button
          onClick={handleSend}
          disabled={!value.trim()}
          className="flex-shrink-0 bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed shadow-md transition-colors mb-0.5"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 ml-0.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
          </svg>
        </button>
      </div>
    </div>
  )
}
