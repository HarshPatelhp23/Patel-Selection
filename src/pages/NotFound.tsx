import { L } from '../components/Link'
import { useT } from '../i18n'

export default function NotFound() {
  const t = useT()
  return (
    <section className="sec"><div className="wrap narrow center">
      <h1>{t('notFoundTitle')}</h1>
      <p className="lead">{t('notFoundText')}</p>
      <div className="row c"><L to="/products" className="btn red big">{t('products')}</L><L to="/" className="btn ghost big">{t('home')}</L></div>
    </div></section>
  )
}
