import React from "react";
import "./Drawer.css";

// mui icons
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import SettingsIcon from "@mui/icons-material/Settings";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import EqualizerRoundedIcon from "@mui/icons-material/EqualizerRounded";

function Drawer() {
  return (
    <div className="SideDrawer">
      <div className="SideDrawer__body">
        <div className="SideDrawer__body__list">
          <div className="SideDrawer__body__item">
            <div className="nav_list">
              <HomeRoundedIcon style={{ color: "#494949", fontSize: 20 }} />
              <a href="/">Dashboard</a>
            </div>
            <div className="nav_list">
              <AccountTreeIcon
                size={18}
                style={{ color: "#494949", fontSize: 20 }}
              />
              <a href="/transcript">Transcripts</a>
            </div>
            <div className="nav_list">
              <SettingsIcon
                size={14}
                style={{ color: "#494949", fontSize: 20 }}
              />
              <a href="index.jsx">Settings</a>
            </div>
            <div className="nav_list">
              <HeadphonesIcon
                size={14}
                style={{ color: "#494949", fontSize: 20 }}
              />
              <a href="index.jsx">Support</a>
            </div>
            <div className="nav_list">
              <AssignmentTurnedInIcon
                size={14}
                style={{ color: "#494949", fontSize: 20 }}
              />
              <a href="index.jsx">Tasks</a>
            </div>
            <div className="nav_list">
              <EqualizerRoundedIcon
                size={14}
                style={{ color: "#494949", fontSize: 20 }}
              />
              <a href="index.jsx">Analytics</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Drawer;
