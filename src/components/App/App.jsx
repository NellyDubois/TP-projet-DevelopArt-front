//ici on importe Routes pour faire fonctionner le router , et le hook useLocation qui nous permettra de savoir sur quel page nous sommes pour pouvoir ramener le user en haut de cette page avec window.scrollTo :
import { Routes, Route, useLocation } from 'react-router';

//Ici on importe useEffect :
import { useEffect } from 'react';

// ici on importe le useDispatch pour dispatcher(envoyer) les actions au reducer et useSelector pour se servir de ces données :
import { useDispatch, useSelector } from 'react-redux';

// ici on importe updateArtwork de la slice artistSlice pour que l'on puisse s'en servir
import { updateArtwork } from '../../store/artistSlice';

import { useParams } from 'react-router-dom';

//ici on importe le css de App:
import './App.scss';

//ici on importe les composants :
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
  const dispatch = useDispatch();
  const currentPage = useLocation();
  const token = useSelector((state) => state.artist.token);

  // ce useEffect est une fonction qui s'active seulement chargement de la currentPage [currentPage] de la page et qui nous permet de nous ramener en haut de la page en question systématiquement
  useEffect(() => {
    window.scrollTo(0, 0);
    // console.log("le current name", currentPage)
  }, [currentPage]);

  // ce useEffect permet de
  useEffect(() => {
    const action = updateArtwork(artworks);
    dispatch(action);
  }, []);
  useEffect(() => {
    const action = { type: 'GET_ARTWORK_HOMEPAGE' };
    dispatch(action);
  }, []);

  useEffect(() => {
    const actionConfig = { type: 'GET_DATA_ARTIST' };
    dispatch(actionConfig);

    const actionArtwork = { type: 'ARTWORK_GALLERY' };
    dispatch(actionArtwork);
  }, []);

  useEffect(() => {
    const action = { type: 'GET_CONFIG_FROM_API' };

    dispatch(action);
  }, []);

  useEffect(() => {
    const action = { type: 'GET_CATEGORIES_ARTIST'};
    dispatch(action);
  }, []);

  const fontFamily = useSelector((state) => state.configuration.font_type);

  const fontColor = useSelector((state) => state.configuration.font_color);

  const backgroundColor = useSelector(
    (state) => state.configuration.background_color
  );

  const backgroundColorNav = useSelector(
    (state) => state.configuration.background_color_nav
  );

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

  if (loading) {
    return <Loading />;
  } else {
    return (
      <div
        className="app"
        // {`app ${resultFont} ${resultColor}`}
        style={pageStyle}
      >
        <Banner />
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/galerie" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/galerie/:oeuvre" element={<Details />} />
          <Route
            path="/:artiste/personnalisation"
            element={<BackOfficePage />}
          />
          <Route path="/connexion" element={<LoginPage />} />
          <Route path="/:artiste/mentions" element={<LegalNotice />} />
          {token && (
            <Route
              path="/:artiste/personnalisation"
              element={<BackOfficePage />}
            />
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