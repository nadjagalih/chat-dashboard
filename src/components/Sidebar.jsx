import { formatTime } from '../utils'

export default function Sidebar({ rooms, activeRoomId, onSelectRoom, isOpen, onClose }) {
  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 sm:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed sm:relative z-30 sm:z-auto
          top-0 left-0 h-full
          w-72 flex-shrink-0
          bg-white border-r border-gray-200
          flex flex-col
          transition-transform duration-300 ease-in-out
          shadow-sm
          ${isOpen ? 'translate-x-0' : '-translate-x-full sm:translate-x-0'}
        `}
      >
        {/* Header */}
        <div className="px-4 py-4 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-gray-800 tracking-tight">💬 ChatApp</h1>
            <p className="text-xs text-gray-400 mt-0.5">Support Dashboard</p>
          </div>
          <button onClick={onClose} className="sm:hidden text-gray-400 hover:text-gray-700">✕</button>
        </div>

        {/* Current user info */}
        <div className="px-4 py-3 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">AA</div>
            <div>
              <p className="text-sm font-semibold text-gray-800">Agent A</p>
              <p className="text-xs text-green-500 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block"></span>
                Online
              </p>
            </div>
          </div>
        </div>

        {/* Room list */}
        <div className="flex-1 overflow-y-auto py-2">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-4 py-2">Rooms</p>
          {rooms.map((r) => {
            const room = r.room
            const lastMsg = r.comments[r.comments.length - 1]
            const isActive = room.id === activeRoomId
            return (
              <button
                key={room.id}
                onClick={() => { onSelectRoom(room.id); onClose() }}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-all hover:bg-gray-50 ${
                  isActive ? 'bg-blue-50 border-l-2 border-blue-600' : 'border-l-2 border-transparent'
                }`}
              >
                <img src={room.image_url} alt={room.name} className="w-10 h-10 rounded-full object-cover flex-shrink-0 shadow-sm" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <p className={`text-sm font-semibold truncate ${isActive ? 'text-blue-700' : 'text-gray-800'}`}>{room.name}</p>
                    <span className="text-[10px] text-gray-400 flex-shrink-0 ml-2">{lastMsg?.timestamp ? formatTime(lastMsg.timestamp) : ''}</span>
                  </div>
                  <p className="text-xs text-gray-400 truncate mt-0.5">{lastMsg?.message}</p>
                </div>
              </button>
            )
          })}
        </div>
      </aside>
    </>
  )
}
