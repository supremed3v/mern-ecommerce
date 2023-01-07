import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Formik, Form } from "formik";
import * as Yup from "yup";

export default function PaymentForm() {
  const validate = Yup.object({
    cardName: Yup.string()
      .max(25, "Must be 25 character of less")
      .required("Required"),
    cardNumber: Yup.number().required("Required"),
    expDate: Yup.string()
      .max(150, "Must be less than or equal to 150 characters")
      .required("Required"),
    cvv: Yup.number().required("Required"),
  });

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <Formik
        initialValues={{
          cardName: "",
          cardNumber: 0,
          expDate: "",
          cvv: 0,
        }}
        validationSchema={validate}
      >
        {(formik) => (
          <div>
            {console.log(formik.values)}
            <Form>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    required
                    id="cardName"
                    name="cardName"
                    label="Name on card"
                    fullWidth
                    autoComplete="cc-name"
                    onChange={formik.handleChange}
                    value={formik.values.cardName}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    required
                    id="cardNumber"
                    name="cardNumber"
                    label="Card number"
                    fullWidth
                    autoComplete="cc-number"
                    onChange={formik.handleChange}
                    value={formik.values.cardNumber}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    required
                    id="expDate"
                    name="expDate"
                    label="Expiry date"
                    fullWidth
                    autoComplete="cc-exp"
                    onChange={formik.handleChange}
                    value={formik.values.expDate}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    required
                    id="cvv"
                    name="cvv"
                    label="CVV"
                    helperText="Last three digits on signature strip"
                    fullWidth
                    autoComplete="cc-csc"
                    onChange={formik.handleChange}
                    value={formik.values.cvv}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox color="secondary" name="saveCard" value="yes" />
                    }
                    label="Remember credit card details for next time"
                  />
                </Grid>
              </Grid>
            </Form>
          </div>
        )}
      </Formik>
    </React.Fragment>
  );
}
