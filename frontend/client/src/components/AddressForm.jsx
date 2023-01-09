import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Box, Button } from "@mui/material";
import { useProductContext } from "../context/ProductContext";
import { useNavigate } from "react-router-dom";
import Checkout from "../pages/Checkout";
export default function AddressForm() {
  const [values, setValues] = React.useState({
    address: "",
    city: "",
    state: "",
    pinCode: 0,
    country: "",
    phoneNo: null,
  });
  const { saveShippingInfo } = useProductContext();
  const [errors, setErrors] = React.useState({});
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault()
    saveShippingInfo(values);
    navigate("/order/confirm");

  }

  return (
    <React.Fragment>
      {/* <Checkout activeStep={0} /> */}
      <Typography variant="h3" gutterBottom textAlign={"center"} sx={{
        marginTop: "2rem",
        color: "#e7e7e7e7"
      }}>
        Shipping address
      </Typography>
      <Grid container spacing={3} sx={{
        width: "60%",
        margin: "auto",
        marginTop: "2rem",
        background: "#e7e7e7e7"
      }}>
        <Grid item xs={12}>
          <TextField
            required
            id="address"
            name="address"
            label="Address line 1"
            fullWidth
            autoComplete="shipping address-line1"
            variant="standard"
            onChange={handleInputChange}
            error={errors.address}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="shipping address-level2"
            variant="standard"
            error={errors.city}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="state"
            name="state"
            label="State/Province/Region"
            fullWidth
            variant="standard"
            error={errors.state}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="pinCode"
            name="pinCode"
            label="Zip / Postal code"
            fullWidth
            autoComplete="shipping postal-code"
            variant="standard"
            type={"number"}
            error={errors.pinCode}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="phoneNo"
            name="phoneNo"
            label="Phone Number"
            fullWidth
            autoComplete="phone"
            variant="standard"
            type={"number"}
            error={errors.phoneNo}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="Country"
            fullWidth
            variant="standard"
            error={errors.state}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox color="secondary" name="saveAddress" value="yes" />
            }
            label="Use this address for payment details"
          />
        </Grid>
      </Grid>
      <Box sx={{
        margin: "auto",
        display: "flex",
        justifyContent: "center",

      }}>
        <Button variant="contained" color="primary" sx={{ mt: 3, mb: 2, mr: 2 }}
          onClick={handleFormSubmit}
        >
          Next
        </Button>
      </Box>

    </React.Fragment>
  );
}
