import React from "react";
import bewakoof from "@/assets/bewakoof.svg";
import { IoLogoFacebook, IoLogoInstagram } from "react-icons/io";

export default function Footer() {
  return (
    <footer className="p-12 flex flex-col flex-wrap gap-5 bg-[#1c1c1c]">
      <div className="w-47.5">
        <img className="w-full" src={bewakoof} alt="Bewakoof Logo" />
      </div>

      <div className="flex justify-between flex-wrap gap-2.5">
        {[
          {
            title: "CUSTOMER SERVICE",
            contents: [
              "Contact Us",
              "Track Order",
              "Return Order",
              "Cancel Order",
            ],
          },
          {
            title: "COMPANY",
            contents: [
              "About Us",
              "Terms & Conditions",
              "Privacy Policy",
              "We are Hiring",
            ],
          },
        ].map((item, idx) => (
          <div key={idx} className="flex flex-col gap-2">
            <h2 className="text-[#ffc801] font-bold">{item.title}</h2>
            {item.contents.map((content, idx) => (
              <p className="text-white text-xs font-semibold tracking-wide" key={idx}>{content}</p>
            ))}
          </div>
        ))}
        <div className="flex flex-col gap-2.5">
          <h2 className="text-[#ffc801] font-bold">CONNECT WITH US</h2>
          {[{svg : <IoLogoFacebook />, info : "4.7M People like this"},{svg : <IoLogoInstagram />, info : "1M People like this"}].map((item,idx)=>(
            <div key={idx} className="flex items-center gap-2.5">
              {React.cloneElement(item.svg,{className : "text-xl text-white"})}
              <p className="text-white text-xs font-semibold tracking-wide">{item.info}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-2.5">
          <h2 className="text-[#ffc801] font-bold">KEEP UP TO DATE</h2>
          <div className="flex w-full">
            <input className="border-b-2 w-[50%] text-gray-300 border-[#ffc801] py-1 outline-0" type="text" placeholder="Enter Email Id:" />
            <button className="text-sm w-[50%] text-center bg-[#ffc801] tracking-wide font-semibold py-1.5 px-4">SUBSCRIBE</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
