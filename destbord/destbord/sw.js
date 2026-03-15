self.addEventListener('install', (event) => {
    console.log('Service Worker: Instalado');
});

self.addEventListener('fetch', (event) => {
    // Deixa as requisições passarem normalmente por enquanto
});