exports.onRouteUpdate = () => {
  const teikeiEmbed = document.getElementById('teikei-app') || document.getElementById('teikei-search')

  if (teikeiEmbed) {
    const script = document.createElement('script')
    script.src = 'https://map-staging.teikei.allmende.io/main.js'
    script.async = true
    teikeiEmbed.insertAdjacentElement('afterend', script)
  }
}
