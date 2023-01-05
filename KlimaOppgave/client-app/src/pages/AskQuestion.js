import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "../components/Form";

const AskQuestion = ({ user }) => {
  const [tittel, setTittel] = useState("");
  const [innhold, setInnhold] = useState("");
  const [buttonStatus, setButtonStatus] = useState("Send inn");
  const [tittelInputState, setTittelInputState] = useState("border-secondary");
  const [innholdInputState, setInnholdInputState] =
    useState("border-secondary");
  const [tittelErrorMessageStatus, setTittelErrorMessageStatus] =
    useState("none");
  const [innholdErrorMessageStatus, setInnholdErrorMessageStatus] =
    useState("none");

  const onFocusTittel = () => {
    setTittelInputState("border-primary");
    setTittelErrorMessageStatus("none");
  };

  const onBlurTittel = () => {
    setTittelInputState("border-secondary");
    setTittelErrorMessageStatus("none");
  };

  const onFocusInnhold = () => {
    setInnholdInputState("border-primary");
    setInnholdErrorMessageStatus("none");
  };

  const onBlurInnhold = () => {
    setInnholdInputState("border-secondary");
    setInnholdErrorMessageStatus("none");
  };

  const onChangeTittel = (event) => {
    setTittelInputState("border-primary");
    setTittelErrorMessageStatus("none");

    const inputValue = event.target.value;

    setTittel(inputValue);
  };

  const onChangeInnhold = (event) => {
    setInnholdInputState("border-primary");
    setInnholdErrorMessageStatus("none");

    const inputValue = event.target.value;

    setInnhold(inputValue);
  };

  const navigate = useNavigate();

  const onSubmit = (event) => {
    const tittelWithoutSpace = tittel.trim();

    const innholdWithoutSpace = innhold.trim();

    if (tittelWithoutSpace.length !== 0 && innholdWithoutSpace.length !== 0) {
      const sporsmal = {
        tittel: tittelWithoutSpace,
        innhold: innholdWithoutSpace,
        brukerId: user.brukerId,
      };

      axios.post("/legginnlegg", sporsmal);

      setButtonStatus(
        <div
          className="spinner-border spinner-border-sm text-light"
          role="status"
        >
          <span className="visually-hidden"></span>
        </div>
      );

      setTimeout(() => {
        navigate("/");
      }, 1000);
    }

    if (tittelWithoutSpace.length === 0) {
      setTittelInputState("border-danger");
      setTittelErrorMessageStatus("block");
    }

    if (innholdWithoutSpace.length === 0) {
      setInnholdInputState("border-danger");
      setInnholdErrorMessageStatus("block");
    }

    event.preventDefault();
  };

  return (
    <div>
      <Form
        pageTitle="Still et spørsmål"
        onChangeTittel={onChangeTittel}
        onChangeInnhold={onChangeInnhold}
        valueTittel={tittel}
        valueInnhold={innhold}
        tittelInputState={tittelInputState}
        tittelErrorMessageStatus={tittelErrorMessageStatus}
        innholdInputState={innholdInputState}
        innholdErrorMessageStatus={innholdErrorMessageStatus}
        onFocusTittel={onFocusTittel}
        onBlurTittel={onBlurTittel}
        onFocusInnhold={onFocusInnhold}
        onBlurInnhold={onBlurInnhold}
        onSubmit={onSubmit}
        buttonTitle={buttonStatus}
      />
    </div>
  );
};

export default AskQuestion;
