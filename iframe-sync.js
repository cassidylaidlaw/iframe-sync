
(function() {

  var iframe = null;
  var syncLocation = null;

  function addListener(domObject, event, listener) {
    if (domObject.addEventListener) { // Mozilla, Netscape, Firefox
      domObject.addEventListener(event, listener, false);
    } else if (domObject.attachEvent) { // IE
      domObject.attachEvent('on' + event, listener);
    }
  }

  function setupIframeSync() {
    var iframes = document.getElementsByTagName('iframe');
    for(var i = 0; i < iframes.length; i++) {
      if(iframes[i].getAttribute('data-sync-location') != null) {
        iframe = iframes[i];
        syncLocation = iframe.getAttribute('data-sync-location');
        break;
      }
    }

    if(iframe != null) {
      if(window.location.hash) {
        iframe.setAttribute('src', syncLocation +
          window.location.hash.substr(1))
      } else {
        iframe.setAttribute('src', syncLocation);
      }
    }
  }

  function syncIframeLocation(event) {
    var newUrl = event.data.iframeSyncUrl;
    if(newUrl != null) {
      if(newUrl.substring(0, syncLocation.length) === syncLocation) {
        window.location.hash = newUrl.substring(syncLocation.length);
      } else {
        // otherwise, just redirect the entire page
        window.location.href = newUrl;
      }
    }
  }

  // Run setup on document load
  window.addEventListener('load', setupIframeSync, false);
  window.addEventListener('message', syncIframeLocation, false);

})();
