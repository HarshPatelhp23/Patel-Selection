import { useEffect } from 'react'
import { Outlet, Route, Routes, useLocation } from 'react-router-dom'
import { LANGS, LangCtx, type Lang } from './i18n'
import { ListProvider } from './state/list'
import { Footer, Header, TabBar, Toast } from './components/Chrome'
import ListDrawer from './components/ListDrawer'
import Home from './pages/Home'
import { CategoryPage, ProductPage, Products } from './pages/Catalog'
import { About, Areas, Department, Departments, MyList, SendPhoto, Visit } from './pages/Info'
import Builder from './pages/Builder'
import NotFound from './pages/NotFound'
import { applySeo, seoFor } from './seo'

/** Keeps the page title, description and canonical link correct when the visitor moves between pages. */
function PageEffects() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    applySeo(seoFor(pathname))
    if (!hash) window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

function Shell({ lang }: { lang: Lang }) {
  return (
    <LangCtx.Provider value={lang}>
      <PageEffects />
      <Header />
      <main id="main" tabIndex={-1}><Outlet /></main>
      <Footer />
      <TabBar />
      <Toast />
      <ListDrawer />
    </LangCtx.Provider>
  )
}

export default function App() {
  return (
    <ListProvider>
      <Routes>
        {LANGS.map(l => (
          <Route key={l} path={l === 'en' ? '/' : `/${l}`} element={<Shell lang={l} />}>
            <Route index element={<Home />} />
            <Route path="products" element={<Products />} />
            <Route path="products/:cat" element={<CategoryPage />} />
            <Route path="products/:cat/:slug" element={<ProductPage />} />
            <Route path="departments" element={<Departments />} />
            <Route path="departments/:slug" element={<Department />} />
            <Route path="my-list" element={<MyList />} />
            <Route path="about" element={<About />} />
            <Route path="send-a-photo" element={<SendPhoto />} />
            <Route path="visit" element={<Visit />} />
            <Route path="areas" element={<Areas />} />
            <Route path="dining-set-builder" element={<Builder />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        ))}
      </Routes>
    </ListProvider>
  )
}
