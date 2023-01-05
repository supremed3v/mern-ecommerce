import React, { useState, useEffect } from "react";
import { Slider, Typography, Box, Button, Grid } from "@mui/material";
import { useProductContext } from "../context/ProductContext";
import ProductCard from "../components/ProductCard";

const Products = () => {
  const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 25000]);
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState(0);
  const [search, setSearch] = useState("");

  const { getProducts, products, loading } = useProductContext();
  const keyword = search.trim();

  const setCurrentPageHandler = (page) => {
    setCurrentPage(page);
  };

  const setPriceHandler = (event, newValue) => {
    setPrice(newValue);
  };

  const setCategoryHandler = (category) => {
    setCategory(category);
  };

  const setRatingHandler = (rating) => {
    setRating(rating);
  };

  const resetFiltersHandler = () => {
    setPrice([0, 25000]);
    setCategory("");
    setRating(0);
  };

  return (
    <div
      style={{
        flex: 1,
      }}
    >
      <h1
        style={{
          textAlign: "center",
          fontSize: "3rem",
          fontWeight: "bold",
          color: "black",
          marginTop: "2rem",
          marginBottom: "2rem",
        }}
      >
        Products
      </h1>

      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Box
              sx={{
                mx: 5,
                my: 2,
                backgroundColor: "white",
                borderRadius: "1rem",
                padding: "2rem",
                border: "1px solid #e0e0e0",
                flex: 1 / 3,
              }}
            >
              <div
                style={{
                  alignItems: "center",
                  marginBottom: "2rem",
                }}
              >
                <input
                  type="text"
                  placeholder="Search Products"
                  style={{
                    width: "100%",
                    padding: "0.5rem",
                    border: "1px solid #e0e0e0",
                    borderRadius: "0.5rem",
                    outline: "none",
                  }}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <Box sx={{ width: 150 }}>
                  <Typography id="range-slider" gutterBottom variant="h6">
                    Price Range
                  </Typography>
                  <Slider
                    value={price}
                    onChange={setPriceHandler}
                    valueLabelDisplay="auto"
                    aria-labelledby="range-slider"
                    min={0}
                    max={25000}
                  />
                </Box>
                <Box sx={{ width: 150 }}>
                  <Typography id="range-slider" gutterBottom variant="h6">
                    Categories
                  </Typography>
                  <div>
                    <ul>
                      {categories.map((category) => (
                        <li
                          key={category}
                          style={{
                            listStyle: "none",
                            display: "inline-block",
                          }}
                        >
                          <Button
                            variant="contained"
                            onClick={() => setCategoryHandler(category)}
                            size="small"
                            sx={{ m: 0.3 }}
                          >
                            {category}
                          </Button>
                        </li>
                      ))}
                    </ul>

                    <Button
                      sx={{
                        m: 0.3,
                        backgroundColor: "red",
                        color: "white",
                        fontWeight: "bold",
                        textTransform: "uppercase",
                        border: "1px solid",
                        "&:hover": {
                          backgroundColor: "white",
                          color: "red",
                        },
                      }}
                      onClick={resetFiltersHandler}
                    >
                      Reset Filters
                    </Button>
                  </div>
                </Box>
                <Box sx={{ width: 150 }}>
                  <Typography id="range-slider" gutterBottom variant="h6">
                    Rating
                  </Typography>
                  <div>
                    <Slider
                      value={rating}
                      onChange={(event, newValue) => setRatingHandler(newValue)}
                      valueLabelDisplay="auto"
                      aria-labelledby="continuous-slider"
                      min={0}
                      max={5}
                    />
                  </div>
                </Box>
                <Button
                  variant="contained"
                  sx={{
                    m: 0.3,
                    color: "white",
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    border: "1px solid",
                    "&:hover": {
                      backgroundColor: "white",
                      color: "red",
                    },
                  }}
                  onClick={() =>
                    getProducts(keyword, currentPage, price, category, rating)
                  }
                >
                  Apply Filters
                </Button>
              </div>
            </Box>
          </Grid>
          <Grid item xs={8}>
            <Box>
              {products.length === 0 && (
                <Typography
                  variant="h6"
                  color="red"
                  sx={{
                    fontSize: "2rem",
                    fontWeight: "bold",
                  }}
                >
                  No Products Found
                </Typography>
              )}
            </Box>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <ProductCard products={products} />
            </Box>
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default Products;
