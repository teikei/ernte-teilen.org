exports.onRouteUpdate = () => {
  const teikeiEmbed = document.getElementById('teikei-app') || document.getElementById('teikei-search')
  const teikeiScript = document.getElementById('teikei-bundle')

  if (teikeiEmbed && !teikeiScript) {
    const script = document.createElement('script')
    script.src = process.env.GATSBY_TEIKEI_BUNDLE_URL
    script.id = 'teikei-bundle'
    script.async = true
    teikeiEmbed.insertAdjacentElement('afterend', script)
  }
}
