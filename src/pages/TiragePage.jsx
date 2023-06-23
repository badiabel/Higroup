import React, { useState, useEffect } from "react";
import moment from "moment";
import { Container, Button } from "react-bootstrap";
import logo1 from "../assets/logo1.png";
import image from "../assets/image3.png";

const TiragePage = () => {
  const [countdown, setCountdown] = useState("");
  const [isCountdownFinished, setIsCountdownFinished] = useState(false);
  const [isSecondCountdownStarted, setIsSecondCountdownStarted] =
    useState(false);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const id_par = localStorage.getItem("id_par");

  const initialFirstCountdownTime = moment().set({
    hour: 6,
    minute: 28,
    second: 0,
  });

  const initialSecondCountdownTime = moment(initialFirstCountdownTime).add(
    2,
    "hours"
  );

  const startCountdown = (endTime, isSecondCountdown) => {
    const interval = setInterval(() => {
      const currentTime = new Date().getTime();
      const remainingTime = endTime - currentTime;

      if (remainingTime <= 0) {
        clearInterval(interval);
        if (isSecondCountdown) {
          setIsSecondCountdownStarted(false);
          setIsCountdownFinished(true);
          setIsButtonEnabled(false);
          const nextDayEndTime = moment(initialFirstCountdownTime)
            .add(1, "day")
            .valueOf();
          startCountdown(nextDayEndTime, false);
          console.log("counter started");
        } else {
          setIsCountdownFinished(false);
          setIsSecondCountdownStarted(true);
          setIsButtonEnabled(true);
          startCountdown(initialSecondCountdownTime.valueOf(), true);
        }
      } else {
        const duration = moment.duration(remainingTime);
        const hours = duration.hours().toString().padStart(2, "0");
        const minutes = duration.minutes().toString().padStart(2, "0");
        const seconds = duration.seconds().toString().padStart(2, "0");
        const countdownText = `${hours}:${minutes}:${seconds}`;
        setCountdown(countdownText);
      }
    }, 1000);
  };

  useEffect(() => {
    const currentTime = moment();
    if (
      currentTime.isAfter(initialFirstCountdownTime) &&
      currentTime.isBefore(initialSecondCountdownTime)
    ) {
      startCountdown(initialSecondCountdownTime, true);
      setIsSecondCountdownStarted(true);
      setIsButtonEnabled(true);
    } else {
      startCountdown(initialFirstCountdownTime, false);
      setIsButtonEnabled(false);
    }
  }, []);

  const handleButtonClick = () => {
    // Get the current date
    const currentDate = moment().format("YYYY-MM-DD");

    // Get the time from initialFirstCountdownTime
    const initialTime = moment(initialFirstCountdownTime).format("HH:mm:ss");

    // Calculate the end time by adding 2 hours to the initial time
    const endTime = moment(initialFirstCountdownTime)
      .add(2, "hours")
      .format("HH:mm:ss");

    // Concatenate the date and time for DateD and DateF
    const dateD = `${currentDate} ${initialTime}`;
    const dateF = `${currentDate} ${endTime}`;

    // Insert data into the database using PHP
    const postData = {
      id_par: id_par, // Pass the id_par retrieved from storage
      dateD: dateD, // Set the current date and initial time as DateD
      dateF: dateF, // Set the current date and calculated end time as DateF
    };

    fetch("http://localhost:8000/tirage.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
      credentials: "include",
    })
      .then((response) => {
        if (response.ok) {
          console.log("Data inserted successfully.");

          // Retrieve the response JSON
          return response.json();
        } else {
          // Database insertion failed
          console.error("Failed to insert data into the database.");
        }
      })
      .then((data) => {
        // Store the RefT variable in localStorage
        localStorage.setItem("RefT", data.RefT);

        // Navigate to the next page
        window.location.href = "/AchatBilletPage";
      })
      .catch((error) => {
        console.error(error);
        // Handle errors
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
          flexDirection: "column",
          marginTop: "70px",
        }}
      >
        <img
          src={image}
          alt="image"
          className="image"
          style={{ width: "100%", maxWidth: "1500px" }}
        />

        <Container className="mt-5">
          {!isCountdownFinished ? (
            <div>
              {!isSecondCountdownStarted ? (
                <div>
                  <h1 className="text-center">
                    Le tirage au sort est fermé. Veuillez réessayer plus tard.
                  </h1>
                  <div className="text-center mt-5">
                    <h3
                      style={{
                        color: "#BF1A33",
                        fontSize: "70px",
                        textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                      }}
                    >
                      {countdown}
                    </h3>
                  </div>
                  <div className="text-center mt-3">
                    <Button
                      variant="primary"
                      style={{
                        backgroundColor: "#BF1A33",
                        borderRadius: "40px",
                        fontWeight: "bold",
                        width: "250px",
                        height: "40px",
                        marginTop: "200px",
                      }}
                      disabled={!isButtonEnabled}
                      onClick={handleButtonClick}
                    >
                      Participer
                    </Button>
                  </div>
                </div>
              ) : (
                <div>
                  <h1 className="text-center">
                    Bienvenue au tirage au sort. Vas-y participer maintenant !
                  </h1>
                  <div className="text-center mt-5">
                    <h3
                      style={{
                        color: "#BF1A33",
                        fontSize: "70px",
                        textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                      }}
                    >
                      {countdown}
                    </h3>
                  </div>
                  <div className="text-center mt-3">
                    <Button
                      variant="primary"
                      style={{
                        backgroundColor: "#BF1A33",
                        borderRadius: "40px",
                        fontWeight: "bold",
                        width: "250px",
                        height: "40px",
                        marginTop: "200px",
                      }}
                      disabled={!isButtonEnabled}
                      onClick={handleButtonClick}
                    >
                      Participer
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div>
              <h1 className="text-center">
                Le tirage est terminé. Essayez demain !
              </h1>
            </div>
          )}
        </Container>
      </div>
    </div>
  );
};

export default TiragePage;
