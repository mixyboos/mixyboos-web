import { PageContainer } from '../src/components'
import { AudioProvider } from '../src/services/audio'
import { AuthProvider } from '../src/services/auth'
import './index.css'

function MixyBoosApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <AudioProvider>
        <PageContainer>
          <Component {...pageProps} />
        </PageContainer>
      </AudioProvider>
    </AuthProvider>
  )
}

export default MixyBoosApp
