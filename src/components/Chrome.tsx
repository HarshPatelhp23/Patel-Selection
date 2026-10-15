import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Icon from './Icon'
import Logo from './Logo'
import { L, useBasePath } from './Link'
import { LANGS, LANG_META, langPath, pick, useLang, useT } from '../i18n'
import { useList } from '../state/list'
import { ADDRESS, OWNER, PHONE, PHONE_DISPLAY } from '../config'
import { CAT } from '../data/categories'
import { CATEGORIES, categoryPath } from '../data/products'
import { DEPTS } from '../data/departments'

function LangSwitch() {
  const lang = useLang(), base = useBasePath(), t = useT()
  return (
    <div className="lang" role="group" aria-label={t('language')}>
      {LANGS.map(l => (
        <a key={l} href={(__HASH_MODE__ ? '#' : '') + langPath(l, base)} hrefLang={LANG_META[l].hreflang} lang={LANG_META[l].html} className={l === lang ? 'on' : ''} aria-current={l === lang ? 'true' : undefined}
          title={LANG_META[l].name}>{LANG_META[l].short}</a>
      ))}
    </div>
  )
}

export function Header() {
  const t = useT(), lang = useLang()
  const { count, setOpen } = useList()
  const [menu, setMenu] = useState(false)
  const { pathname } = useLocation()
  useEffect(() => setMenu(false), [pathname])
  useEffect(() => {
    document.body.classList.toggle('noscroll', menu)
    return () => document.body.classList.remove('noscroll')
  }, [menu])
  return (
    <header className="hd">
      <a className="skip" href="#main" onClick={e => { e.preventDefault(); document.getElementById('main')?.focus() }}>{t('skip')}</a>
      <div className="wrap hdr">
        <L className="lg" to="/" aria-label="Patel Selection"><Logo variant="mini" /></L>
        <nav className="dnav" aria-label="Main">
          <div className="dd">
            <L to="/products">{t('products')} <Icon name="down" /></L>
            <div className="ddm">
              <L to="/dining-set-builder" className="hot"><Icon name="cube" /> {t('builderLink')}</L>
              {CATEGORIES.map(c => <L key={c} to={categoryPath(c)}>{pick(CAT[c].name, lang)}</L>)}
              <L to="/departments" className="all">{t('departments')} →</L>
            </div>
          </div>
          <L to="/departments">{t('departments')}</L>
          <L to="/about">{t('about')}</L>
          <L to="/send-a-photo">{t('sendPhoto')}</L>
          <L to="/visit">{t('visit')}</L>
        </nav>
        <LangSwitch />
        <button type="button" className="mylist" onClick={() => setOpen(true)} aria-haspopup="dialog">
          <Icon name="list" /><span className="mylist-t">{t('myList')}</span>{count > 0 && <b>{count}</b>}
        </button>
        <a className="hcall" href={`tel:${PHONE}`}><Icon name="phone" /><span>{t('callNow')}</span></a>
        <button type="button" className="burger" onClick={() => setMenu(m => !m)} aria-expanded={menu} aria-controls="mnav" aria-label={t('menu')}><Icon name={menu ? 'close' : 'menu'} /></button>
      </div>
      {menu && (
        <nav id="mnav" className="mnav" aria-label={t('menu')}>
          <L to="/products" className="big">{t('products')}</L>
          <div className="msub">{CATEGORIES.map(c => <L key={c} to={categoryPath(c)}>{pick(CAT[c].name, lang)}</L>)}</div>
          <L to="/dining-set-builder" className="big">{t('builderLink')}</L>
          <L to="/departments" className="big">{t('departments')}</L>
          <L to="/about" className="big">{t('about')}</L>
          <L to="/send-a-photo" className="big">{t('sendPhoto')}</L>
          <L to="/visit" className="big">{t('visit')}</L>
          <L to="/areas" className="big">{t('areas')}</L>
          <div className="mlang"><LangSwitch /></div>
        </nav>
      )}
    </header>
  )
}

export function Footer() {
  const t = useT(), lang = useLang()
  return (
    <>
      <div className="band" />
      <footer className="ft"><div className="wrap">
        <div className="ft-brand">
          <div className="pl"><Logo /></div>
          <p>{t('footerAbout')}</p>
          <address>
            Patel Selection<br />{ADDRESS.street},<br />{ADDRESS.locality}-{ADDRESS.postal}, {ADDRESS.region}
          </address>
          <a className="ft-call" href={`tel:${PHONE}`}>{OWNER}: {PHONE_DISPLAY}</a>
        </div>
        <nav aria-label={t('products')}>
          <h2>{t('products')}</h2>
          <ul>{CATEGORIES.map(c => <li key={c}><L to={categoryPath(c)}>{pick(CAT[c].name, lang)}</L></li>)}</ul>
        </nav>
        <nav aria-label={t('departments')}>
          <h2>{t('departments')}</h2>
          <ul>{DEPTS.map(d => <li key={d.slug}><L to={`/departments/${d.slug}`}>{pick(d.name, lang)}</L></li>)}</ul>
        </nav>
        <nav aria-label={t('quickLinks')}>
          <h2>{t('quickLinks')}</h2>
          <ul>
            <li><L to="/dining-set-builder">{t('builderLink')}</L></li>
            <li><L to="/about">{t('about')}</L></li>
            <li><L to="/send-a-photo">{t('sendPhoto')}</L></li>
            <li><L to="/visit">{t('visit')}</L></li>
            <li><L to="/areas">{t('areas')}</L></li>
            <li><L to="/my-list">{t('myList')}</L></li>
          </ul>
          <div className="lang ft-lang"><LangSwitch /></div>
        </nav>
      </div>
        <div className="wrap ft-bot">© Patel Selection, Ambli-Bopal Road, Ahmedabad</div>
      </footer>
    </>
  )
}

/** Floating glass dock for phones: Home, Products, Call, My list, Visit. */
export function TabBar() {
  const t = useT()
  const { count, setOpen, open } = useList()
  const base = useBasePath()
  const on = (p: string) => (p === '/' ? base === '/' : base.startsWith(p))
  return (
    <nav className="tabs" aria-label="App">
      <L to="/" className={on('/') ? 'on' : ''}><Icon name="home" /><span>{t('home')}</span></L>
      <L to="/products" className={on('/products') ? 'on' : ''}><Icon name="bag" /><span>{t('products')}</span></L>
      <div className="fabslot"><a className="fab" href={`tel:${PHONE}`} aria-label={t('callNow')}><Icon name="phone" /></a><span>{t('call')}</span></div>
      <button type="button" className={open ? 'on' : ''} onClick={() => setOpen(true)} aria-haspopup="dialog">
        <span className="ticon"><Icon name="list" />{count > 0 && <b className="tbadge">{count}</b>}</span><span>{t('myList')}</span>
      </button>
      <L to="/visit" className={on('/visit') ? 'on' : ''}><Icon name="pin" /><span>{t('visit')}</span></L>
    </nav>
  )
}

/** "Added" message with a View list button, so the customer sees what happened and what to do next. */
export function Toast() {
  const t = useT()
  const { toast, setOpen, count } = useList()
  if (!toast) return null
  return (
    <div className="toast" role="status" key={toast.id}>
      <Icon name="check" />
      <span><b>{toast.label}</b> {t('addedToast').toLowerCase()}</span>
      <button type="button" onClick={() => setOpen(true)}>{t('viewList')} ({count})</button>
    </div>
  )
}
