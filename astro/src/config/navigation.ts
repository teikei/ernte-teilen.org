export interface NavItem {
  text: string
  href: string
}

export const offCanvasMenu = {
  close: 'Schließen',
  nav: [
    { text: 'Solawi finden', href: '/karte/#/' },
    { text: 'Was ist Solawi?', href: '/solawi' },
    { text: 'Mitmachen', href: '/mitmachen' },
    { text: 'Mitglieder finden', href: '/betriebe' },
    { text: 'Gründen', href: '/initiativen' },
  ] as NavItem[],
}

export const search = {
  label: 'Finde eine Solawi in deiner Nähe',
}

export const header = {
  logo_alt: 'Ernte teilen!',
  login: 'Anmelden',
  menu: 'Menü',
  nav: [
    { text: 'Was ist Solawi?', href: '/solawi' },
    { text: 'Finde eine Solawi in Deiner Nähe', href: '/karte/#/' },
  ] as NavItem[],
}

export const footer = {
  logo_alt: 'Ernte teilen!',
  nav: [
    { text: 'Über Solidarische Landwirtschaft', href: '/solawi' },
    { text: 'Datenschutz', href: '/datenschutz' },
    { text: 'Kontakt & Impressum', href: '/impressum' },
  ] as NavItem[],
  credits: {
    prefix: 'Ein Angebot des ',
    text: 'Netzwerks Solidarische Landwirtschaft e.V.',
    href: 'https://www.solidarische-landwirtschaft.org',
  },
}
