export function applyTheme() {
  const tvIFrames: HTMLIFrameElement[] = Array.from(
    document.querySelectorAll('iframe')
  ).filter(iframe => {
    return iframe.name.startsWith('tradingview');
  });

  const cssLink = document.createElement('link');
  cssLink.type = 'text/css';
  cssLink.href = 'bundles/ddx-tv-theme.css';
  cssLink.rel = 'stylesheet';

  tvIFrames.forEach(iframe => {
    iframe.contentDocument.head.appendChild(cssLink);
  });
}
