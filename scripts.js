const WALLETS = [
  { id: 'btc',  symbol: 'BTC',  name: 'Bitcoin',  network: 'Bitcoin', icon: '₿', address: 'YOUR_BTC_ADDRESS_HERE'  },
  { id: 'eth',  symbol: 'ETH',  name: 'Ethereum', network: 'ERC-20',  icon: 'Ξ', address: 'YOUR_ETH_ADDRESS_HERE'  },
  { id: 'usdt', symbol: 'USDT', name: 'Tether',   network: 'TRC-20',  icon: '₮', address: 'YOUR_USDT_ADDRESS_HERE' },
  { id: 'usdc', symbol: 'USDC', name: 'USD Coin', network: 'ERC-20',  icon: '$', address: 'YOUR_USDC_ADDRESS_HERE' },
];

const SVG_COPY = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`;
const SVG_CHECK = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`;
const SVG_CHEVRON = `<svg class="qr-chevron" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>`;

function buildCards() {
  const container = document.getElementById('wallets');

  WALLETS.forEach(w => {
    const card = document.createElement('div');
    card.className = 'wallet-card ' + w.id;
    card.innerHTML =
      '<div class="wallet-header">' +
        '<div class="coin-icon" aria-hidden="true">' + w.icon + '</div>' +
        '<div>' +
          '<div class="coin-name">' + w.symbol + '</div>' +
          '<div class="coin-sub">' + w.name + '</div>' +
        '</div>' +
        '<span class="wallet-network">' + w.network + '</span>' +
      '</div>' +
      '<div class="address-row">' +
        '<span class="address-text" title="' + w.address + '">' + w.address + '</span>' +
        '<button class="copy-btn" aria-label="Copy ' + w.symbol + ' address">' + SVG_COPY + '</button>' +
      '</div>' +
      '<button class="qr-toggle" aria-expanded="false">' + SVG_CHEVRON + ' Show QR code</button>' +
      '<div class="qr-panel" aria-label="' + w.symbol + ' QR code"></div>';

    container.appendChild(card);

    const copyBtn   = card.querySelector('.copy-btn');
    const qrToggle  = card.querySelector('.qr-toggle');
    const qrPanel   = card.querySelector('.qr-panel');
    let qrRendered  = false;

    copyBtn.addEventListener('click', function () {
      function onCopied() {
        copyBtn.classList.add('copied');
        copyBtn.innerHTML = SVG_CHECK;
        showToast(w.symbol + ' address copied');
        setTimeout(function () {
          copyBtn.classList.remove('copied');
          copyBtn.innerHTML = SVG_COPY;
        }, 2000);
      }
      if (navigator.clipboard) {
        navigator.clipboard.writeText(w.address).then(onCopied).catch(function () { fallbackCopy(w.address, onCopied); });
      } else {
        fallbackCopy(w.address, onCopied);
      }
    });

    qrToggle.addEventListener('click', function () {
      var open = qrPanel.classList.toggle('open');
      qrToggle.classList.toggle('open', open);
      qrToggle.setAttribute('aria-expanded', String(open));
      qrToggle.lastChild.textContent = open ? ' Hide QR code' : ' Show QR code';

      if (open && !qrRendered && typeof QRCode !== 'undefined') {
        qrRendered = true;
        new QRCode(qrPanel, {
          text: w.address,
          width: 180, height: 180,
          colorDark: '#000000', colorLight: '#ffffff',
          correctLevel: QRCode.CorrectLevel.M,
        });
      }
    });
  });
}

function fallbackCopy(text, cb) {
  var ta = document.createElement('textarea');
  ta.value = text;
  ta.style.cssText = 'position:fixed;top:-9999px;left:-9999px;opacity:0';
  document.body.appendChild(ta);
  ta.focus(); ta.select();
  try { document.execCommand('copy'); cb(); } catch (e) {}
  document.body.removeChild(ta);
}

var toastTimer;
function showToast(msg) {
  var el = document.getElementById('toast');
  el.textContent = '✓  ' + msg;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(function () { el.classList.remove('show'); }, 2200);
}

document.addEventListener('DOMContentLoaded', buildCards);
