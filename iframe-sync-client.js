(function() {

  function sendLocation(url) {
    window.parent.postMessage({
      iframeSyncUrl: url
    }, '*');
  }

  window.addEventListener('hashchange', function(event) {
    sendLocation(window.location.href);
  });

  document.addEventListener('click', function(event) {
    var href;
    var target = event.target || event.srcElement;
    if (target.tagName === 'A') {
      href = target.href;
      sendLocation(href);
    }
  });

})();
