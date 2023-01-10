import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AccountForm from "../components/AccountForm";

const Register = ({ setSessionBrukernavn }) => {
  const [brukernavn, setBrukernavn] = useState("");
  const [passord, setPassord] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [brukernavnErrorMessage, setBrukernavnErrorMessage] = useState("");
  const [passordErrorMessage, setPassordErrorMessage] = useState("");
  const [buttonStatus, setButtonStatus] = useState("Registrer");
  const [brukernavnInputState, setBrukernavnInputState] =
    useState("border-secondary");
  const [passordInputState, setPassordInputState] =
    useState("border-secondary");

  const onFocusBrukerInput = () => {
    setBrukernavnInputState("border-primary");
  };

  const onBlurBrukerInput = () => {
    setBrukernavnInputState("border-secondary");
  };

  const onFocusPassordInput = () => {
    setPassordInputState("border-primary");
  };

  const onBlurPassordInput = () => {
    setPassordInputState("border-secondary");
  };

  const navigate = useNavigate();

  const onChangeBrukernavn = (event) => {
    const inputValue = event.target.value;
    setBrukernavn(inputValue);

    const regexp = /^[a-zA-ZæøåÆØÅ\.\ \-]{2,20}$/;

    if (!regexp.test(inputValue)) {
      setBrukernavnErrorMessage("Brukernavnet må bestå av 2 til 20 bokstaver");
    } else {
      setBrukernavnErrorMessage("");
    }
  };

  const onChangePassord = (event) => {
    const inputValue = event.target.value;
    setPassord(event.target.value);

    const regexp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

    if (!regexp.test(inputValue)) {
      setPassordErrorMessage(
        "Passordet må bestå minimum 6 tegn, minst en bokstav og et tall"
      );
    } else {
      setPassordErrorMessage("");
    }
  };

  const createAccount = async (event) => {
    const user = { brukernavn: brukernavn, passord: passord };

    if (brukernavn !== "" && passord !== "") {
      axios
        .post("/lagbruker", user)
        .then(() => {
          setButtonStatus(
            <div
              className="spinner-border spinner-border-sm text-light"
              role="status"
            >
              <span className="visually-hidden"></span>
            </div>
          );

          axios
            .get("/getsessiondata")
            .then((res) => {
              setSessionBrukernavn(res.data);
            })
            .catch((error) => {
              if (error.status.response === 401) {
                setSessionBrukernavn("");
                navigate("/login");
              }
            });

          setTimeout(() => {
            navigate("/");
          }, 1000);
        })
        .catch((error) => {
          setErrorMessage(error.response.data);
        });
    }

    if (brukernavn === "") {
      setBrukernavnErrorMessage("Brukernavn må fylles ut");
      setBrukernavnInputState("border-danger");
    }
    if (passord === "") {
      setPassordErrorMessage("Passord må fylles ut");
      setPassordInputState("border-danger");
    }

    event.preventDefault();
  };

  return (
    <>
      <AccountForm
        formTitle="Registrer"
        onSubmit={createAccount}
        brukernavn={brukernavn}
        passord={passord}
        brukernavnErrorMessage={brukernavnErrorMessage}
        passordErrorMessage={passordErrorMessage}
        onChangeBrukernavn={onChangeBrukernavn}
        onChangePassord={onChangePassord}
        path="login"
        text="Har du allerede konto? Klikk her"
        errorMessage={errorMessage}
        buttonStatus={buttonStatus}
        onFocusBrukerInput={onFocusBrukerInput}
        onBlurBrukerInput={onBlurBrukerInput}
        onFocusPassordInput={onFocusPassordInput}
        onBlurPassordInput={onBlurPassordInput}
        brukernavnInputState={brukernavnInputState}
        passordInputState={passordInputState}
      />
    </>
  );
};

export default Register;
