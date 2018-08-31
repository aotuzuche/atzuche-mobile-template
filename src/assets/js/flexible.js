(function(window, document) {
  const documentElement = document.documentElement
  const dpr = window.devicePixelRatio || 1

  function setFontsize() {
    const fontsize = documentElement.clientWidth / 3.75
    documentElement.style.fontSize = fontsize + 'px'
  }
  if (
    ((function e() {
      document.body
        ? (document.body.style.fontSize = '16px')
        : document.addEventListener('DOMContentLoaded', e)
    })(),
    setFontsize(),
    window.addEventListener('resize', setFontsize),
    window.addEventListener('pageshow', function(event) {
      event.persisted && setFontsize()
    }),
    dpr >= 2)
  ) {
    const body = document.createElement('body')
    const div = document.createElement('div')
    div.style.border = '.5px solid transparent'
    body.appendChild(div)
    documentElement.appendChild(body)
    div.offsetHeight === 1 && documentElement.classList.add('hairlines')
    documentElement.removeChild(body)
  }
})(window, document)
