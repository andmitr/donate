var SVG_COPY  = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>';
var SVG_CHECK = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';

var toastTimer;

function showToast(msg) {
  var el = document.getElementById('toast');
  el.textContent = '✓  ' + msg;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(function () { el.classList.remove('show'); }, 2200);
}

function fallbackCopy(text, cb) {
  var ta = document.createElement('textarea');
  ta.value = text;
  ta.style.cssText = 'position:fixed;top:-9999px;left:-9999px;opacity:0';
  document.body.appendChild(ta);
  ta.focus();
  ta.select();
  try { document.execCommand('copy'); cb(); } catch (e) {}
  document.body.removeChild(ta);
}

document.querySelectorAll('.copy-btn').forEach(function (btn) {
  btn.addEventListener('click', function () {
    var card    = btn.closest('.wallet-card');
    var address = card.querySelector('.address-text').textContent.trim();
    var symbol  = card.querySelector('.coin-name').textContent.trim();

    function onCopied() {
      btn.classList.add('copied');
      btn.innerHTML = SVG_CHECK;
      showToast(symbol + ' address copied');
      setTimeout(function () {
        btn.classList.remove('copied');
        btn.innerHTML = SVG_COPY;
      }, 2000);
    }

    if (navigator.clipboard) {
      navigator.clipboard.writeText(address).then(onCopied).catch(function () {
        fallbackCopy(address, onCopied);
      });
    } else {
      fallbackCopy(address, onCopied);
    }
  });
});
