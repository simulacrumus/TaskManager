import React from "react";
import { AppBar, Toolbar, Container, Typography, } from "@mui/material";
import { titleStyles } from "../styles";
interface NavbarProps{
    title:string
}

export const Navbar: React.FC<NavbarProps> = ({ title }) => {

  return (
    <AppBar>
      <Container maxWidth="md">
        <Toolbar
          disableGutters
          sx={{  }}>
            <Typography
            sx={ titleStyles }>
            {title}
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
};