exports.onInitialClientRender = () => {
  const teikeiEmbed = document.getElementById('teikei-embed')
  if (teikeiEmbed) {
    const script = document.createElement('script')
    script.src = 'https://map-staging.teikei.allmende.io/main.js'
    script.async = true
    teikeiEmbed.insertAdjacentElement('afterend', script)
  }
}
