import React from "react";
import { assets } from "../../assets/assest";

export default function Footer() {
  return (
    <>
      <div className="hidden bg-[#191C1F] lg:flex justify-center gap-[40px] py-14">
        <div className="flex flex-col ">
          <img
            className="w-[200px] h-[36px]"
            src={assets.UnitedDeal}
            alt="uniteddeal"
          />
          <p className="text-[10.5px] mt-[18px] text-[#77878F]">
            Customer Supports:
          </p>
          <h4 className="text-[13.5px] mt-1 text-[#FFFFFF]">(629) 555-0129</h4>
          <p className="text-[12px] text-[#ADB7BC] mt-[9px]">
            4517 Washington Ave. <br /> Manchester, Kentucky 39495
          </p>
          <h4 className="mt-[9px] text-[12px] text-[#FFFFFF]">
            info@kinbo.com
          </h4>
        </div>

        <div className="flex flex-col gap-1  ">
          <h4 className="text-[#FFFFFF] text-[12px] mb-2">Top Category</h4>
          <a className="text-[#929FA5] text-[10.5px]" href="#">
            Computer & Laptop
          </a>
          <a className="text-[#929FA5] text-[10.5px]" href="#">
            SmartPhone
          </a>
          <a className="text-[#929FA5] text-[10.5px]" href="#">
            Headphone
          </a>
          <img
            className="w-[84px] h-[24px]"
            src={assets.Accessories}
            alt="Accessorise"
          />
          <a className="text-[#929FA5] text-[10.5px]" href="#">
            Camera & Photo
          </a>
          <a className="text-[#929FA5] text-[10.5px]" href="#">
            TV & Homes
          </a>
          <img
            className="w-[116px] h-[24px]"
            src={assets.BrowseAllProduct}
            alt="BrowseAllProduct"
          />
        </div>

        <div className="flex flex-col gap-1  ">
          <h4 className="text-[#FFFFFF] text-[12px] mb-2">Quick links</h4>
          <a className="text-[#929FA5] text-[10.5px]" href="#">
            Shop Product
          </a>
          <a className="text-[#929FA5] text-[10.5px]" href="#">
            Shoping Cart
          </a>
          <a className="text-[#929FA5] text-[10.5px]" href="#">
            Wishlist
          </a>
          <a className="text-[#929FA5] text-[10.5px]" href="#">
            Refund Policy
          </a>
          <a className="text-[#929FA5] text-[10.5px]" href="#">
            Shipping Policy
          </a>
          <a className="text-[#929FA5] text-[10.5px]" href="#">
            Privacy Policy
          </a>
          <a className="text-[#929FA5] text-[10.5px]" href="#">
            Terms of Service
          </a>
        </div>
        <div className="flex flex-col gap-1  ">
          <h4 className="text-[#FFFFFF] text-[12px] mb-2">Download APP</h4>
          <img
            className="w-[132px] h-[52px]"
            src={assets.GooglePlay}
            alt="GooglePlay"
          />
          <img
            className="w-[132px] h-[52px]"
            src={assets.AppStore}
            alt="AppStore"
          />
        </div>
        <div className="flex flex-col gap-1  ">
          <h4 className="text-[#FFFFFF] text-[12px] mb-2">Popular Tag</h4>
          <img className="w-[234px] h-[114px]" src={assets.Game} alt="Game" />
        </div>
      </div>

      <div className=" bg-[#191C1F] flex lg:hidden items-center flex-col justify-center gap-[40px] py-14">
        <div className="flex sm:flex-row flex-col gap-12 sm:gap-16 md:gap-24">
          <div className="flex flex-col ">
            <img
              className=" w-[320px] h-[56px] sm:w-[200px] sm:h-[36px]"
              src={assets.UnitedDeal}
              alt="uniteddeal"
            />
            <p className="text-[16px] sm:text-[10.5px] mt-[18px] text-[#77878F]">
              Customer Supports:
            </p>
            <h4 className="text-[20px] sm:text-[13.5px] mt-1 text-[#FFFFFF]">
              (629) 555-0129
            </h4>
            <p className="text-[16px] sm:text-[12px] text-[#ADB7BC] mt-[9px]">
              4517 Washington Ave. <br /> Manchester, Kentucky 39495
            </p>
            <h4 className="mt-[9px] text-[20px] sm:text-[12px] text-[#FFFFFF]">
              info@kinbo.com
            </h4>
          </div>
          <div className="flex flex-row gap-16">
            <div className="flex flex-col gap-1  ">
              <h4 className="text-[#FFFFFF] text-[12px] mb-2">Top Category</h4>
              <a className="text-[#929FA5] text-[10.5px]" href="#">
                Computer & Laptop
              </a>
              <a className="text-[#929FA5] text-[10.5px]" href="#">
                SmartPhone
              </a>
              <a className="text-[#929FA5] text-[10.5px]" href="#">
                Headphone
              </a>
              <img
                className="w-[84px] h-[24px]"
                src={assets.Accessories}
                alt="Accessorise"
              />
              <a className="text-[#929FA5] text-[10.5px]" href="#">
                Camera & Photo
              </a>
              <a className="text-[#929FA5] text-[10.5px]" href="#">
                TV & Homes
              </a>
              <img
                className="w-[116px] h-[24px]"
                src={assets.BrowseAllProduct}
                alt="BrowseAllProduct"
              />
            </div>

            <div className="flex flex-col gap-1  ">
              <h4 className="text-[#FFFFFF] text-[12px] mb-2">Quick links</h4>
              <a className="text-[#929FA5] text-[10.5px]" href="#">
                Shop Product
              </a>
              <a className="text-[#929FA5] text-[10.5px]" href="#">
                Shoping Cart
              </a>
              <a className="text-[#929FA5] text-[10.5px]" href="#">
                Wishlist
              </a>
              <a className="text-[#929FA5] text-[10.5px]" href="#">
                Refund Policy
              </a>
              <a className="text-[#929FA5] text-[10.5px]" href="#">
                Shipping Policy
              </a>
              <a className="text-[#929FA5] text-[10.5px]" href="#">
                Privacy Policy
              </a>
              <a className="text-[#929FA5] text-[10.5px]" href="#">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
        <div className="flex gap-3 sm:gap-24 md:gap-36">
          <div className="flex flex-col gap-1  ">
            <h4 className="text-[#FFFFFF] text-[12px] mb-2">Download APP</h4>
            <img
              className="w-[132px] h-[52px]"
              src={assets.GooglePlay}
              alt="GooglePlay"
            />
            <img
              className="w-[132px] h-[52px]"
              src={assets.AppStore}
              alt="AppStore"
            />
          </div>
          <div className="flex flex-col gap-1  ">
            <h4 className="text-[#FFFFFF] text-[12px] mb-2">Popular Tag</h4>
            <img className="w-[234px] h-[114px]" src={assets.Game} alt="Game" />
          </div>
        </div>
      </div>
    </>
  );
}
