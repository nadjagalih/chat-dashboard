export function formatTime(isoString) {
  const date = new Date(isoString)
  return date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
}

export function formatFileSize(bytes) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export function getInitials(name = '') {
  return name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()
}

export function getRoleLabel(role) {
  if (role === 0) return 'Admin'
  if (role === 1) return 'Agent'
  return 'Customer'
}

export function getRoleColor(role) {
  if (role === 0) return 'bg-rose-500'
  if (role === 1) return 'bg-brand-500'
  return 'bg-emerald-500'
}
