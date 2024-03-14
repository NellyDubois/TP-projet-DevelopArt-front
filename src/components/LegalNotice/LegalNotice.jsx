import './LegalNotice.scss';

export default function LegalNotice() {
  return (
    <div className="legalNotice">
      <h2 className="legalNotice_titre">Mentions Légales</h2>

      <div className="legalNotice_text">
        <p className="legalNotice_text_p">
          Bienvenue sur la page des mentions légales de Dévelop'Art. Cette page contient des informations importantes sur les conditions d'utilisation de notre site web. En accédant à ce site, vous acceptez les conditions énoncées ci-dessous. Veuillez lire attentivement ces informations avant d'utiliser notre site.
        </p>

        <p className="legalNotice_text_p">
          Propriété intellectuelle :
          Tous les contenus présents sur ce site, tels que les textes, les images, les vidéos, les graphiques, les logos et les œuvres d'art, sont la propriété exclusive de Dévelop'Art et sont protégés par les lois françaises et internationales sur le droit d'auteur. Aucune reproduction, distribution, modification ou utilisation des contenus, en tout ou en partie, n'est autorisée sans l'autorisation préalable de l'artiste.
        </p>

        <p className="legalNotice_text_p">
          Politique de confidentialité :
            Nous attachons une grande importance à la protection de vos données personnelles. Notre politique de confidentialité explique comment nous collectons, utilisons et protégeons vos informations lorsque vous visitez notre site. En utilisant ce site, vous consentez à notre politique de confidentialité."
        </p>

        <p className="legalNotice_text_p">
          Clause de non-responsabilité :
            Les informations fournies sur ce site sont fournies à titre informatif uniquement et peuvent être sujettes à des changements sans préavis. Nous nous efforçons de fournir des informations précises et à jour, mais nous ne pouvons garantir l'exactitude ou l'exhaustivité des informations fournies.
        </p>

        <p className="legalNotice_text_p">
          Loi applicable et juridiction compétente :
          Tout litige découlant de l'utilisation de ce site sera régi par la loi française et sera soumis à la juridiction exclusive des tribunaux français.
       </p>

      </div>
    </div>
  );
}
