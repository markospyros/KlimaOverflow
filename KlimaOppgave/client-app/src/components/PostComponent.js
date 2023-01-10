import axios from "axios";
import React, { useState } from "react";
import { BiEdit, BiTrash } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import DeleteModal from "./DeleteModal";
import ProfileCard from "./ProfileCard";

const PostComponent = (props) => {
  const [visibility, setVisibility] = useState("none");
  const [showModalDelete, setShowModalDelete] = useState(false);

  const openModalDelete = () => {
    setShowModalDelete(true);
  };

  const closeModalDelete = () => {
    setShowModalDelete(false);
  };

  const navigate = useNavigate();

  const onEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const onDelete = (id) => {
    axios.delete(`/slettinnlegg/${id}`).catch((error) => {
      if (error.response.status === 401) {
        navigate("/login");
      }
    });
    props.deletePost(id);
  };

  const onHoverPost = () => {
    if (props.brukernavn === props.sessionBrukernavn) {
      setVisibility("block");
    } else if (props.sessionBrukernavn === "Admin") {
      setVisibility("block");
    }
  };

  const onLeavePost = () => {
    setVisibility("none");
  };

  return (
    <>
      <div
        className="card-body"
        onMouseEnter={onHoverPost}
        onMouseLeave={onLeavePost}
      >
        <div className="row">
          <div className="col-9">
            <ProfileCard
              brukernavn={props.brukernavn}
              picWidth={"50px"}
              picHeight={"50px"}
              fontSize={"fs-5 text"}
              marginBottom={"mb-4"}
            />
            <h5 className="card-title">{props.tittel}</h5>
          </div>
          <div className={`col-3 text-end d-${visibility}`}>
            <BiEdit
              color="blue"
              size={20}
              className="mx-3"
              style={{ cursor: "pointer" }}
              onClick={() => onEdit(props.id)}
            />
            <BiTrash
              color="red"
              size={20}
              style={{ cursor: "pointer" }}
              onClick={openModalDelete}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <p className="card-text text-start">{props.innhold}</p>
            <p className="card-text text-end text-secondary">{props.dato}</p>
          </div>
        </div>
        <DeleteModal
          sentence="Er du sikker på at du vil slette innlegget ditt?"
          showModalDelete={showModalDelete}
          closeModalDelete={closeModalDelete}
          onDelete={() => onDelete(props.id)}
        />
      </div>
    </>
  );
};

export default PostComponent;
