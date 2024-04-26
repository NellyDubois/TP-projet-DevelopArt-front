# Projet DevelopArt back

## Résumé :

Dévelop'Art est un CMS permettant aux artistes de créer facilement leur propre site web artistique personnalisé.

## Objectif 

L’objectif du projet Dévelop’Art est de mettre à disposition un CMS offrant une ou plusieurs intégrations personnalisées et esthétiques que les artistes pourront choisir selon leurs préférences. Grâce à un accès à un back office, ils pourront agencer leur galerie d’art à leur convenance en ayant la possibilité de sélectionner différents designs, fonds, polices, agencements..  
Pourquoi pas pousser le truc un peu plus loin : proposer une solution e-commerce.   
De plus, cette solution pourrait être déclinée pour d'autres artistes que les photographes (peintres, sculpteurs,...), offrant ainsi une option flexible et personnalisable pour la création de sites artistiques.  

La cible principale du projet Dévelop’Art est donc les artistes dans leur diversité: 
photographes, peintres, sculpteurs, … souhaitant disposer d’un site web personnalisé, notamment en termes d’esthétique.

La cible indirecte est donc également les visiteurs des sites web créés à travers Dévelop’Art pour ces artistes.

## MVP du projet

- Présentation de l’artiste avec quelques-unes de ses oeuvres  
- Affichage des oeuvres de l’artiste sous forme de galerie avec un lien pour accéder aux détails des oeuvres  
- Sélection des oeuvres en filtrant par catégorie  
- Visualisation du détail des oeuvres : affichage de l’oeuvre en plus grand format, description détaillée de l’oeuvre  
- Possibilité de se logguer en tant qu’artiste pour accéder à une page back office qui permettrait de:  
  - changer la couleur de fond parmi 2 ou 3 proposées (blanc, noir ou palette de couleurs pour que l’artiste personnalise complètement son fond)   
  - avoir le choix entre 2 ou 3 agencements possibles  
  - avoir le choix entre 2 ou 3 polices  
  - personnaliser sa bannière  
  - télécharger ses images,ajouter ses descriptions / catégories  
  - préciser les contacts, les liens vers les réseaux sociaux  
- Contacter l’artiste  
- Ajout des mentions légales : droits d’auteur

## Architecture

1 repo github pour le back et un pour le front.

Le front récupère les données de l'API RESTful (back) via des fetch.

## Routes front

## Installation et Configuration du front-end de Develop'Art

### Prérequis:


### Étapes d'installation
- Clonez ce dépôt sur votre machine :
```bash
git clone <lien-du-repo>
```
- Accédez au répertoire du projet :
```bash
cd DevelopArt-FRONT
```
- Installez les dépendances npm :
```bash
npm install
```
- Configurez le fichier .env
  - Créez un fichier .env à la racine du projet à partir du fichier .env.example
    ```bash
    cp .env.example .env
    ```
  - renseigner les valeurs dans le fichier .env    

- Lancez le serveur en exécutant la commande suivante :
```bash
  npm run dev
```



