(function() {

  // New location is sent on link click or on hash change
  function sendLocation(url) {
    window.parent.postMessage({
      iframeSyncUrl: url
    }, '*');
  }

  window.addEventListener('hashchange', function(event) {
    sendLocation(window.location.href);
  }, false);

  document.addEventListener('click', function(event) {
    var href;
    var target = event.target || event.srcElement;
    if (target.tagName === 'A') {
      href = target.href;
      sendLocation(href);
    }
  }, false);

  // Send title on load so that the parent page title can display correctly
  window.addEventListener('load', function(event) {
    window.parent.postMessage({
      iframeSyncTitle: document.title
    }, '*');
  }, false);

})();
