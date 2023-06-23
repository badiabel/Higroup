import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import logoCard from "../assets/logoCard.png";

const PaimentPage = () => {
  const navigate = useNavigate();
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [saveCardDetails, setSaveCardDetails] = useState(false);
  const [paymentResponse, setPaymentResponse] = useState("");

  const handleCardNumberChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    let formattedValue = "";

    for (let i = 0; i < value.length; i++) {
      if (i > 0 && i % 4 === 0) {
        formattedValue += " ";
      }
      formattedValue += value[i];
    }

    setCardNumber(formattedValue);
  };

  const handleExpiryDateChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 4) {
      const formattedValue = value.replace(/^(\d{2})(\d{0,2}).*/, "$1/$2");
      setExpiryDate(formattedValue);
    }
  };

  const handleCvvChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 3) {
      setCvv(value);
    }
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSaveCardDetailsChange = (e) => {
    setSaveCardDetails(e.target.checked);
  };

  const handlePayment = () => {
    if (
      cardNumber.trim().length !== 19 ||
      cardNumber.trim() === "" ||
      expiryDate.trim() === "" ||
      cvv.trim().length !== 3 ||
      cvv.trim() === "" ||
      username.trim() === "" ||
      email.trim() === ""
    ) {
      alert(
        "Veuillez remplir tous les champs ou compléter les 16 chiffres de la carte."
      );
      return;
    }

    const paymentData = {
      cardNumber,
      expiryDate,
      cvv,
      username,
      email,
      saveCardDetails,
    };

    fetch("http://localhost:8000/Paiment.php", {
      method: "POST",
      body: JSON.stringify(paymentData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          console.log("Payment successful");
          return response;
        } else {
          throw new Error("Payment request failed.");
        }
      })
      .then((data) => {
        setPaymentResponse(data);
        navigate("/EtatPaiment");
      })
      .catch((error) => {
        console.error(error);
        alert(
          "Une erreur s'est produite lors du paiement ou de l'envoi de l'e-mail. Veuillez réessayer."
        );
      });
  };

  return (
    <div className="container">
      <div className="text-center mt-5">
        <img src={logoCard} alt="Card Logo" style={{ height: "150px" }} />
      </div>
      <div className="mt-4 p-3">
        <div className="form-group mb-5">
          <label htmlFor="cardNumber">Card Number</label>
          <input
            type="text"
            className="form-control"
            id="cardNumber"
            value={cardNumber}
            onChange={handleCardNumberChange}
            placeholder="1234 5678 9012 3456"
            maxLength="19"
          />
        </div>

        <div className="form-group mb-4">
          <div className="row">
            <div className="col">
              <label htmlFor="expiryDate">Expiry Date</label>
              <input
                type="text"
                className="form-control"
                id="expiryDate"
                value={expiryDate}
                onChange={handleExpiryDateChange}
                placeholder="MM/YY"
                maxLength="5"
              />
            </div>
            <div className="col">
              <label htmlFor="cvv">CVV</label>
              <input
                type="text"
                className="form-control"
                id="cvv"
                value={cvv}
                onChange={handleCvvChange}
                placeholder="***"
                maxLength="3"
              />
            </div>
          </div>
        </div>

        <div className="form-group mb-4">
          <label htmlFor="username">Name on Card</label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={username}
            onChange={handleUsernameChange}
            placeholder="Username"
          />
        </div>

        <div className="form-group mb-4">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="example@example.com"
          />
        </div>

        <div className="form-check mb-4">
          <input
            type="checkbox"
            className="form-check-input"
            id="saveCardDetails"
            checked={saveCardDetails}
            onChange={handleSaveCardDetailsChange}
            style={{
              appearance: "none",
              WebkitAppearance: "none",
              width: "16px",
              height: "16px",
              borderRadius: "100%",
              outline: "none",
              border: "2px solid #BF1A33",
              backgroundColor: saveCardDetails ? "#BF1A33" : "transparent",
              marginRight: "10px",
              marginTop: "20px",
            }}
          />
          <label
            className="form-check-label"
            htmlFor="saveCardDetails"
            style={{ marginTop: "15px" }}
          >
            Enregistrer les détails de la carte
          </label>
        </div>

        <button
          className="btn btn-primary w-100 mt-3"
          type="submit"
          onClick={handlePayment}
          style={{
            borderRadius: "40px",
            backgroundColor: "#BF1A33",
            borderColor: "#BF1A33",
            boxShadow: "inset 0 0 5px rgba(0, 0, 0, 0.5)",
          }}
        >
          Payer
        </button>
      </div>
    </div>
  );
};

export default PaimentPage;
