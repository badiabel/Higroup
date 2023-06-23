import React from "react";
import logo from "../assets/logo1.png";
import logo2 from "../assets/logoFelicitation.png";
import image5 from "../assets/image5.png";

const ParticipationPage = () => {
  return (
    <div>
      <div
        style={{
          backgroundColor: "#BF1A33",
          height: "70px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img src={logo} alt="Logo" style={{ height: "50px" }} />
      </div>
      <div
        className="text-center"
        style={{
          padding: "20px",
          maxWidth: "500px",
          margin: "0 auto",
        }}
      >
        <img
          src={logo2}
          alt="Logo"
          style={{ width: "170px", marginTop: "30px" }}
        />
        <h3
          style={{
            fontFamily: "Roboto",
            fontSize: "24px",
            marginTop: "20px",
            color: "#BF1A33",
            fontWeight: "bold",
          }}
        >
          Félicitations ! Vous avez participé au tirage au sort pour un
          surclassement en classe affaires. Bonne chance !
        </h3>
        <p
          style={{
            fontFamily: "Roboto",
            fontSize: "16px",
            marginTop: "20px",
            color: "#555555",
            fontWeight: "bold",
          }}
        >
          Le résultat du tirage sera envoyé à votre adresse e-mail.
        </p>
        <img
          src={image5}
          alt="Image"
          style={{ width: "100%", marginTop: "20px" }}
        />
      </div>
    </div>
  );
};

export default ParticipationPage;
