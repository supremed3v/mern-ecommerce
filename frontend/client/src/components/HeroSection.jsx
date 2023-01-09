import React from "react";
import { Box, Button, Typography, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  const decorative = "One-Stop";
  const span = "Online Shopping"
  const title = "For your fashion needs.";
  return (
    <>
      <Grid container spacing={1} columns={15} sx={{
        mb: 10,
        px: 20,
        py: 10,
      }}>
        <Grid item xs={8} sx={{
          ml: 10,
          mr: 10,
        }}>
          <Box
            sx={{
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "left",
              display: "flex",
            }}
          >
            <Box
              sx={{
                color: "#ececec",
                fontWeight: 600,
                fontSize: "22px",
                textTransform: "uppercase",
                letterSpacing: 0.5,
              }}
            >
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: "4xl", sm: "5xl", md: "6xl" },
                  fontWeight: 800,
                  color: "#ececec",
                }}
              >
                {decorative}
                <Typography
                  variant="h2"
                  sx={{
                    fontSize: { xs: "4xl", sm: "5xl", md: "6xl" },
                    fontWeight: 800,
                    color: "#E68283",
                    display: "inline-block",
                    fontStyle: "italic"
                  }}>
                  {span}
                </Typography>
              </Typography>

            </Box>
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: "4xl", sm: "5xl", md: "6xl" },
                fontWeight: 800,
                color: "#ececec",
              }}
            >
              {title}
            </Typography>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#EF8485",
                color: "white",
                textTransform: "uppercase",
                fontWeight: 600,
                letterSpacing: 0.5,
                px: 8,
                py: 2,
                mt: 2,
                width: 500,
                "&:hover": {
                  backgroundColor: "primary.600",
                },
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontSize: "md",
                  letterSpacing: 0.5,
                  width: 500
                }}
                onClick={() => navigate("/products")}
              >
                See All Products
              </Typography>
            </Button>
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box style={{
            alignContent: "flex-end",
          }}>
            <Box
              style={{
                transition: "1s",

                zIndex: 5555,
                "&:hover": {
                  transform: "scale3d(0.85, 0.85, 1)",
                },
              }}
            >
              <img
                src={"https://images.unsplash.com/photo-1483181957632-8bda974cbc91?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"}
                alt="img"
                style={{
                  objectFit: "cover",
                  width: "400px",
                  height: "400px",
                  marginTop: "10px",
                  borderRadius: 10,

                }}
                className="boxShadow"
              />
            </Box>

            <Box sx={{
              position: "absolute",
              zIndex: 999,
              top: "100px",
              right: "50px",
              transition: "1s",
              "&:hover": {
                transform: "scale3d(0.85, 0.85, 1)",
              },
            }}>
              <img src="https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" alt="" style={{
                width: "150px",
                height: "100px",
                objectFit: "cover",
                borderRadius: "10px",
                borderBottom: "20px solid white",

              }}
                className="boxShadow"
              />
            </Box>
            <Box sx={{
              position: "absolute",
              zIndex: 999,
              top: "400px",
              right: "400px",
              transition: "1s",
              "&:hover": {
                transform: "scale3d(0.85, 0.85, 1)",
              },

            }}>
              <img src="https://images.unsplash.com/photo-1603625953304-97b6e41336b5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" alt="" style={{
                width: "150px",
                height: "100px",
                objectFit: "cover",
                borderRadius: "10px",
                borderBottom: "20px solid white",

              }}
                className="boxShadow"
              />
            </Box>
          </Box>

        </Grid>
      </Grid>
    </>
  );
};

export default HeroSection;
