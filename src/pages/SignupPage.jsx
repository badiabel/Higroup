import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import logo1 from "../assets/logo1.png";
import { useNavigate } from "react-router-dom";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import axios from "axios";
import { post } from "jquery";

const SignupPage = () => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState();
  const [auth, setAuth] = useState("");
  const [data, setData] = useState({
    nom: "",
    prenom: "",
    noSF: "",
    email: "",
  });
  // useEffect(() => {
  //   var auth = localStorage.getItem('email');
  //   setAuth(auth);
  // }, []);
  // if (auth !== null) {
  //   navigate(`/home`);
  // }
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    console.log(data);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      data.nom === "" ||
      data.prenom === "" ||
      data.email === "" ||
      phoneNumber === ""
    ) {
      alert("Veuillez remplir tous les champs");
    } else {
      localStorage.setItem("email", data.email);
      localStorage.setItem("nom", data.nom);
      localStorage.setItem("prenom", data.prenom);
      localStorage.setItem("tel", phoneNumber);
      localStorage.setItem("noSF", data.noSF);
      navigate("/signup2");
    }
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
          marginTop: "200px",
        }}
      >
        <div style={{ width: "80%" }}>
          <div style={{ textAlign: "center" }}>
            <h2
              style={{
                fontFamily: "Roboto, sans-serif",
                fontSize: "20px",
                color: "#BF1A33",
                fontWeight: "bold",
                marginBottom: "70px",
              }}
            >
              Rejoignez Upgrademe et tentez votre chance de voyager en classe
              affaires !
            </h2>
          </div>
          <Form onSubmit={handleSubmit}>
            <div style={formGroupStyle}>
              <div style={{ marginBottom: "50px" }}>
                <label htmlFor="firstNameInput" style={labelStyle}>
                  Prénom*
                </label>
                <br />
                <input
                  type="text"
                  id="firstNameInput"
                  name="prenom"
                  onChange={handleChange}
                  value={data.prenom}
                  style={inputStyle}
                  placeholder="Prénom"
                />
              </div>
            </div>
            <div style={formGroupStyle}>
              <div style={{ marginBottom: "50px" }}>
                <label htmlFor="lastNameInput" style={labelStyle}>
                  Nom*
                </label>
                <br />
                <input
                  type="text"
                  id="lastNameInput"
                  name="nom"
                  onChange={handleChange}
                  value={data.nom}
                  style={inputStyle}
                  placeholder="Nom"
                />
              </div>
            </div>
            <div style={formGroupStyle}>
              <div style={{ marginBottom: "50px" }}>
                <label htmlFor="emailInput" style={labelStyle}>
                  Email*
                </label>
                <br />
                <input
                  type="email"
                  id="emailInput"
                  name="email"
                  onChange={handleChange}
                  value={data.email}
                  style={inputStyle}
                  placeholder="Email"
                />
              </div>
            </div>
            <div style={formGroupStyle}>
              <label htmlFor="phoneNumberInput" style={labelStyle}>
                Numéro de téléphone*
              </label>
              <br />
              <PhoneInput
                id="phoneNumberInput"
                international
                countryCallingCodeEditable={false}
                defaultCountry="RU"
                value={phoneNumber}
                onChange={setPhoneNumber}
              />
            </div>
            <div style={formGroupStyle}>
              <div style={{ marginBottom: "50px" }}>
                <label htmlFor="emailInput" style={labelStyle}>
                  N° Safar Flyer
                </label>
                <br />
                <input
                  type="Number"
                  id="emailInput"
                  name="noSF"
                  onChange={handleChange}
                  value={data.noSF}
                  style={inputStyle}
                  placeholder="No_ _ _"
                />
              </div>
            </div>
            <div className="text-center">
              <Button
                variant="primary"
                type="submit"
                className="w-100 mt-3"
                style={buttonStyle}
              >
                Continuer
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

export default SignupPage;
