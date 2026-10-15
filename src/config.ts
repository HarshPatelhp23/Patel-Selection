// Central settings. Change the phone number, address or timings here.
export const SITE_URL: string = __SITE_URL__
export const PHONE = '+919712592905'
export const PHONE_DISPLAY = '97125 92905'
export const WA_NUMBER = '919712592905'
export const OWNER = 'Arvind Patel'
export const BASE = import.meta.env.BASE_URL
export const IMG_BASE = `${BASE}images/`

export const ADDRESS = {
  street: 'Opp. Tata Motors Show Room, Nr. Mercedes Show Room, Ambli-Bopal Road',
  locality: 'Ahmedabad', region: 'Gujarat', postal: '380058', country: 'IN',
}
export const MAPS_LINK = 'https://www.google.com/maps/search/?api=1&query=Patel+Selection+Ambli+Bopal+Road+Ahmedabad+380058'
export const MAPS_EMBED = 'https://www.google.com/maps?q=Patel+Selection+Ambli+Bopal+Road+Ahmedabad+380058&output=embed'

/**
 * SHOP TIMINGS: fill these in and they appear on the Visit page and in Google's business data.
 * Example: { days: ['Mo','Tu','We','Th','Fr','Sa'], opens: '10:00', closes: '20:30', text: 'Mon-Sat, 10:00 am to 8:30 pm' }
 * Leave as null until you are sure (wrong timings hurt local ranking more than none).
 */
export const HOURS: null | { days: string[]; opens: string; closes: string; text: string } = null

/** Optional: after you create your Google Business Profile, paste its link (and Facebook/Instagram/JustDial pages) here. */
export const SAME_AS: string[] = []

/** Full web address of a path on this site (WhatsApp and Google need full addresses) */
export const absUrl = (path: string) => (/^https?:/.test(path) ? path : `${SITE_URL}${path.startsWith('/') ? '' : '/'}${path}`)
