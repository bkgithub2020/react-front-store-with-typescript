import {
  AppBar,
  Toolbar,
  Typography,
  makeStyles,
  Button,
} from "@material-ui/core";
import React from "react";
import { Link as RouterLink } from "react-router-dom";

const useStyles = makeStyles(() => ({
  header: {
    backgroundColor: "#400CCC",
    paddingRight: "79px",
    paddingLeft: "118px",
  },
  logo: {
    fontFamily: "Work Sans, sans-serif",
    fontWeight: 600,
    color: "#FFFEFE",
    textAlign: "left",
  },
  mainHeader: {
    marginBottom: "100px",
  },
}));

export default function Header() {
  const { header, logo, mainHeader } = useStyles();

  return (
    <header className={mainHeader}>
      <AppBar className={header}>
        <Toolbar>
          <Typography variant="h6" component="h1" className={logo}>
            Logo
          </Typography>
        </Toolbar>
      </AppBar>
    </header>
  );
}