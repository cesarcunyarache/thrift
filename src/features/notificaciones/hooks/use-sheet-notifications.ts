import { create } from 'zustand'

type NotificationState = {
    isOpen: boolean
    onOpen: () => void
    onClose: () => void
}

const useNotifications = create<NotificationState>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),    
    onClose: () => set({ isOpen: false }),
}))

export default useNotifications        