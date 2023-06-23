import React, { useState } from "react";
import { Container, Button, ButtonGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import logo1 from "../assets/logo1.png";
import image from "../assets/image4.png";

const AchatBilletPage = () => {
  const [ticketType, setTicketType] = useState("");
  const [ticketCount, setTicketCount] = useState(1);
  const [maxTickets, setMaxTickets] = useState(6);
  const navigate = useNavigate();

  const handleTicketType = (type) => {
    setTicketType(type);
    if (type === "solo") {
      setMaxTickets(6);
    } else if (type === "couple") {
      setMaxTickets(3);
    } else if (type === "Famille") {
      setMaxTickets(2);
    }
  };

  const handleTicketCount = (action) => {
    if (action === "plus" && ticketCount < maxTickets) {
      setTicketCount(ticketCount + 1);
    } else if (action === "minus" && ticketCount > 1) {
      setTicketCount(ticketCount - 1);
    }
  };

  const calculateTotal = () => {
    if (ticketType === "solo") {
      return ticketCount * 100;
    } else if (ticketType === "couple") {
      return ticketCount * 200;
    } else if (ticketType === "Famille") {
      return ticketCount * 300;
    }
    return 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (ticketType === "couple" && ticketCount > 3) {
      alert("Le nombre maximum de tickets pour le type Couple est de 3.");
    } else if (ticketType === "Famille" && ticketCount > 2) {
      alert("Le nombre maximum de tickets pour le type Famille est de 2.");
    } else {
      const formData = {
        ticketType: ticketType,
        ticketCount: ticketCount,
      };

      fetch("http://localhost:8000/Achat.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      })
        .then((response) => {
          if (response.ok) {
            navigate("/MethodPaiment");
          } else {
            throw new Error("Error sending data to the server.");
          }
        })
        .catch((error) => {
          console.error(error);
          alert("An error occurred. Please try again later.");
        });
    }
  };
  const buttonStyle = {
    borderRadius: 40,
    backgroundColor: "#BF1A33",
    borderColor: "#BF1A33",
    boxShadow: "inset 0 0 5px rgba(0, 0, 0, 0.5)",
    marginLeft: "0px",
  };
  const hoverButtonStyle = {
    backgroundColor: "#FF3366",
    borderColor: "#FF3366",
    borderRadius: "40px",
  };

  const getButtonStyle = (type) => {
    if (ticketType === type) {
      return hoverButtonStyle;
    } else {
      return buttonStyle;
    }
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
      <Container className="mt-5">
        <div
          className="text-center"
          style={{ marginTop: "120px", fontWeight: "bold" }}
        >
          <p className="custom-color">
            Félicitations! Vous êtes sur le point de vivre une expérience de
            voyage exceptionnelle en classe affaires.
          </p>
          <ButtonGroup style={{ marginTop: "20px" }}>
            <Button
              variant={ticketType === "solo" ? "primary" : "light"}
              onClick={() => handleTicketType("solo")}
              style={{
                backgroundColor: ticketType === "solo" ? "#BF1A33" : "white",
                borderColor: ticketType === "solo" ? "#BF1A33" : "black",
                borderRadius: "0px",
              }}
            >
              Solo
            </Button>
            <Button
              variant={ticketType === "couple" ? "primary" : "light"}
              onClick={() => handleTicketType("couple")}
              style={{
                backgroundColor: ticketType === "couple" ? "#BF1A33" : "white",
                borderColor: ticketType === "couple" ? "#BF1A33" : "black",
                borderRadius: "0px",
              }}
            >
              Couple
            </Button>
            <Button
              variant={ticketType === "Famille" ? "primary" : "light"} // Corrected variant
              onClick={() => handleTicketType("Famille")}
              style={{
                backgroundColor: ticketType === "Famille" ? "#BF1A33" : "white",
                borderColor: ticketType === "Famille" ? "#BF1A33" : "black",
                borderRadius: "0px",
              }}
            >
              Famille
            </Button>
          </ButtonGroup>
        </div>
        <div className="mt-4"></div>
        {ticketType === "solo" && (
          <form onSubmit={handleSubmit}>
            <div style={{ marginTop: "60px", marginLeft: "60px" }}>
              <p
                style={{
                  fontWeight: "bold",
                  fontSize: "20px",
                  marginTop: "50px",
                }}
              >
                Prix entrée: 100 DH
              </p>
              <div className="qty">
                <span
                  className="minus"
                  onClick={() => handleTicketCount("minus")}
                  style={{
                    backgroundColor: "#BF1A33",
                    borderRadius: "50%",
                    cursor: "pointer",
                    display: "inline-block",
                    verticalAlign: "top",
                    color: "white",
                    width: "30px",
                    height: "30px",
                    font: "30px/1 Arial, sans-serif",
                    textAlign: "center",
                    backgroundClip: "padding-box",
                    marginTop: "20px",
                  }}
                >
                  -
                </span>
                <input
                  type="number"
                  min="1"
                  max={ticketType === "solo" ? "6" : "3"}
                  value={ticketCount}
                  onChange={(e) => setTicketCount(parseInt(e.target.value))}
                  style={{
                    textAlign: "center",
                    width: "50px",
                    fontSize: "25px",
                    fontWeight: "700",
                    lineHeight: "30px",
                    padding: "0 2px",
                    minWidth: "35px",
                    border: "0",
                    marginTop: "20px",
                  }}
                />
                <span
                  className="plus"
                  onClick={() => handleTicketCount("plus")}
                  style={{
                    backgroundColor: "#BF1A33",
                    borderRadius: "50%",
                    cursor: "pointer",
                    display: "inline-block",
                    verticalAlign: "top",
                    color: "white",
                    width: "30px",
                    height: "30px",
                    font: "30px/1 Arial, sans-serif",
                    textAlign: "center",
                    backgroundClip: "padding-box",
                    marginTop: "20px",
                  }}
                >
                  +
                </span>
              </div>
              <p
                style={{
                  fontWeight: "bold",
                  fontSize: "20px",
                  marginTop: "30px",
                }}
              >
                Max: <span>{maxTickets}</span>
              </p>
              <p
                style={{
                  fontWeight: "bold",
                  fontSize: "20px",
                  marginTop: "30px",
                }}
              >
                Total: {calculateTotal()} DH
              </p>
              <div style={{ marginTop: "50px" }}>
                <Button type="submit" style={buttonStyle} className="w-75">
                  Acheter
                </Button>
              </div>
            </div>
          </form>
        )}
        {ticketType === "couple" && (
          <form onSubmit={handleSubmit}>
            <div style={{ marginTop: "60px", marginLeft: "60px" }}>
              <p
                style={{
                  fontWeight: "bold",
                  fontSize: "20px",
                  marginTop: "50px",
                }}
              >
                Prix entrée: 200 DH
              </p>
              <div className="qty">
                <span
                  className="minus"
                  onClick={() => handleTicketCount("minus")}
                  style={{
                    backgroundColor: "#BF1A33",
                    borderRadius: "50%",
                    cursor: "pointer",
                    display: "inline-block",
                    verticalAlign: "top",
                    color: "white",
                    width: "30px",
                    height: "30px",
                    font: "30px/1 Arial, sans-serif",
                    textAlign: "center",
                    backgroundClip: "padding-box",
                    marginTop: "20px",
                  }}
                >
                  -
                </span>
                <input
                  type="number"
                  min="1"
                  max={ticketType === "solo" ? "6" : "3"}
                  value={ticketCount}
                  onChange={(e) => setTicketCount(parseInt(e.target.value))}
                  style={{
                    textAlign: "center",
                    width: "50px",
                    fontSize: "25px",
                    fontWeight: "700",
                    lineHeight: "30px",
                    padding: "0 2px",
                    minWidth: "35px",
                    border: "0",
                    marginTop: "20px",
                  }}
                />
                <span
                  className="plus"
                  onClick={() => handleTicketCount("plus")}
                  style={{
                    backgroundColor: "#BF1A33",
                    borderRadius: "50%",
                    cursor: "pointer",
                    display: "inline-block",
                    verticalAlign: "top",
                    color: "white",
                    width: "30px",
                    height: "30px",
                    font: "30px/1 Arial, sans-serif",
                    textAlign: "center",
                    backgroundClip: "padding-box",
                    marginTop: "20px",
                  }}
                >
                  +
                </span>
              </div>
              <p
                style={{
                  fontWeight: "bold",
                  fontSize: "20px",
                  marginTop: "30px",
                }}
              >
                Max: <span>{maxTickets}</span>
              </p>
              <p
                style={{
                  fontWeight: "bold",
                  fontSize: "20px",
                  marginTop: "30px",
                }}
              >
                Total: {calculateTotal()} DH
              </p>
              <div style={{ marginTop: "50px" }}>
                <Button type="submit" style={buttonStyle} className="w-75">
                  Acheter
                </Button>
              </div>
            </div>
          </form>
        )}
        {ticketType === "Famille" && (
          <form onSubmit={handleSubmit}>
            <div style={{ marginTop: "60px", marginLeft: "60px" }}>
              <p
                style={{
                  fontWeight: "bold",
                  fontSize: "20px",
                  marginTop: "50px",
                }}
              >
                Prix entrée: 300 DH
              </p>
              <div className="qty">
                <span
                  className="minus"
                  onClick={() => handleTicketCount("minus")}
                  style={{
                    backgroundColor: "#BF1A33",
                    borderRadius: "50%",
                    cursor: "pointer",
                    display: "inline-block",
                    verticalAlign: "top",
                    color: "white",
                    width: "30px",
                    height: "30px",
                    font: "30px/1 Arial, sans-serif",
                    textAlign: "center",
                    backgroundClip: "padding-box",
                    marginTop: "20px",
                  }}
                >
                  -
                </span>
                <input
                  type="number"
                  min="1"
                  max={ticketType === "solo" ? "3" : "2"}
                  value={ticketCount}
                  onChange={(e) => setTicketCount(parseInt(e.target.value))}
                  style={{
                    textAlign: "center",
                    width: "50px",
                    fontSize: "25px",
                    fontWeight: "700",
                    lineHeight: "30px",
                    padding: "0 2px",
                    minWidth: "35px",
                    border: "0",
                    marginTop: "20px",
                  }}
                />
                <span
                  className="plus"
                  onClick={() => handleTicketCount("plus")}
                  style={{
                    backgroundColor: "#BF1A33",
                    borderRadius: "50%",
                    cursor: "pointer",
                    display: "inline-block",
                    verticalAlign: "top",
                    color: "white",
                    width: "30px",
                    height: "30px",
                    font: "30px/1 Arial, sans-serif",
                    textAlign: "center",
                    backgroundClip: "padding-box",
                    marginTop: "20px",
                  }}
                >
                  +
                </span>
              </div>
              <p
                style={{
                  fontWeight: "bold",
                  fontSize: "20px",
                  marginTop: "30px",
                }}
              >
                Max: <span>{maxTickets}</span>
              </p>
              <p
                style={{
                  fontWeight: "bold",
                  fontSize: "20px",
                  marginTop: "30px",
                }}
              >
                Total: {calculateTotal()} DH
              </p>
              <div style={{ marginTop: "50px" }}>
                <Button
                  type="submit"
                  style={buttonStyle}
                  className="w-75"
                  onClick={handleSubmit}
                >
                  Acheter
                </Button>
              </div>
            </div>
          </form>
        )}

        <div style={{ marginTop: "50px" }}>
          <img
            src={image}
            alt="Image"
            style={{ width: "110%", marginLeft: "-15px" }}
          />
        </div>
      </Container>
    </div>
  );
};

export default AchatBilletPage;
