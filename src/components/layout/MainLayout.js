import { Grid } from "@mui/material";
import { Outlet } from "react-router-dom";
import NavBar from "../ui/navigationBar/NavBar";
import Drawer from "../ui/sidebar/Drawer";
import "./MainLayout.css";

function MainLayout() {
  return (
    <Grid container className="container">
      <Grid className="container-sidebar">
        <Drawer />
      </Grid>
      <Grid container className="container-right-side">
        <Grid item xs={12} className="container-right-header">
          <NavBar />
        </Grid>
        <Grid item xs={12} className="container-right-body">
          <Outlet />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default MainLayout;
