import React from "react";
import Container from "./Container";
import Title from "./Title";
import { Link } from "react-router-dom";
// import {
//   11,
//   12,
// } from "../assets";
// import {
//   1,
//   2,
// } from "./public/images";

const DiscountedBanner = () => {
  const popularSearchItems = [
    { title: "Smart Watches", link: "smartWatches" },
    { title: "Headphone", link: "headphones" },
    { title: "Cameras", link: "camerasAndPhotos" },
    { title: "Audio", link: "tvAndAudio" },
    { title: "Laptop & Computers", link: "computersAndLaptop" },
    { title: "Cell Phone", link: "cellPhones" },
  ];
  return (
    <Container>
      <div>
        <Title text="Shop By Collection" />
        <div className="w-full h-[1px] bg-gray-200 mt-3" />
      </div>
      <div className="my-7 flex items-center flex-wrap gap-4">
        {popularSearchItems?.map(({ title, link }) => (
          <Link
            key={title}
            to={`/category/${link}`}
            className="border border-[px] border-gray-300 px-8 py-3 rounded-full capitalize font-medium hover:bg-black hover:text-white duration-200"
          >
            {title}
          </Link>
        ))}
      </div>
      <div className="w-full py-5 md:py-0 my-12 bg-[#f6f6f6] rounded-lg flex items-center justify-between overflow-hidden">
        {/* <img
          src={1}
          alt="discountedImgOne"
          className="hidden lg:inline-flex h-36"
        /> */}
        <div className="flex flex-col flex-1 gap-1 items-center">
          <div className="flex items-center justify-center gap-x-3 text-xl md:text-4xl font-bold">
            <h2>Harmaig Ring</h2>
            <Link
              to={"/product"}
              className="border border-red-600 px-4 py-2 text-xl md:text-3xl text-red-600 rounded-full"
            >
              Discount 20%
            </Link>
          </div>
          <p className="text-sm text-gray-600 font-medium">
            Let's go for your dream
          </p>
        </div>
        {/* <img
          src={2}
          alt="discountedImgTwo"
          className="hidden lg:inline-flex h-36"
        /> */}
      </div>
      <div className="mt-7">
        <p className="font-bold text-2xl">JWELLERY GUIDES</p>
        <div className=" mt-7  gap bg-slate-200 rounded-full h-28">
          <div className=" flex items-center justify-center mb-0 px-0 py-0 cursor-pointer group h-28">
          <Link
              to={"/size"}
              className="border border-slate-200 bg-slate-200 px-4 py-2 text-xl md:text-3xl text-blue-950 rounded-full"
            >
              Find your jwellery size
            </Link>
          </div>
          

          {/* <div className="d-grid gap-2 col-6 mx-auto bg-black">
                <CButton className="bg-red-700">Button</CButton>
                <CButton className="bg-red-500 gap-4" >Button</CButton>
            </div> */}

          {/* <div className="border border-r-0 border-gray-300 flex items-center justify-center px-6 py-2 cursor-pointer group">
            <img
              src={brandThree}
              alt="brandThree"
              className="w-36 h-auto group-hover:opacity-50 duration-200"
            />
          </div>
          <div className="border border-r-0 border-gray-300 flex items-center justify-center px-6 py-2 cursor-pointer group">
            <img
              src={brandFour}
              alt="brandFour"
              className="w-36 h-auto group-hover:opacity-50 duration-200"
            />
          </div> */}
          {/* <div className="border border-r-0 border-gray-300 flex items-center justify-center px-6 py-2 cursor-pointer group">
            <img
              src={brandFive}
              alt="brandFive"
              className="w-36 h-auto group-hover:opacity-50 duration-200"
            />
          </div>
          <div className="border border-gray-300 flex items-center justify-center px-6 py-2 cursor-pointer group">
            <img
              src={brandSix}
              alt="brandSix"
              className="w-36 h-auto group-hover:opacity-50 duration-200"
            />
          </div> */}
        </div>
      </div>
    </Container>
  );
};

export default DiscountedBanner;
