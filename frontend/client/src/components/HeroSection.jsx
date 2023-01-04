import React from "react";
import { Box, Button, Typography } from "@mui/material";

const HeroSection = () => {
  const decorative = "Welcome to";
  const title = "MERN Store";
  const subtitle =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.";
  return (
    <Box
      sx={{
        flex: 1,
        height: "60vh",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        gap: 2,
        my: 6,
        textAlign: "center",
      }}
    >
      <Box
        sx={{
          color: "primary.500",
          fontWeight: 600,
          fontSize: "sm",
          textTransform: "uppercase",
          letterSpacing: 0.5,
        }}
      >
        {decorative}
      </Box>
      <Typography
        variant="h1"
        sx={{
          fontSize: { xs: "4xl", sm: "5xl", md: "6xl" },
          fontWeight: 800,
        }}
      >
        {title}
      </Typography>
      <Typography
        sx={{
          fontSize: "lg",
          color: "gray.500",
          maxWidth: "54ch",
        }}
      >
        {subtitle}
      </Typography>
      <Button
        variant="contained"
        sx={{
          backgroundColor: "primary.500",
          color: "white",
          textTransform: "uppercase",
          fontWeight: 600,
          letterSpacing: 0.5,
          px: 8,
          py: 2,
          "&:hover": {
            backgroundColor: "primary.600",
          },
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontSize: "md",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: 0.5,
          }}
        >
          Shop Now
        </Typography>
      </Button>
    </Box>
  );
};

export default HeroSection;
