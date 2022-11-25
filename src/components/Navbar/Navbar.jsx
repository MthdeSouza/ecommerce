import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  MenuItem,
  Menu,
  Typography,
} from "@material-ui/core";
import { CallMissedSharp, ShoppingCart } from "@material-ui/icons";
import { Link, useLocation } from "react-router-dom";

import logo_large from "../../assets/logo_large.png";

import useStyles from "./styles";

const Navbar = ({ totalItems }) => {
  const classes = useStyles();
  const location = useLocation();

  return (
    <>
      <AppBar position="fixed" className={CallMissedSharp.AppBar}>
        <Toolbar>
          {/* <Toolbar variant="h4" className={classes.title} color="inherit"> */}
          <Typography
            component={Link}
            to="/"
            variant="h6"
            className={classes.title}
            color="inherit"
          >
            <img
              src={logo_large}
              alt="Commerce.js"
              height="60px"
              className={classes.image}
            />
            Store
          </Typography>
          <div className={classes.grow} />
          {location.pathname === "/" && (
            <div className={classes.button}>
              <IconButton
                component={Link}
                to="/cart"
                aria-label="Show cart items"
                color="inherit"
              >
                <Badge
                  badgeContent={totalItems}
                  color="secondary"
                  overlap="rectangular"
                >
                  <ShoppingCart />
                </Badge>
              </IconButton>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
