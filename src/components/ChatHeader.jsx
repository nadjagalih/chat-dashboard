import { getRoleLabel, getRoleColor } from '../utils'

export default function ChatHeader({ room, onMenuOpen }) {
  return (
    <div className="flex items-center gap-4 px-4 py-3 bg-white border-b border-gray-200 shadow-sm flex-shrink-0 z-10">
      {/* Hamburger - mobile only */}
      <button
        onClick={onMenuOpen}
        className="sm:hidden flex items-center justify-center w-9 h-9 rounded-full text-gray-500 hover:bg-gray-100 transition-colors flex-shrink-0"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
      </button>

      {/* Room avatar */}
      <div className="relative">
        <img
          src={room.image_url}
          alt={room.name}
          className="w-12 h-12 rounded-full object-cover shadow-sm"
        />
        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
      </div>

      {/* Room info */}
      <div className="flex-1 min-w-0">
        <h2 className="font-bold text-gray-800 text-base truncate">{room.name}</h2>
        <p className="text-xs text-green-500 font-medium flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span>
          {room.participant.find(p => p.role === 1)?.name || 'Agent'} is online
        </p>
      </div>

      {/* Participants badge */}
      <div className="hidden sm:flex items-center gap-1.5 flex-shrink-0">
        {room.participant.map((p) => (
          <span
            key={p.id}
            className={`text-[10px] font-semibold px-2 py-0.5 rounded-full text-white ${getRoleColor(p.role)}`}
          >
            {getRoleLabel(p.role)}
          </span>
        ))}
      </div>
    </div>
  )
}
