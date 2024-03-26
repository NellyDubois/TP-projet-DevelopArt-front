{
  "short_name": "React App", // Le nom court de l'application qui est utilisé sur l'écran d'accueil de l'utilisateur et à l'intérieur de l'application.
  "name": "Create React App Sample", // Le nom complet de l'application qui est utilisé sur l'écran d'installation et par les navigateurs.
  "icons": [ // Un tableau d'objets représentant les icônes de l'application.
    {
      "src": "favicon.ico", // Le chemin vers le fichier d'icône.
      "sizes": "64x64 32x32 24x24 16x16", // Les tailles de l'icône pour les différents appareils.
      "type": "image/x-icon" // Le type MIME de l'icône.
    },
    {
      "src": "logo192.png", // Le chemin vers le fichier d'icône.
      "type": "image/png", // Le type MIME de l'icône.
      "sizes": "192x192" // Les tailles de l'icône pour les différents appareils.
    },
    {
      "src": "logo512.png", // Le chemin vers le fichier d'icône.
      "type": "image/png", // Le type MIME de l'icône.
      "sizes": "512x512" // Les tailles de l'icône pour les différents appareils.
    }
  ],
  "start_url": ".", // L'URL qui est chargée lorsqu'une application est lancée à partir d'un appareil qui ne possède pas de connexion réseau.
  "display": "standalone", // Le mode d'affichage de l'application. "standalone" signifie que l'application s'ouvre en mode plein écran.
  "theme_color": "#000000", // La couleur du thème de l'application. Elle affecte la couleur de la barre d'outils et peut être utilisée pour colorer la barre d'état du système sur les appareils mobiles.
  "background_color": "#ffffff" // La couleur d'arrière-plan de l'application qui est utilisée sur l'écran de démarrage.
}