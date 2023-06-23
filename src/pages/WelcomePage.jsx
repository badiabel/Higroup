import { useEffect, useState } from "react";
import logo1 from "../assets/logo1.png";
import image from "../assets/image2.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const WelcomePage = () => {
  const [isReferenceReservation, setIsReferenceReservation] = useState(true);
  const [auth, setAuth] = useState("");
  const [reservationInput, setReservationInput] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [id_user, setIdUser] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    var auth = localStorage.getItem("email");
    setAuth(auth);
    var id_user = localStorage.getItem("id_user");
    setIdUser(id_user);
  }, []);

  if (auth == null) {
    navigate(`/`);
  }

  const handleButtonClick = () => {
    setIsReferenceReservation(!isReferenceReservation);
  };

  const handleReservationInputChange = (e) => {
    const input = e.target.value;
    const sanitizedInput = input.replace(/[^0-9]/g, "");
    setReservationInput(sanitizedInput);
  };

  const handleNameInputChange = (e) => {
    const input = e.target.value;
    const sanitizedInput = input.replace(/[^A-Za-z\s]/g, "");
    setNameInput(sanitizedInput);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (!nameInput.trim()) {
      setError("Please enter your last name.");
      return;
    }

    if (isReferenceReservation && !reservationInput.trim()) {
      setError("Please enter the Référence de réservation.");
      return;
    }

    if (!isReferenceReservation && !reservationInput.trim()) {
      setError("Please enter the Numéro de billet.");
      return;
    }

    setError("");

    // Make the API call to the PHP backend
    const postData = {
      nameInput,
      reservationInput,
      id_user,
      numeroBilletInput: isReferenceReservation ? "" : reservationInput,
    };

    axios.post("http://localhost:8000/welcome.php", postData)
    .then((res) => {
      if (res.data.status === "success") {
        // Store the id_par received from PHP locally
        const idPar = res.data.id_par;
        window.localStorage.setItem("id_par", idPar);
  
        // Navigate to the next page
        navigate("/TiragePage");
      } else {
        // Handle other status or error scenarios
        alert(res.data.message);
      }
    })
    .catch((error) => {
      console.error(error);
      // Handle errors
    });
  }; 

  const buttonStyle = {
    borderRadius: 40,
    backgroundColor: "#BF1A33",
    borderColor: "#BF1A33",
    color: "white",
    padding: "10px 40px",
    fontSize: "16px",
    fontWeight: "bold",
    marginLeft: "-10px", // Adjust the margin to move the button to the left
  };

  const inputStyle = {
    border: "none",
    borderBottom: "2px solid black",
    padding: "0",
    margin: "0",
    lineHeight: "3",
  };

  return (
    <div>
      {/* Header */}
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

      {/* Image */}
      <div style={{ marginTop: "70px" }}>
        <img
          src={image}
          alt="image"
          className="image"
          style={{ width: "100%", maxWidth: "1500px" }}
        />
      </div>

      {/* Welcome Message */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          height: "70vh",
          marginTop: "20px",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <h2
            style={{
              fontFamily: "Roboto",
              color: "#BF1A33",
              fontSize: "23px",
              margin: 0,
              fontWeight: "bold",
            }}
          >
            Devenez le voyageur Privillégié et voyagez en classe d'affaires!
          </h2>
          <p
            className="text-right"
            style={{
              fontSize: "13px",
              marginTop: "30px",
              color: "black",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            Veuillez entrer votre{" "}
            {isReferenceReservation
              ? "Référence de réservation"
              : "Numéro de billet"}{" "}
            et votre nom pour participer.
          </p>

          {/* Button */}
          <div style={{ marginTop: "20px", marginLeft: "-10px" }}>
            <button onClick={handleButtonClick} style={buttonStyle}>
              {isReferenceReservation
                ? "Numéro de billet"
                : "Référence de réservation"}
            </button>
          </div>

          {/* Form */}
          <form style={{ marginTop: "40px" }} onSubmit={handleFormSubmit}>
            <div style={{ marginBottom: "20px" }}>
              <input
                type="text"
                id="reservationInput"
                style={{ ...inputStyle, width: "50%" }}
                placeholder={
                  isReferenceReservation
                    ? "Référence de réservation"
                    : "Numéro de billet"
                }
                value={reservationInput}
                onChange={handleReservationInputChange}
              />
            </div>
            <div style={{ marginBottom: "50px" }}>
              <input
                type="text"
                id="nameInput"
                style={{ ...inputStyle, width: "50%" }}
                placeholder="Nom de famille"
                value={nameInput}
                onChange={handleNameInputChange}
              />
            </div>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <button
              type="submit"
              style={{
                ...buttonStyle,
                boxShadow: "inset 0 0 5px rgba(0, 0, 0, 0.5)",
                marginLeft: "-10px",
              }}
            >
              Continuer
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
