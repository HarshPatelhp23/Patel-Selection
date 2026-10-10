import { LOGO_FULL, LOGO_MINI } from './logoSvg'

/** Patel Selection logo (red/blue PS emblem). The same artwork is in public/images/logo.svg */
export default function Logo({ variant = 'full' }: { variant?: 'full' | 'mini' }) {
  return <span style={{ display: 'contents' }} dangerouslySetInnerHTML={{ __html: variant === 'mini' ? LOGO_MINI : LOGO_FULL }} />
}
