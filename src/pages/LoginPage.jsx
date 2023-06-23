import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import image from "../assets/image1.png";
import logo from "../assets/logo1.png";
import $ from "jquery";
import axios from "axios";

const LoginPage = () => {
  const history = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [data, setData] = useState({
    email: "",
    psw: "",
  });

  const [auth, setAuth] = useState("");
  let navigate = useNavigate(); // Use for Navigate on Previous
  // useEffect(() => {
  //   var auth = localStorage.getItem('email');
  //   setAuth(auth);
  // }, []);
  // if (auth !== null) {
  //   navigate(`/home`);
  // }

  const buttonStyle = {
    width: "100%",
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
  };
  const labelStyle = {
    color: "#BF1A33",
    fontWeight: "bold",
    marginBottom: "8px",
    marginTop: "0px",
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    console.log(data);
  };

  const handleSumbit = (e) => {
    e.preventDefault();
    const postData = {
      email: data.email,
      psw: data.psw,
    };
    axios.post("http://localhost:8000/login.php", postData).then((res) => {
      console.log(res.data.status);
      if (res.data.status == "valid") {
        setIsLogin(false);
        window.localStorage.setItem("isLogin", isLogin);
        window.localStorage.setItem("email", res.data.email);
        window.localStorage.setItem("prenom", res.data.prenom);
        window.localStorage.setItem("nom", res.data.nom);
        window.localStorage.setItem("tel", res.data.tel);
        window.localStorage.setItem("numSF", res.data.numSF);
        window.localStorage.setItem("dateInsc", res.data.dateInsc);

        window.localStorage.setItem("id_user", res.data.id_user);

        history(`/WelcomePage`);
      } else {
        alert("Invalid User");
      }
    });
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
          display: "flex",
          alignItems: "center",
        }}
      >
        <img
          src={logo}
          alt="Logo"
          style={{
            height: "100%",
            padding: "10px",
            maxWidth: "50%",
            marginLeft: "10px",
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "50vh",
          paddingTop: "70px", // Adjust this value for spacing
        }}
      >
        <div className="d-flex flex-column justify-content-center align-items-center bg-color">
          <div className="text-center" style={{ marginBottom: "70px" }}>
            <img
              src={image}
              alt="image"
              className="image"
              style={{ width: "100%", maxWidth: "1500px" }}
            />
          </div>

          <div className="form-container">
            <Form className="mt-5" onSubmit={(event) => handleSumbit(event)}>
              <div style={{ marginBottom: "50px" }}>
                <label htmlFor="nameInput" style={labelStyle}>
                  Email
                </label>
                <br />
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  value={data.email}
                  id="nameInput"
                  style={{ ...inputStyle, width: "100%" }}
                  placeholder="email"
                />
              </div>
              <div style={{ marginBottom: "50px" }}>
                <label htmlFor="nameInput" style={labelStyle}>
                  Mot de Passe
                </label>
                <br />
                <input
                  type="password"
                  id="nameInput"
                  name="psw"
                  onChange={handleChange}
                  value={data.psw}
                  style={{ ...inputStyle, width: "100%" }} // Update the width to 100%
                  placeholder="mot de passe"
                />
              </div>
              <div style={{ marginTop: "70px", marginBottom: "10px" }}>
                {/* Add margin top and bottom to adjust spacing */}
                <Button
                  variant="primary"
                  type="submit"
                  className="w-100 custom-border-radius"
                  style={buttonStyle}
                >
                  Connexion
                </Button>
              </div>
              <Form.Text className="text-muted text-center mt-3">
                <div className="text-center">
                  Vous n'avez pas de compte?{" "}
                  <Link to="/signup">Inscrivez-vous</Link>
                </div>
              </Form.Text>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
