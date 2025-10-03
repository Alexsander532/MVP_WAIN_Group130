import { create } from 'zustand'

interface AppState {
  sidebarExpanded: boolean
  currentUser: {
    name: string
    email: string
  }
  toggleSidebar: () => void
  setSidebarExpanded: (expanded: boolean) => void
}

export const useAppStore = create<AppState>((set) => ({
  sidebarExpanded: true,
  currentUser: {
    name: 'João Silva',
    email: 'joao.silva@autoescola.com'
  },
  toggleSidebar: () => set((state) => ({ sidebarExpanded: !state.sidebarExpanded })),
  setSidebarExpanded: (expanded: boolean) => set({ sidebarExpanded: expanded }),
}))