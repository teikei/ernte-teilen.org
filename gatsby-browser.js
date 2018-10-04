exports.onRouteUpdate = () => {
  const teikeiEmbed = document.getElementById('teikei-app') || document.getElementById('teikei-search')
  const teikeiScript = document.getElementById('teikei-bundle')

  if (teikeiEmbed && !teikeiScript) {
    const styles = document.createElement('link')
    const script = document.createElement('script')
    styles.setAttribute('rel', 'stylesheet')
    styles.setAttribute('type', 'text/css')
    styles.setAttribute('href', `${process.env.GATSBY_TEIKEI_BUNDLES_URL}/main.css`)
    script.setAttribute('src', `${process.env.GATSBY_TEIKEI_BUNDLES_URL}/main.js`)
    script.id = 'teikei-bundle'
    script.async = true
    teikeiEmbed.insertAdjacentElement('afterend', script)
    teikeiEmbed.insertAdjacentElement('afterend', styles)
  }
}
