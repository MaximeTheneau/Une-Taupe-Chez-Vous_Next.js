// == Import
// import FouineSvg from "../../../../../assets/svg/fouine.svg";

// == Composant
export default function Fouine() {
  return (
    <>
      <h1>Fouine </h1>
      <div className="service-card">
        <div className="service-card_img">
          {/* <FouineSvg /> */}
        </div>
        <div className="service-card_content">
          <h2>Les taupes jouent un rôle dans l'écosystème.</h2>
          <p>
            L'objectif est de limiter la prolifération des taupes, fouines ou
            autres animaux nuisibles dans les Yvelines grâce à des méthodes
            naturelles de piégeage, sans produits chimiques ou nocifs pour
            l'environnement.
          </p>
        </div>
      </div>
    </>
  );
}
