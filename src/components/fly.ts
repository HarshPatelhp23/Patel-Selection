/** A small picture that flies from a button to the "My list" tab, so the customer sees where the item went. */
export function flyToList(from: HTMLElement | null, src: string) {
  const target = document.querySelector<HTMLElement>('[data-listtab]')
  if (!from || !target || !('animate' in HTMLElement.prototype)) return
  if (matchMedia('(prefers-reduced-motion:reduce)').matches) return
  const a = from.getBoundingClientRect(), b = target.getBoundingClientRect()
  const img = document.createElement('img')
  img.src = src; img.alt = ''; img.className = 'fly'
  img.style.left = `${a.left + a.width / 2 - 28}px`
  img.style.top = `${a.top + a.height / 2 - 28}px`
  document.body.appendChild(img)
  const dx = b.left + b.width / 2 - (a.left + a.width / 2), dy = b.top + b.height / 2 - (a.top + a.height / 2)
  const run = img.animate([
    { transform: 'translate(0,0) scale(1) rotate(0deg)', opacity: 1 },
    { transform: `translate(${dx * 0.45}px,${dy * 0.45 - 110}px) scale(.85) rotate(-10deg)`, opacity: 1, offset: 0.45 },
    { transform: `translate(${dx}px,${dy}px) scale(.18) rotate(14deg)`, opacity: 0.25 },
  ], { duration: 720, easing: 'cubic-bezier(.45,.05,.55,.95)' })
  run.onfinish = () => img.remove()
  run.oncancel = () => img.remove()
  if ('vibrate' in navigator) navigator.vibrate(10)
}
