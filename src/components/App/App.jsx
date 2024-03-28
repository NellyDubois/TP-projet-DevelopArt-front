/* Ce composant est le composant principal de l'application. Il définit la structure de base de l'nterface utilisateur, en incluant des composants tels que la barre de navigation, le contenu principal et le pied de page. Ce fichier définit également les routes de l'application à l'aide de composants React Router, ce qui permet à l'application de naviguer entre différentes pages.*/

/*ici on importe Routes pour faire fonctionner le router, et le hook useLocation qui nous permettra de savoir sur quelle page nous sommes pour pouvoir ramener le user en haut de cette page avec window.scrollTo */
import { Routes, Route, useLocation } from 'react-router';

/*Import de useEffect pour gérer les effets de bord ie des opérations ne relevant pas directement du rendu d'un composant (par exemple chargement de données depuis une API, mise à jour du state Redux, ou le contrôle du comportement de la page en fonction de certains événements. Ces actions sont déclenchées à des moments spécifiques du cycle de vie du composant, comme le chargement initial, la mise à jour du state*/
import { useEffect } from 'react';

// ici on importe le hook useDispatch pour dispatcher(envoyer) les actions au reducer et le hook useSelector pour utiliser les données du sore Redux
import { useDispatch, useSelector } from 'react-redux';

// Import de l'action updateArtwork depuis la slice artistSlice pour mettre à jour les œuvres d'art
import { updateArtwork } from '../../store/artistSlice';

import { useParams } from 'react-router-dom';

// Import du CSS spécifique au composant App
import './App.scss';

// Import des composants nécessaires pour construire l'application
import Home from '../Home/Home';
import Nav from '../Nav/Nav';
import Gallery from '../Gallery/Gallery';
import Banner from '../Banner/Banner';
import Footer from '../Footer/Footer';
import Contact from '../Contact/Contact';
import artworks from '../../data/dataArtwork';
import BackOfficePage from '../BackOfficePage/BackOfficePage';
import LegalNotice from '../LegalNotice/LegalNotice';
import StatisticsPage from '../StatisticsPage/StatisticsPage';
import Details from '../Details/Details';
import NotFound from '../NotFound/NotFound';
import LoginPage from '../LoginPage/LoginPage';
import Loading from '../Loading/Loading';
import ScrollToTop from '../ScrollToTop/ScrollToTop';

function App() {
   // Initialisation du hook useDispatch pour envoyer des actions Redux
  const dispatch = useDispatch();
  // Récupération de l'URL actuelle avec le hook useLocation
  const currentPage = useLocation();
  // Récupération du jeton d'authentification de l'artiste depuis le store Redux
  const token = useSelector((state) => state.artist.token);

  // Effet de bord pour remonter en haut de la page à chaque changement de page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  // Effet de bord pour mettre à jour les œuvres d'art au chargement de l'application
   useEffect(() => {
    const action = updateArtwork(artworks);
    dispatch(action);
  }, []);

  // Effet de bord pour charger les données de l'artiste et des oeuvres d'art sur la homepage
  useEffect(() => {
    const action = { type: 'GET_ARTWORK_HOMEPAGE' };
    dispatch(action);
  }, []);

  // Effet de bord pour récupérer les données depuis l'API
  useEffect(() => {
    const actionConfig = { type: 'GET_DATA_ARTIST' };
    dispatch(actionConfig);

    // Effet de bord pour récupérer les données de la galerie d'art depuis l'API
    const actionArtwork = { type: 'ARTWORK_GALLERY' };
    dispatch(actionArtwork);
  }, []);

  // Effet de bord pour charger la configuration depuis l'API
  useEffect(() => {
    const action = { type: 'GET_CONFIG_FROM_API' };

    dispatch(action);
  }, []);

  // Effet de bord pour récupérer les catégories de l'artiste depuis l'API
  //crée un effet de bord qui s'exécute une seule fois, juste après le rendu initial du composant
  useEffect(() => {
    const action = { type: 'GET_CATEGORIES_ARTIST'}; //création de l'action GET_CATEGORIES_ARTIST
    dispatch(action); //la fonction dispatch est utilisée pour envoyer une action à un reducer. Elle est fournie par le store Redux et permet de mettre à jour l'état global de l'application en fonction de l'action envoyée (ici l'action GET_CATEGORIES_ARTIST)
    }, []);//[] signifie que cet effet de bord ne dépend d'aucune variable du composant

  // Récupère les styles de la page depuis le store Redux
  // useSelector est un hook fourni par Redux qui permet à un composant React de sélectionner une partie spécifique de l'état global du store Redux. Il accepte une fonction de sélecteur en argument.La fonction de sélecteur reçoit l'état global du store en tant que paramètre (ici, nommé state), et retourne la partie de l'état que le composant souhaite utiliser.
  const fontFamily = useSelector((state) => state.configuration.font_type); //Dans cette fonction de sélecteur, state.configuration.font_type accède à la propriété font_type de l'objet configuration dans l'état global du store Redux.La valeur de fontFamily sera automatiquement mise à jour dès que la valeur de font_type dans le store Redux changera
  const fontColor = useSelector((state) => state.configuration.font_color);
  const backgroundColor = useSelector((state) => state.configuration.background_color);
  const backgroundColorNav = useSelector((state) => state.configuration.background_color_nav);
  //la valeur de cursor est extraite du store Redux, mais elle est ensuite transformée en une chaîne de caractères en ajoutant le préfixe ${state.configuration.cursor}.
  const cursor = useSelector((state) => `${state.configuration.cursor}`);
  const logo = useSelector((state) => `${process.env.REACT_APP_BASE_URL_BACK}${state.configuration.logo}`);
  const loading = useSelector((state) => state.configuration.loading);

  // PageStyle chapeautera tout le style :
  const pageStyle = {
    fontFamily,
    color: fontColor,
    backgroundColor,
    backgroundColorNav,
    loading,
    cursor,
    logo,
  };

  // Rendu conditionnel en fonction de l'état de chargement
  if (loading) { //Si loading est vraie, cela signifie que les données nécessaires au rendu de la page ne sont pas encore chargées. Dans ce cas, le composant <Loading /> est rendu pour afficher une indication de chargement à l'utilisateur.
    return <Loading />;
  } else { //Sinon, si loading est fausse, cela signifie que les données nécessaires au rendu de la page ont été chargées. Dans ce cas, le reste de l'application est rendu normalement.
    return (
      <div //conteneur principal du composant, avec une classe CSS "app" pour le style et des propriétés de style dynamiques définies par l'objet pageStyle.
        className="app"
        style={pageStyle}
      >
      {/* À l'intérieur de ce conteneur, divers composants sont rendus pour construire la structure de la page : Les composants <Banner />, <Nav />, <ScrollToTop /> et <Footer /> sont rendus indépendamment de l'état de loading, car ils font partie de la mise en page de base de la page.*/}
        <Banner />
        <Nav />
        <Routes>
        {/* À l'intérieur de <Routes>, différentes routes sont définies pour rendre les composants correspondants en fonction de l'URL actuelle de la page. Par exemple, le composant <Home /> est rendu lorsque l'URL correspond à "/" */}
          <Route path="/" element={<Home />} />
          <Route path="/galerie" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/galerie/:oeuvre" element={<Details />} />
          <Route path="/:artiste/personnalisation" element={<BackOfficePage />} />
          <Route path="/connexion" element={<LoginPage />} />
          <Route path="/:artiste/mentions" element={<LegalNotice />} />
          {/* Les routes ci-dessous ne seront rendues que si un token utilisateur est disponible, ce qui indique que l'utilisateur est connecté. */}
          {token && (
            <Route path="/:artiste/personnalisation" element={<BackOfficePage />} />
          )}
          {token && (
            <Route path="/:artiste/statistiques" element={<StatisticsPage />} />
          )}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ScrollToTop />
        <Footer />
      </div>
    );
  }
}

export default App;