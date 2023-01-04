import React from "react";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Rating,
} from "@mui/material";

const ProductCard = () => {
  return (
    <div>
      {/* Create Product Card in grid */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 3,
          my: 6,
          mx: 2,
        }}
      >
        <Card sx={{ maxWidth: 345 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image="https://source.unsplash.com/random"
              alt="random"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Product 1
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quisquam, quod.
              </Typography>
              <Typography variant="body2" color="text.secondary">
                $100
              </Typography>
              <Typography variant="body2" color="text.secondary">
                10 in stock
              </Typography>
              <Typography variant="body2" color="text.secondary">
                5 reviews
              </Typography>
              <Rating name="read-only" value={4} readOnly />
            </CardContent>
          </CardActionArea>
          <Button size="small" color="primary">
            Add to Cart
          </Button>
        </Card>
        <Card sx={{ maxWidth: 345 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image="https://source.unsplash.com/random"
              alt="random"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Product 2
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quisquam, quod.
              </Typography>
              <Typography variant="body2" color="text.secondary">
                $100
              </Typography>
              <Typography variant="body2" color="text.secondary">
                10 in stock
              </Typography>
              <Typography variant="body2" color="text.secondary">
                5 reviews
              </Typography>
              <Rating name="read-only" value={4} readOnly />
            </CardContent>
          </CardActionArea>
          <Button size="small" color="primary">
            Add to Cart
          </Button>
        </Card>
        <Card sx={{ maxWidth: 345 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image="https://source.unsplash.com/random"
              alt="random"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Product 3
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quisquam, quod.
              </Typography>
              <Typography variant="body2" color="text.secondary">
                $100
              </Typography>
              <Typography variant="body2" color="text.secondary">
                10 in stock
              </Typography>
              <Typography variant="body2" color="text.secondary">
                5 reviews
              </Typography>
              <Rating name="read-only" value={4} readOnly />
            </CardContent>
          </CardActionArea>
          <Button size="small" color="primary">
            Add to Cart
          </Button>
        </Card>
        <Card sx={{ maxWidth: 345 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image="https://source.unsplash.com/random"
              alt="random"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Product 3
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quisquam, quod.
              </Typography>
              <Typography variant="body2" color="text.secondary">
                $100
              </Typography>
              <Typography variant="body2" color="text.secondary">
                10 in stock
              </Typography>
              <Typography variant="body2" color="text.secondary">
                5 reviews
              </Typography>
              <Rating name="read-only" value={4} readOnly />
            </CardContent>
          </CardActionArea>
          <Button size="small" color="primary">
            Add to Cart
          </Button>
        </Card>
      </Box>
    </div>
  );
};

export default ProductCard;
