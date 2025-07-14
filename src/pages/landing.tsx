import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { siteConfig } from '@/config/site'

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/10">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12 lg:py-20">
        <div className="text-center max-w-4xl mx-auto">
          {/* Logo and Title */}
          <div className="mb-8">
            <h1 className="text-5xl lg:text-7xl font-bold text-foreground mb-4">
              <span className="bg-gradient-to-r from-primary to-accent-foreground bg-clip-text text-transparent">
                mixy://boos
              </span>
            </h1>
            <p className="text-xl lg:text-2xl text-muted-foreground font-medium">
              {siteConfig.description}
            </p>
          </div>

          {/* Main CTA Section */}
          <div className="mb-12">
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
              <Link to="/login" className="w-full sm:w-auto">
                <Button variant="default" size="lg" className="w-full text-lg px-8 py-6 h-auto">
                  Login
                </Button>
              </Link>
              <Link to="/" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full text-lg px-8 py-6 h-auto border-2">
                  Start Listening
                </Button>
              </Link>
            </div>
          </div>

          {/* Features Section */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="p-6 rounded-lg bg-card border shadow-sm">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">AI-Powered Mixing</h3>
              <p className="text-muted-foreground">
                Let our robots create seamless mixes tailored to your taste
              </p>
            </div>

            <div className="p-6 rounded-lg bg-card border shadow-sm">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">High Quality Audio</h3>
              <p className="text-muted-foreground">
                Crystal clear sound with professional-grade audio processing
              </p>
            </div>

            <div className="p-6 rounded-lg bg-card border shadow-sm">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Instant Access</h3>
              <p className="text-muted-foreground">
                Start listening immediately - no complex setup required
              </p>
            </div>
          </div>

          {/* Waveform Visual Element */}
          <div className="mb-8">
            <div className="flex items-center justify-center space-x-1">
              {Array.from({ length: 50 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-gradient-to-t from-primary/60 to-primary/20 rounded-full animate-pulse"
                  style={{
                    width: '3px',
                    height: `${Math.random() * 40 + 10}px`,
                    animationDelay: `${i * 0.1}s`,
                    animationDuration: `${Math.random() * 2 + 1}s`,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-6 text-muted-foreground">
            <a 
              href={siteConfig.links.twitter} 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </a>
            <a 
              href={siteConfig.links.github} 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a 
              href={siteConfig.links.docs} 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
export default LandingPage
