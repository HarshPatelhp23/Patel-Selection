import { Suspense, lazy, useLayoutEffect } from 'react'
import Hero from './components/Hero'
import Enquiry from './components/Enquiry'
import { Footer, Header, ListPill, Nudge, ScrollProgress, TabBar } from './components/Chrome'
import { Custom, Faq, Marquee, Stats, Visit, Why } from './components/Sections'
import { EnquiryProvider } from './state/Enquiry'
import Fx from './components/Fx'
import ListDrawer from './components/ListDrawer'

// The showroom carries the 3D engine, so it loads after the first screen (faster start, better Google speed score)
const Showroom = lazy(() => import('./components/Showroom'))

const REVEAL = 'section > .wrap > h2, section > .wrap > .sub, .livebadge, .f, .logocard, .custom > *, .visit > *, .founder > *, .depts, .elist, .stats .wrap > div, .cats, .toolbar, .faq'

export default function App() {
  // Scroll-reveal: sections slide and bounce in as they come into view (also for parts that load later)
  useLayoutEffect(() => {
    // `seen` lives inside this effect on purpose: in development React runs effects twice, and a fresh `seen`
    // makes sure the second run observes everything again (otherwise sections stay invisible).
    const seen = new WeakSet<Element>()
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) } }), { threshold: 0.12 })
    const scan = () => document.querySelectorAll<HTMLElement>(REVEAL).forEach(el => {
      if (seen.has(el)) return
      seen.add(el)
      if (el.classList.contains('in')) return
      el.classList.add('rv'); el.style.transitionDelay = `${(Array.prototype.indexOf.call(el.parentElement!.children, el) % 4) * 90}ms`; io.observe(el)
    })
    scan()
    const mo = new MutationObserver(scan); mo.observe(document.getElementById('top')!, { childList: true, subtree: true })
    return () => { io.disconnect(); mo.disconnect() }
  }, [])
  return (
    <EnquiryProvider>
      <ScrollProgress />
      <Fx />
      <Header />
      <main id="top">
        <Hero />
        <Marquee />
        <Suspense fallback={<section id="best" className="show" style={{ minHeight: 900 }} aria-busy="true" />}>
          <Showroom />
        </Suspense>
        <Enquiry />
        <Why />
        <Custom />
        <Faq />
        <Stats />
        <Visit />
      </main>
      <Footer />
      <TabBar />
      <ListPill />
      <Nudge />
      <ListDrawer />
    </EnquiryProvider>
  )
}
