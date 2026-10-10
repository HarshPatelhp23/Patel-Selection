// Central settings. Change the phone number or image folder here.
export const PHONE = '+919712592905'
export const PHONE_DISPLAY = '97125 92905'
export const WA_NUMBER = '919712592905'

const BASE = import.meta.env.BASE_URL
export const IMG_BASE = `${BASE}images/`

/** Full web address of a file in /public (WhatsApp needs a full address to show the photo preview) */
export const absUrl = (path: string) => new URL(path, window.location.href).href
