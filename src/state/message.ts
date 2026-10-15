import { tUI, type Lang } from '../i18n'
import type { ListItem } from './list'

/** The WhatsApp message with every item, quantity and the product page link (so the shop sees the exact photo and model). */
export function buildMessage(lang: Lang, items: ListItem[], name = '', area = '') {
  const lines = items.map((x, i) => `${i + 1}. ${x.label} x ${x.qty}${x.url ? `\n   ${x.url}` : ''}`)
  const head = [tUI(lang, 'waHello') + (name.trim() ? ', ' + tUI(lang, 'waIAm', { name: name.trim() }) : '.')]
  if (area.trim()) head.push(tUI(lang, 'waArea', { area: area.trim() }))
  return `${head.join(' ')}\n${tUI(lang, 'waShareRates')}\n${lines.join('\n')}`
}
