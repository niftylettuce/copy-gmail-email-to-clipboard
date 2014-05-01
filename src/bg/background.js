
// # Copy Gmail Email to Clipboard

chrome.runtime.onConnect.addListener(function(port) {

  port.onMessage.addListener(function(message) {

    if (typeof message.clipboard === 'string')
      copyTextToClipboard(message.clipboard)

    if (typeof message.image !== 'string'
        || typeof message.title !== 'string'
        || typeof message.description !== 'string')
      return

    var notification = webkitNotifications.createNotification(
      message.image,
      message.title,
      message.description
    )

    notification.addEventListener('click', function() {
      notification.cancel()
      if (typeof message.url === 'string')
        window.open(message.url)
    })

    notification.show()

    if (typeof message.timeout === 'number')
      setTimeout(function() {
        notification.cancel()
      }, message.timeout)

  })

})

// <https://stackoverflow.com/a/17644403>
function copyTextToClipboard(html) {

  var tmpNode = document.createElement('div')
  tmpNode.innerHTML = html
  document.body.appendChild(tmpNode)

  // Back up previous selection
  var selection = window.getSelection()
  var backupRange
  if (selection.rangeCount)
    backupRange = selection.getRangeAt(0).cloneRange()

  // Copy the contents
  var copyFrom = document.createRange()
  copyFrom.selectNodeContents(tmpNode)
  selection.removeAllRanges()
  selection.addRange(copyFrom)
  document.execCommand('copy')

  // Clean-up
  tmpNode.parentNode.removeChild(tmpNode)

  // Restore selection
  selection = window.getSelection()
  selection.removeAllRanges()
  if (backupRange)
    selection.addRange(backupRange)

}
