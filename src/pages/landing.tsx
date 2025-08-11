import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { Icons } from "@/components/icons";
import Link from "next/link";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background w-screen overflow-x-hidden">
      <div className="flex items-center justify-center min-h-screen px-4 py-8">
        {/* Hero Section */}
        <div className="w-full max-w-4xl mx-auto">
          <div className="text-center space-y-12 w-full">
            <div>
              <div className="mb-6 flex justify-center">
                <Icons.mixyboos className="w-12 h-12 " />
              </div>

              <h1 className="text-5xl lg:text-7xl font-bold text-foreground mb-4">
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  mixy://boos
                </span>
              </h1>
              <p className="text-xl lg:text-2xl text-muted-foreground font-medium mb-4">
                {siteConfig.description}
              </p>
            </div>
            {/* Main CTA Section */}
            <div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
                <Link href="/login" className="w-full sm:w-auto">
                  <Button
                    size="default"
                    className="w-full px-6 py-2 font-medium"
                  >
                    <Icons.login className="mr-2 h-4 w-4" />
                    Get Started
                  </Button>
                </Link>
                <Link href="/" className="w-full sm:w-auto">
                  <Button
                    variant="outline"
                    size="default"
                    className="w-full px-6 py-2 font-medium"
                  >
                    <Icons.play className="mr-2 h-4 w-4" />
                    Start Listening
                  </Button>
                </Link>
              </div>
            </div>{" "}
            {/* Features Section */}
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-6 rounded-lg bg-card border shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                  <Icons.mix className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  AI-Powered Mixing
                </h3>
                <p className="text-muted-foreground">
                  Our intelligent robots analyze your music taste and create
                  seamless, personalized mixes
                </p>
              </div>

              <div className="p-6 rounded-lg bg-card border shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                  <Icons.liveStream className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  Crystal Clear Audio
                </h3>
                <p className="text-muted-foreground">
                  Experience studio-quality sound with our advanced audio
                  processing
                </p>
              </div>

              <div className="p-6 rounded-lg bg-card border shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                  <Icons.submit className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Instant Access</h3>
                <p className="text-muted-foreground">
                  Jump straight into the groove! No complex setup, no waiting -
                  just pure musical bliss
                </p>
              </div>
            </div>{" "}
            {/* Waveform Visual Element */}
            <div>
              <div className="flex items-center justify-center space-x-1 p-6 rounded-lg bg-card border">
                {Array.from({ length: 40 }).map((_, i) => (
                  <div
                    key={i}
                    className="bg-gradient-to-t from-primary/60 to-primary/20 rounded-full"
                    style={{
                      width: "3px",
                      height: `${Math.random() * 40 + 10}px`,
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
                className="p-2 rounded-full hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <Icons.twitter className="w-5 h-5" />
              </a>
              <a
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <Icons.github className="w-5 h-5" />
              </a>
              <a
                href={siteConfig.links.docs}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <Icons.post className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
