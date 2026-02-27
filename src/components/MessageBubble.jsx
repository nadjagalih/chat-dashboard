import Avatar from './Avatar'
import AttachmentList from './AttachmentList'
import { formatTime } from '../utils'

export default function MessageBubble({ comment, participant, isMine, showAvatar }) {
  const hasAttachments = comment.attachments?.length > 0

  return (
    <div className={`flex items-end gap-2 bubble-in ${isMine ? 'flex-row-reverse' : 'flex-row'}`}>
      {/* Avatar */}
      <div className="w-9 flex-shrink-0">
        {showAvatar && !isMine && <Avatar participant={participant} />}
      </div>

      {/* Bubble */}
      <div className={`flex flex-col gap-1 max-w-[75%] sm:max-w-[65%] ${isMine ? 'items-end' : 'items-start'}`}>
        {/* Sender name (only on first message in group) */}
        {showAvatar && !isMine && (
          <span className="text-xs font-semibold text-blue-600 ml-1">
            {participant?.name}
          </span>
        )}

        <div
          className={`shadow-sm ${
            isMine
              ? 'bg-blue-600 text-white rounded-2xl rounded-tr-none px-4 py-2'
              : 'bg-white border border-gray-200 text-gray-800 rounded-2xl rounded-tl-none px-4 py-2'
          } ${hasAttachments ? 'p-2' : ''}`}
        >
          {/* Text message */}
          {comment.message && (
            <p className="text-sm leading-relaxed">{comment.message}</p>
          )}

          {/* Attachments */}
          <AttachmentList attachments={comment.attachments} isMine={isMine} />

          {/* Timestamp + status */}
          <div className={`flex items-center justify-end gap-1 mt-1`}>
            <p className={`text-[10px] ${isMine ? 'text-blue-200' : 'text-gray-400'}`}>
              {formatTime(comment.timestamp)}
            </p>
            {isMine && (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 10" className="w-4 h-3 text-blue-200 flex-shrink-0">
                <path fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
                  d="M1 5l3 3 5-7M6 8l2-2m2-3l3-3" />
              </svg>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
