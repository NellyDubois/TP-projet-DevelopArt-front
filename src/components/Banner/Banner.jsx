import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './Banner.scss';

export default function Banner() {
  

const bannerImage = useSelector((state) => state.configuration.banner);
const logoUrl = useSelector((state) => state.configuration.logo);

console.log("bannerImage",bannerImage);
console.log("logoUrl",logoUrl);


  const bannerStyle = {
    backgroundImage: `url(${bannerImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  };
  
  return (
    <div className="banner" style={bannerStyle}>
      <Link to="/" className="banner_logo_link">
        <img
          className="banner_logo"
          src={logoUrl}
          alt="logo de Develop Art"
        />
      </Link>
  {/* Contenu de la bannière */}
</div>
  );
}