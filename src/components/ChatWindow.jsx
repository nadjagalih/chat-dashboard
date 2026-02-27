import { useEffect, useRef } from 'react'
import MessageBubble from './MessageBubble'
import ChatHeader from './ChatHeader'
import ChatInput from './ChatInput'
import { CURRENT_USER } from '../constants'

function formatDateLabel(isoString) {
  const date = new Date(isoString)
  return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
}

function isSameDay(a, b) {
  const da = new Date(a), db = new Date(b)
  return da.getFullYear() === db.getFullYear() &&
    da.getMonth() === db.getMonth() &&
    da.getDate() === db.getDate()
}

export default function ChatWindow({ roomData, onSendMessage, onSendFile, onMenuOpen }) {
  const { room, comments } = roomData
  const bottomRef = useRef(null)

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [comments])

  const getParticipant = (senderId) =>
    room.participant.find((p) => p.id === senderId)

  // Determine if avatar should show (first message or different sender from prev)
  const shouldShowAvatar = (index) => {
    if (index === 0) return true
    return comments[index].sender !== comments[index - 1].sender
  }

  // Determine if a date separator should show
  const shouldShowDate = (index) => {
    if (index === 0) return true
    return !isSameDay(comments[index].timestamp, comments[index - 1].timestamp)
  }

  return (
    <div className="flex flex-col flex-1 h-full overflow-hidden">
      {/* Header */}
      <ChatHeader room={room} onMenuOpen={onMenuOpen} />

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3 bg-[#f0f2f5]">
        {comments.map((comment, index) => {
          const isMine = comment.sender === CURRENT_USER
          const participant = getParticipant(comment.sender)
          const showAvatar = shouldShowAvatar(index)
          const showDate = shouldShowDate(index)

          return (
            <div key={comment.id}>
              {showDate && (
                <div className="flex justify-center my-2">
                  <span className="text-xs text-gray-500 bg-gray-200 px-3 py-1 rounded-full shadow-sm">
                    {formatDateLabel(comment.timestamp)}
                  </span>
                </div>
              )}
              <MessageBubble
                comment={comment}
                participant={participant}
                isMine={isMine}
                showAvatar={showAvatar}
              />
            </div>
          )
        })}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <ChatInput onSend={onSendMessage} onSendFile={onSendFile} />
    </div>
  )
}
