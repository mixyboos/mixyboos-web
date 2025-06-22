const STORAGE_KEY = '_p'

interface IPlaybackPosition {
  id: string
  position: number
}

function getPositions(): Array<IPlaybackPosition> {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (!stored) return []
  try {
    const parsed = JSON.parse(stored)
    if (Array.isArray(parsed)) {
      return parsed
    }
    return []
  } catch (e) {
    return []
  }
}

function savePositions(positions: Array<IPlaybackPosition>): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(positions))
}

export function getStoredPosition(id: string): number | undefined {
  if (!id) return undefined
  const positions = getPositions()
  const item = positions.find((p) => p.id === id)
  return item?.position
}

export function setStoredPosition(id: string, position: number): void {
  if (!id) return
  const positions = getPositions()
  const itemIndex = positions.findIndex((p) => p.id === id)
  if (itemIndex > -1) {
    positions[itemIndex].position = position
  } else {
    positions.push({ id, position })
  }
  savePositions(positions)
}
