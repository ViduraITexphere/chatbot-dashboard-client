import React, { useState } from "react";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { Modal, Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import "./ProjectCard.css";
import IntegrationInstructionsRoundedIcon from "@mui/icons-material/IntegrationInstructionsRounded";
import DriveFileRenameOutlineRoundedIcon from "@mui/icons-material/DriveFileRenameOutlineRounded";
import toast, { Toaster } from "react-hot-toast";

const ProjectCard = ({ id, title, model }) => {
  const [open, setOpen] = useState(false);
  const [iframeCode, setIframeCode] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  const handleOpen = () => {
    setOpen(true);
    setIframeCode(
      // `<iframe id="chatbot-iframe" src="https://6628eaf1b5dff0007908d133--bright-kitsune-545e73.netlify.app/?objectId=${id}" width="380px" height="480px" frameborder="0"></iframe>`
      `<iframe id="chatbot-iframe" src="https://chatbot-frontend-new.vercel.app/?objectId=${id}" width="380px" height="500px" frameborder="0" style="position: fixed; bottom: 20px; left: 0; z-index: 999;"></iframe>`
    );
  };
  const handleClose = () => setOpen(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(iframeCode).then(
      toast.success("Embed code copied to clipboard!", {
        style: {
          fontSize: "12px",
          fontWeight: "500",
          color: "black",
        },
        icon: "👏",
      }),
      () => console.log("Iframe code copied to clipboard"),
      (error) => console.error("Failed to copy iframe code:", error)
    );
  };

  const handleUpdate = () => {
    navigate(`/update/${id}`); // Navigate to update/id page with the project ID
  };

  const handleShowTranscript = () => {
    window.location.href = `/transcript?objectId=${id}`;
  };

  return (
    <div className="project-card">
      <div className="project-card__header">
        <h3 className="card-title">{title}</h3>
        <p>Active</p>
      </div>
      <button className="card__button" onClick={handleOpen}>
        View <OpenInNewIcon sx={{ fontSize: "1rem" }} />
      </button>
      <Modal open={open} onClose={handleClose}>
        <div className="modal__content" sx={{ padding: "20px" }}>
          <h2>{title}</h2>
          {/* <p className="model__content">{model}</p> */}
          <textarea id="model__textarea" name="model" value={model} />
          <div>
            <TextField
              id="iframe-code"
              label="Embed Code"
              value={iframeCode}
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              readOnly
            />
          </div>
          <div className="note">
            <p>
              Note: Copy and paste the above embed code in your website header
              to display the chatbot.😎
            </p>
          </div>
          <Button
            id="copy-iframe-code"
            onClick={copyToClipboard}
            variant="outlined"
          >
            <IntegrationInstructionsRoundedIcon
              style={{
                fontSize: "1rem",
              }}
            />
            Copy Iframe Code
          </Button>
          <div className="modal__button__wrapper">
            <Button
              id="update__btn"
              onClick={handleShowTranscript}
              variant="outlined"
            >
              Show Transcript
            </Button>
            <Button id="update__btn" onClick={handleUpdate} variant="outlined">
              <DriveFileRenameOutlineRoundedIcon
                style={{
                  fontSize: "1rem",
                }}
              />
              Update
            </Button>
            <Button id="close__btn" onClick={handleClose} variant="outlined">
              Close
            </Button>
          </div>
          <Toaster position="top-right" reverseOrder={false} />
        </div>
      </Modal>
    </div>
  );
};

export default ProjectCard;
