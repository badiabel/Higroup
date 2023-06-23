import { useState } from "react";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import logo1 from "../assets/logo1.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignupPage2 = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return; // Stop form submission if passwords don't match
    } else {
      setPasswordError("");
    }

    // Check if all inputs are filled
    if (!password || !confirmPassword) {
      alert("Please fill all the inputs");
      return;
    }

    const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;
    localStorage.setItem("otp", random(100000, 999999));

    const postData = {
      nom: localStorage.getItem("nom"),
      prenom: localStorage.getItem("prenom"),
      email: localStorage.getItem("email"),
      tel: localStorage.getItem("tel"),
      noSF: localStorage.getItem("noSF"),
      psw: password,
      otp: localStorage.getItem("otp"),
    };

    axios.post("http://localhost:8000/signup.php", postData).then((res) => {
      console.log(res);

      if (res.data.status === true) {
        console.log(res);
      } else {
        alert("Invalid Data");
      }
    });

    navigate("/Confirmationemail");
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleChangeConfirmPassword = (event) => {
    setConfirmPassword(event.target.value);
  };

  const inputStyle = {
    border: "none",
    borderBottom: "2px solid black",
    padding: "0",
    margin: "0",
    lineHeight: "3",
    width: "100%",
  };

  const labelStyle = {
    color: "#BF1A33",
    fontWeight: "bold",
    marginBottom: "8px",
    marginTop: "0px",
  };

  const formGroupStyle = {
    marginBottom: "40px",
  };

  const buttonStyle = {
    borderRadius: 40,
    backgroundColor: "#BF1A33",
    borderColor: "#BF1A33",
    boxShadow: "inset 0 0 5px rgba(0, 0, 0, 0.5)",
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
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          marginTop: "140px",
        }}
      >
        <div style={{ width: "80%" }}>
          <Form onSubmit={handleSubmit}>
            <div style={formGroupStyle}>
              <div style={{ marginBottom: "50px" }}>
                <label htmlFor="nameInput" style={labelStyle}>
                  Mot de Passe
                </label>
                <br />
                <input
                  type="password"
                  id="nameInput"
                  value={password}
                  onChange={handleChangePassword}
                  style={{ ...inputStyle, width: "100%" }} // Update the width to 100%
                  placeholder="Entrer mot de Passe"
                />
              </div>
            </div>

            <div style={formGroupStyle}>
              <div style={{ marginBottom: "50px" }}>
                <label htmlFor="nameInput" style={labelStyle}>
                  Confirmer Mot de Passe
                </label>
                <br />
                <input
                  type="password"
                  id="nameInput"
                  value={confirmPassword}
                  onChange={handleChangeConfirmPassword}
                  style={{ ...inputStyle, width: "100%" }} // Update the width to 100%
                  placeholder="Confirmation"
                />
                {passwordError && (
                  <Form.Text className="text-danger">{passwordError}</Form.Text>
                )}
              </div>
            </div>
            <div className="text-center">
              <Button
                variant="primary"
                type="submit"
                className="w-100 mt-3"
                style={buttonStyle}
              >
                Connexion
              </Button>
            </div>

            <Form.Text className="text-muted text-center mt-1">
              <div className="text-center">
                Déjà inscrit ? Connectez-vous <Link to="/">ici</Link>
              </div>
            </Form.Text>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage2;
