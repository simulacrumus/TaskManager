import React from "react";
import { Container } from "@mui/material";
import { appContainerStyles as styles} from "../styles";

export const AppContainer: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <Container
      maxWidth="md"
      sx={ styles }
    >
      {children}
    </Container>
  );
};