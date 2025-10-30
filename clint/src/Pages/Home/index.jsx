import React from "react";
import Banner from "./Banner";
import FastedDelivery from "./FastedDelivery";
import Brand from "./Brand";
import DealsOf from "./DealsOf";
import TopCateGories from "./TopCateGories";
import TopElectronicsBrands from "./TopElectronicsBrands";
import FrequentlyBoughtTogether from "./FrequentlyBoughtTogether";
import UserOpinion from "./UserOpinion";
import FAQ from "./FAQ";
import PromoShowcase from "./PromoShowcase";

export default function Home() {
  return (
    <>
      <Banner />
      <FastedDelivery />
      <Brand />
      <DealsOf />
      <PromoShowcase/>
      <TopCateGories />
      <TopElectronicsBrands />
      <FrequentlyBoughtTogether />
      <UserOpinion />
      <FAQ />
    </>
  );
}
