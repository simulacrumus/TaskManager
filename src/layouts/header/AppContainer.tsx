import React from "react";
import { Container } from "@mui/material";

const AppContainer: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <Container
      maxWidth="md"
      sx={{
        mt: 15,
        textAlign: "left",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}>
      {children}
    </Container>
  );
};

export default AppContainer;