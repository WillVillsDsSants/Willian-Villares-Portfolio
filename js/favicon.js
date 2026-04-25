    // Injeta favicon SVG diretamente via JS para máxima compatibilidade (Brave, Edge, DDG)
    (function(){
      var svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="#1A1715"/><text x="50" y="62" font-family="Georgia,serif" font-size="38" font-weight="400" fill="#F2EDE6" text-anchor="middle" dominant-baseline="middle">W.V</text></svg>';
      var encoded = 'data:image/svg+xml,' + encodeURIComponent(svg);
      var link = document.createElement('link');
      link.rel = 'icon'; link.type = 'image/svg+xml'; link.href = encoded;
      document.head.appendChild(link);
    })();
