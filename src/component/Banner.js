import { Container, Typography } from "@mui/material";
import React from "react";
import "./banner.css";
import Carousel from "./Carousel";
const Banner = () => {
  return (
    <div className="banner">
      <Container className="bannercontent">
        <div className="tagline">
              <Typography
          variant="h2"
          style={{
            fontWeight: "bold",
            marginBottom: "15",
            fontFamily: "Monsterrat",
          }}
        >
          Crypto Tracker
        </Typography>
        <Typography variant="subtitle2"
        style={{
            color:"darkgrey",
            textTransform:"capitalize",
            fontFamily:"Monsterrat",
        }}>
Get all the info regarding your favourite Crypto Currency 
        </Typography>
        </div>
      <Carousel />
      </Container>
    </div>
  );
};

export default Banner;
