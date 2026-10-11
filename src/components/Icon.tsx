const PATHS = {
  phone: 'M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z',
  home: 'M3 11l9-8 9 8M5 10v10h5v-6h4v6h5V10',
  bag: 'M6 7h12l1 13H5zM9 7a3 3 0 0 1 6 0',
  chat: 'M4 5h16v11H9l-5 4z',
  pin: 'M12 21s7-6.5 7-12a7 7 0 0 0-14 0c0 5.5 7 12 7 12zM12 11.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z',
  truck: 'M2 6h12v10H2zM14 10h4l3 3v3h-7zM6 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM17 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4z',
  camera: 'M4 8h3l2-3h6l2 3h3v11H4zM12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
  tag: 'M3 12V3h9l9 9-9 9zM7.5 7.5h.01',
  check: 'M5 12l5 5 9-10',
  plus: 'M12 5v14M5 12h14',
  minus: 'M5 12h14',
  close: 'M6 6l12 12M18 6L6 18',
  list: 'M8 6h12M8 12h12M8 18h12M3.5 6h.01M3.5 12h.01M3.5 18h.01',
  bucket: 'M5 7h14l-2 13H7zM4 7h16M8 7a4 4 0 0 1 8 0',
  plate: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
  flask: 'M9 3h6v3H9zM8 6h8v15H8zM8 11h8',
  pot: 'M4 10h16v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zM2 10h20M9 6h6M12 6V4',
  pan: 'M10 20a7 7 0 1 1 0-14 7 7 0 0 1 0 14zM16 16l6 4',
  sofa: 'M4 11a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v5H4zM2 12v6h20v-6M5 18v2M19 18v2',
  plug: 'M9 3v5M15 3v5M6 8h12v4a6 6 0 0 1-12 0zM12 18v3',
  sort: 'M7 4v16M7 20l-3-3M7 20l3-3M17 20V4M17 4l-3 3M17 4l3 3',
  play: 'M7 4l13 8-13 8z',
  stop: 'M6 6h12v12H6z',
  grid: 'M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z',
  search: 'M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM20 20l-4-4',
  up: 'M6 15l6-6 6 6',
  down: 'M6 9l6 6 6-6',
  left: 'M15 5l-7 7 7 7',
  right: 'M9 5l7 7-7 7',
  spark: 'M12 3l2.2 6.3L21 12l-6.8 2.7L12 21l-2.2-6.3L3 12l6.8-2.7z',
  cube: 'M12 3l8 4.5v9L12 21l-8-4.5v-9zM12 12l8-4.5M12 12v9M12 12L4 7.5',
}
export type IconName = keyof typeof PATHS

export default function Icon({ name }: { name: IconName }) {
  return <svg className="ic" viewBox="0 0 24 24" aria-hidden="true"><path d={PATHS[name]} /></svg>
}
