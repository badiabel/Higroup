import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import logo1 from "../assets/logo1.png";
import logoPaypal from "../assets/logoPaypal.png";
import logoMastercard from "../assets/logoMastercard.png";
import logoVisa from "../assets/logoVisa.png";

const MethodPaiment = () => {
  const history = useNavigate();

  const handlePayment = (paymentType) => {
    const data = new FormData();
    data.append("paymentType", paymentType);

    fetch("http://localhost:8000/Method.php", {
      method: "POST",
      body: data,
    })
      .then((response) => response.text())
      .then((result) => {
        console.log(result); // You can handle the response as needed
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    // Redirect to PaimentPage.jsx
    history("/PaimentPage");
  };

  return (
    <div>
      <div
        style={{
          backgroundColor: "#BF1A33",
          height: "70px",
          position: "fixed",
          top: 0,
          width: "100%",
          zIndex: 999,
        }}
      >
        <img
          src={logo1}
          alt="Logo"
          style={{ height: "100%", padding: "5px" }}
        />
      </div>
      <div style={{ marginTop: "250px", textAlign: "left" }}>
        <p
          style={{
            fontWeight: "bold",
            fontSize: "20px",
            marginLeft: "50px",
            marginTop: "50px",
          }}
        >
          Sélectionnez une méthode de paiement.
        </p>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "50px",
            maxWidth: "400px",
            margin: "0 auto",
          }}
        >
          <Button
            variant="primary"
            className="payment-button"
            style={{
              fontSize: "14px",
              padding: "15px 8px",
              marginBottom: "20px",
              width: "300px",
              backgroundColor: "white",
              color: "gray",
              boxShadow: "0px 6px 10px rgba(0, 0, 0, 0.2)", // Increased box shadow
              border: "1px solid white",
            }}
            onClick={() => handlePayment("Visa")}
          >
            <img
              src={logoVisa}
              alt="logo"
              style={{ height: "35px", padding: "0px 20px 0px 0px" }}
            />
            Visa
          </Button>
          <Button
            variant="primary"
            className="payment-button"
            style={{
              fontSize: "14px",
              padding: "15px 8px",
              marginBottom: "20px",
              width: "300px",
              backgroundColor: "white",
              color: "gray",
              boxShadow: "0px 6px 10px rgba(0, 0, 0, 0.2)", // Increased box shadow
              border: "1px solid white",
            }}
            onClick={() => handlePayment("Mastercard")}
          >
            <img
              src={logoMastercard}
              alt="logo"
              style={{ height: "35px", padding: "0px 20px 0px 0px" }}
            />
            Mastercard
          </Button>
          <Button
            variant="primary"
            className="payment-button"
            style={{
              fontSize: "14px",
              padding: "15px 8px",
              marginBottom: "100px",
              width: "300px",
              backgroundColor: "white",
              color: "gray",
              boxShadow: "0px 6px 10px rgba(0, 0, 0, 0.2)", // Increased box shadow
              border: "1px solid white",
            }}
          >
            <img
              src={logoPaypal}
              alt="logo"
              style={{ height: "35px", padding: "0px 20px 0px 0px" }}
            />
            PayPal
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MethodPaiment;
