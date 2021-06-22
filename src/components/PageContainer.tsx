import React from 'react'
import useAudioStore, {
    AudioState,
    PlayState
} from '../services/audio/audioStore'
import useUiStore from '../services/ui/uiStore'
import Footer from './Footer'
import TopNavbar from './TopNavbar'
export interface IPageContainerProps {
  children: React.ReactNode
}
const PageContainer: React.FC<IPageContainerProps> = ({ children }) => {
  const showHeader = useUiStore((state) => state.hasHeader)
  const playState = useAudioStore((state: AudioState) => state.playState)
  React.useEffect(() => {
    console.log('PageContainer', 'showHeader', showHeader)
  }, [])
  return (
    <React.Fragment>
      <div className="flex flex-col h-screen">
        {showHeader && (
          <header className="py-5 text-center text-white bg-gray-700">
            <TopNavbar />
          </header>
        )}
        <main className="flex-1 overflow-y-hidden">
          <React.Fragment>{children}</React.Fragment>
        </main>
        {playState !== PlayState.stopped && (
          <footer className="py-5 text-center text-white bg-podnoms">
            <Footer />
          </footer>
        )}
      </div>
    </React.Fragment>
  )
}

export default PageContainer
