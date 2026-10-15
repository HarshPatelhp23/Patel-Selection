import { Link, useLocation } from 'react-router-dom'
import type { ComponentProps } from 'react'
import { langPath, splitLang, useLang } from '../i18n'

/** Internal link that keeps the visitor in their language: <L to="/products"> -> /hi/products on the Hindi site */
export function L({ to, ...rest }: Omit<ComponentProps<typeof Link>, 'to'> & { to: string }) {
  const lang = useLang()
  return <Link to={langPath(lang, to)} {...rest} />
}

/** The current page address without the language prefix */
export function useBasePath() {
  const { pathname } = useLocation()
  return splitLang(pathname).path
}
