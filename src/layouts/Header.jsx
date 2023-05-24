import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { BasketContext } from "../contexts/BasketContext";
import { SignContext } from "../contexts/SignContext";

function ResponsiveAppBar() {
  const { basket } = React.useContext(BasketContext);
  const { setloggedIn, loggedIn } = React.useContext(SignContext);

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "purple",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Ecommerce
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              key="Products"
              sx={{ my: 2, color: "white", display: "block" }}
            >
              <Link
                to="/products"
                style={{ textDecoration: "none", color: "white" }}
              >
                Products
              </Link>
            </Button>
            <Button
              key="Basket"
              sx={{ my: 2, color: "white", display: "block" }}
            >
              <Link
                to="/basket"
                style={{ textDecoration: "none", color: "white" }}
              >
                Basket {basket.length > 0 ? `(${basket.length})` : ""}
              </Link>
            </Button>
          </Box>
          <Box sx={{ display: "flex" }}>
            {loggedIn ? (
              <>
              <Button
                onClick={() => {
                  setloggedIn(false);
                }}
                key="Log out"
                sx={{ my: 2, color: "white", display: "block" }}
              >
                <Link
                  to="/products"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  Log out
                </Link>
              </Button></>
            ) : (
              <>
                <Button
                  key="Login"
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  <Link
                    to="/login"
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    Login
                  </Link>
                </Button>
                <Button
                  key="Register"
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  <Link
                    to="/register"
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    Register
                  </Link>
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
