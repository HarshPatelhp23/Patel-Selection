import { useLayoutEffect } from 'react'
import Hero from './components/Hero'
import Showroom from './components/Showroom'
import Enquiry from './components/Enquiry'
import { Footer, Header, ListPill, Nudge, ScrollProgress, TabBar } from './components/Chrome'
import { Custom, Marquee, Stats, Visit, Why } from './components/Sections'
import { EnquiryProvider } from './state/Enquiry'
import Fx from './components/Fx'

const REVEAL = 'section > .wrap > h2, section > .wrap > .sub, .livebadge, .f, .logocard, .custom > *, .visit > *, .founder > *, .depts, .elist, .stats .wrap > div, .cats, .toolbar'

export default function App() {
  // Scroll-reveal: sections slide and bounce in as they come into view
  useLayoutEffect(() => {
    const els = [...document.querySelectorAll<HTMLElement>(REVEAL)]
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) } }), { threshold: 0.12 })
    els.forEach(el => { el.classList.add('rv'); el.style.transitionDelay = `${(Array.prototype.indexOf.call(el.parentElement!.children, el) % 4) * 90}ms`; io.observe(el) })
    return () => io.disconnect()
  }, [])
  return (
    <EnquiryProvider>
      <ScrollProgress />
      <Fx />
      <Header />
      <main id="top">
        <Hero />
        <Marquee />
        <Showroom />
        <Enquiry />
        <Why />
        <Custom />
        <Stats />
        <Visit />
      </main>
      <Footer />
      <TabBar />
      <ListPill />
      <Nudge />
    </EnquiryProvider>
  )
}
