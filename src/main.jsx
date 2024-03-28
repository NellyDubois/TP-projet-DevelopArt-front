/* Ce fichier est responsable de l'amorçage de l'application React.*/ 

/*Import de ReactDOM=framework de rendu React*/
import ReactDOM from 'react-dom/client';
/*Import de App=Composant racine de l'application*/
import App from '@/components/App/App';
/*Import de store=Store Redux*/
import store from './store';
import './styles/index.scss';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

/*ReactDOM rend le composant racine App dans l'élément avec l'ID "root" du fichier index.html. Cela démarre le processus de rendu de l'application React.*/
/*Utilisation de la méthode createRoot de ReactDOM pour créer un nouveau root React. Prend comme argument l'élément DOM avec l'id root (dans le fichier index.html) puis la méthode render est appelée pour rendre le contenu React dans ce root.*/
ReactDOM.createRoot(document.getElementById('root')).render(
  /*composant fourni par React Router qui enveloppe l'ensemble de l'application. Il permet à l'application React d'utiliser les fonctionnalités de routage pour gérer les URL et afficher les composants appropriés en fonction de l'URL actuelle.*/
  <BrowserRouter>
  {/* Provider est un composant fourni par Redux. Il enveloppe toute l'application et permet à tous les composants de l'application d'accéder au Redux store. Le store est passé en tant que propriété store, ce qui permet aux composants de lire l'état global et de dispatcher des actions Redux. */}
  <Provider store={store}>
  {/* composant racine de l'application. Il représente l'ensemble de l'application React et contient tous les autres composants, ainsi que la logique pour les afficher et les mettre à jour en fonction de l'état global de l'application. */}
    <App />
    </Provider>
  </BrowserRouter>
);
