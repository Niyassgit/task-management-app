import BlogSection from './BlogSection'
import Footer from './Footer'
import HeroSection from './HeroSection'

const LandingPage = () => {
  return (
    <>
    <HeroSection />
    <div className="m-10">
      <BlogSection />
    </div>
    <Footer />
    </>
  )
}

export default LandingPage
