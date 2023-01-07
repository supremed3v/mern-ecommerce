import React from "react";
import {
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";


const Checkout = ({activeStep}) => {
  const steps = ["Shipping address", "Payment details", "Review your order"];
  
  return (
    <>
    <Stepper alternativeLabel activeStep={activeStep}>
      {steps.map((item,index)=>(
        <Step key={index} active={activeStep === index ? true : false} completed={activeStep >= index ? true : false}>
          <StepLabel
          style={{
            color: activeStep === index ? "black" : "grey",
          }}
          >{item}</StepLabel>

        </Step>
      ))}
    </Stepper>
    </>
  );
};

export default Checkout;
