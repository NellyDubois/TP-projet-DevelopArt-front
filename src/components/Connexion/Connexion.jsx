import './Connexion.scss'

export default function Connexion() {
    return (
        <div className="connexion">
            
           <form className="connexion_form" action="">

            <fieldset className="connexion_form_fieldset">
                <legend className="connexion_form_legend">SE CONNECTER</legend>
                <label className="connexion_form_label" htmlFor="email">Ton Email ici</label>
                <input className="connexion_form_input"type="email" />
                <label className="connexion_form_label" htmlFor="password">Ton Password ici</label>
                <input className="connexion_form_input" type="password" />

                <input className="connexion_form_submit" type="submit" value="Valider"/>
            </fieldset>

           </form>
        </div>
    )
}