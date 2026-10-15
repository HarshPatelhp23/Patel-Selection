import { L } from './Link'
import AddButton from './AddButton'
import { useLang, useT } from '../i18n'
import { photoOf } from '../hooks/photo'
import { productPath, type Product } from '../data/products'
import { fmtPrice, productCopy } from '../data/productCopy'

export default function ProductCard({ p, eager = false }: { p: Product; eager?: boolean }) {
  const t = useT(), lang = useLang()
  const photo = photoOf(p.slug)
  const c = productCopy(p, lang)
  return (
    <article className="pc">
      <L to={productPath(p)} className="pc-img" aria-label={`${p.brand} ${p.name}`}>
        {photo ? <img src={photo} alt={c.alt} width={450} height={450} loading={eager ? 'eager' : 'lazy'} decoding="async" /> : <span className="noimg" />}
      </L>
      <div className="pc-body">
        <small>{p.brand}</small>
        <h3><L to={productPath(p)}>{p.name}</L></h3>
        <div className={`pc-price${p.price ? '' : ' ask'}`}>{p.price ? fmtPrice(p.price) : t('rateOnRequest')}</div>
        <div className="pc-act"><AddButton p={p} /><L to={productPath(p)} className="pc-more">{t('viewDetails')}</L></div>
      </div>
    </article>
  )
}
