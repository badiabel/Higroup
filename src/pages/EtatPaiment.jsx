import React from "react";
import logoSucces from "../assets/logosucces.png";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";

const EtatPaiment = () => {
  const history = useNavigate();
  const handleClick = () => {
    history("/ParticipationPage");
  };
  return (
    <div className="text-center">
      <img
        src={logoSucces}
        alt="Success"
        style={{ width: "180px", marginTop: "180px" }}
      />
      <h3 style={{ marginTop: "50px" }}>Votre paiement a été accepté !</h3>
      <p>Préparez-vous à vivre une expérience de voyage de luxe.</p>
      <Button
        variant="success"
        style={{ marginTop: "100px", width: "200px", borderRadius: "100px" }}
        onClick={handleClick}
      >
        Passer
      </Button>
    </div>
  );
};

export default EtatPaiment;
