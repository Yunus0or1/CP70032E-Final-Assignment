import React from "react";
import ProductHero from "../modules/views/ProductHero";
import ProductHowItWorks from "../modules/views/ProductHowItWorks";
import ProductCTA from "../modules/views/ProductCTA";

export const Landing = () => {
  return (
    <>
      <ProductHero />
      <ProductHowItWorks />
      <ProductCTA />
    </>
  );
};
