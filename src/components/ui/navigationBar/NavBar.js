import React from "react";
import "./NavBar.css";

// material ui
import { Badge, IconButton, Typography } from "@mui/material";
import { IoIosNotifications } from "react-icons/io";
import AddIcon from "@mui/icons-material/Add";
import Login from "../../auth/Login";

function NavBar() {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    // setOpen(true);
    window.location.href = "/add-story";
  };
  return (
    <>
      <div className="navbar">
        <div className="navbar__left">
          <div className="SideDrawer__header">
            <div className="logo">
              <img
                src={require("../../../assets/images/logo.png")}
                alt="logo"
              />
            </div>
          </div>
          <Typography className="typography" sx={{ color: "white" }}>
            Chatbot
          </Typography>
        </div>
        <div className="navbar__right">
          <Login />
          <IconButton onClick={handleClick} sx={{ color: "white" }}>
            <AddIcon size={26} />
          </IconButton>
          <Badge variant="dot" color="warning">
            <IoIosNotifications
              size={26}
              style={{ color: "white", cursor: "pointer" }}
            />
          </Badge>
        </div>
      </div>
    </>
  );
}

export default NavBar;
