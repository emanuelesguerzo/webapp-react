import { Link } from "react-router-dom";

const HomePage = () => {

  return (

    <>
      <section>
        <h1>Benvenuto su Boolflix!</h1>
        <p>Fatti stuzzicare dalla nostra selezione di film</p>
        <Link to="/movies">Sei in cerca di film? Clicca Qui!</Link>
      </section>
    </>
    
  );

}

export default HomePage;