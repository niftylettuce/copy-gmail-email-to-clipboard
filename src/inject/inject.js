
// # Copy Gmail Email to Clipboard

(function(window, $) {

  var icons48 = chrome.extension.getURL('icons/icon48.png')

  var port = chrome.runtime.connect()

  $('body').on('dblclick', '.gL span[email]', dblclick)
  $('body').on('dblclick', 'h3.iw', dblclick)
  $('body').on('dblclick', 'span.g2', dblclick)

  function dblclick(ev) {
    var $that = $(this)
    var email = ''
    var name = ''
    var isSpan = this.nodeName === 'SPAN'
    if (isSpan) {
      email = $that.attr('email')
      name = $that.attr('name')
    } else {
      email = $that.find('span[email]').attr('email')
      name = $that.find('span[name]').attr('name')
    }
    if (typeof name === 'undefined' || typeof name === 'object')
      email = isSpan ? $that.html() : $that.find('span[email]').html()
    else if (name !== 'me')
      email = name + ' &lt;' + email + '&gt;'
    port.postMessage({
      clipboard: email,
      image: icons48,
      title: 'Copied email address to clipboard!',
      description: '"' + email.replace('&lt;', '<').replace('&gt;', '>') + '" has been copied to your clipboard; CMD+V/CTRL+V to paste.  This message will auto-hide in 5 seconds.',
      timeout: 5000
    })
  }

})(window, Zepto)
