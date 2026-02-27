import { useState } from 'react'
import chatData from './data/chatData'
import Sidebar from './components/Sidebar'
import ChatWindow from './components/ChatWindow'
import { CURRENT_USER } from './constants'

export default function App() {
  const [rooms, setRooms] = useState(chatData.results)
  const [activeRoomId, setActiveRoomId] = useState(chatData.results[0]?.room.id)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const activeRoomData = rooms.find((r) => r.room.id === activeRoomId)

  const addComment = (comment) => {
    setRooms((prev) =>
      prev.map((r) =>
        r.room.id !== activeRoomId ? r : { ...r, comments: [...r.comments, comment] }
      )
    )
  }

  const handleSendMessage = (text) => {
    addComment({
      id: Date.now(),
      type: 'text',
      message: text,
      sender: CURRENT_USER,
      timestamp: new Date().toISOString(),
      attachments: [],
    })
  }

  const handleSendFile = (file) => {
    const url = URL.createObjectURL(file)
    const type = file.type.startsWith('image/')
      ? 'image'
      : file.type.startsWith('video/')
      ? 'video'
      : 'pdf'
    addComment({
      id: Date.now(),
      type,
      message: '',
      sender: CURRENT_USER,
      timestamp: new Date().toISOString(),
      attachments: [{
        id: `att-${Date.now()}`,
        type,
        file_name: file.name,
        file_size: file.size,
        mime_type: file.type,
        url,
        thumbnail_url: type === 'image' ? url : null,
      }],
    })
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-gray-100">
      {/* Sidebar */}
      <Sidebar
        rooms={rooms}
        activeRoomId={activeRoomId}
        onSelectRoom={setActiveRoomId}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Chat area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {activeRoomData ? (
          <ChatWindow
            roomData={activeRoomData}
            onSendMessage={handleSendMessage}
            onSendFile={handleSendFile}
            onMenuOpen={() => setSidebarOpen(true)}
          />
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-400 bg-[#f0f2f5]">
            Pilih room untuk mulai chat
          </div>
        )}
      </main>
    </div>
  )
}
