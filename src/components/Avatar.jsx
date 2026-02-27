import { getInitials } from '../utils'

export default function Avatar({ participant, size = 'md' }) {
  const sizeClass = size === 'sm' ? 'w-7 h-7 text-xs' : 'w-9 h-9 text-sm'
  const roleColor = participant?.role === 1 ? 'bg-blue-600' : participant?.role === 0 ? 'bg-rose-500' : 'bg-emerald-500'

  return (
    <div
      className={`${sizeClass} ${roleColor} rounded-full flex items-center justify-center font-bold text-white flex-shrink-0 shadow-sm`}
      title={participant?.name}
    >
      {getInitials(participant?.name || '?')}
    </div>
  )
}
