import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import LiveMatchesSection from './components/LiveMatchesSection'
import HighlightsSection from './components/HighlightsSection'
import GallerySection from './components/GallerySection'
import ScheduleSection from './components/ScheduleSection'
import TeamsSection from './components/TeamsSection'
import Footer from './components/Footer'
import TopBannerAd from './components/TopBannerAd'
import NativeBannerAd from './components/NativeBannerAd'
import FooterAd from './components/FooterAd'

export default function App() {
  return (
    <div className="min-h-screen" style={{ background: 'hsl(220 20% 7%)' }}>
      <TopBannerAd />
      <Navbar />
      <HeroSection />
      <NativeBannerAd />
      <LiveMatchesSection />
      <HighlightsSection />
      <GallerySection />
      <ScheduleSection />
      <TeamsSection />
      <FooterAd />
      <Footer />
    </div>
  )
}

