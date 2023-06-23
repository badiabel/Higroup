import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import logo1 from "../assets/logo1.png";
import { Link, useNavigate } from "react-router-dom";
import OtpInput from "react-otp-input";
import axios from "axios";

const Confirmationemail = () => {
  const history = useNavigate();
  const [otp, setOtp] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    const postData = {
      otp: otp,
    };
    if (postData.otp == localStorage.getItem("otp")) {
      axios
        .post("http://localhost:8000/confirmMail.php", postData)
        .then((res) => {
          console.log(res.data.status);
          if (res.data.status === "verified") {
            history(`/WelcomePage`);
          } else {
            alert("Invalid OTP");
          }
        });
    }
  };
  const resendCode = (event) => {
    event.preventDefault();

    const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;
    localStorage.setItem("otp", random(100000, 999999));
    const postData = {
      nom: localStorage.getItem("nom"),
      email: localStorage.getItem("email"),
      otp: localStorage.getItem("otp"),
    };
    axios.post("http://localhost:8000/resendCode.php", postData).then((res) => {
      console.log(res.data.status);
    });
  };
  const labelStyle = {
    fontWeight: "bold",
    marginBottom: "8px",
  };

  const otpContainerStyle = {
    margin: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  const otpStyle = {
    width: "2rem",
    textAlign: "center",
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
        <div style={{ width: "50%" }}>
          <div style={{ textAlign: "left" }}>
            <h2
              style={{
                fontFamily: "Roboto", // Change fontFamily to "Roboto"
                color: "black",
                fontWeight: "bold",
                marginBottom: "10px",
              }}
            >
              Vérification de votre Email
            </h2>
            <p style={{ color: "black" }}>
              Un code de verification vous a été envoyé a votre email.
            </p>
          </div>
          <Form onSubmit={handleSubmit}>
            <div style={otpContainerStyle}>
              <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                renderSeparator={<span style={{ color: "white" }}>-</span>}
                renderInput={(props) => <input {...props} style={otpStyle} />}
              />
            </div>
            <div style={{ textAlign: "center", marginTop: "50px" }}>
              <Button type="submit" style={buttonStyle} className="w-100">
                Confirmer
              </Button>
            </div>
            <Form.Text className="text-muted text-center mt-1">
              <div
                className="text-center"
                style={{ textAlign: "center", marginTop: "20px" }}
              >
                Vous n'avez pas recu le code?{" "}
                <a href="/" onClick={resendCode}>
                  Renvoyez
                </a>
              </div>
            </Form.Text>
          </Form>
          <div style={{ textAlign: "center", marginTop: "20px" }}></div>
        </div>
      </div>
    </div>
  );
};

export default Confirmationemail;
