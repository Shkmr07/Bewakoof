import React from "react";
import bewakoof from "@/assets/bewakoof.svg";
import Play from "@/assets/gp.webp";
import App from "@/assets/AppStore.webp";
import { NavLink } from "react-router-dom";

import { IoLogoFacebook, IoLogoInstagram } from "react-icons/io";
import { FiTruck } from "react-icons/fi";
import { GiMoneyStack } from "react-icons/gi";
import { FaGooglePay } from "react-icons/fa";
import { SiPaytm, SiPhonepe } from "react-icons/si";
import { RiVisaLine, RiMastercardFill } from "react-icons/ri";

export default function Footer() {
  return (
    <footer className="p-12 bg-[#1c1c1c]">
      <div className="w-48 mb-5">
        <img className="w-full" src={bewakoof} alt="Bewakoof Logo" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 ">
        {/* CUSTOMER SERVICE */}
        <div className="flex flex-col gap-2">
          <h2 className="text-[#ffc801] font-bold">CUSTOMER SERVICE</h2>
          {["Contact Us", "Track Order", "Return Order", "Cancel Order"].map(
            (content, idx) => (
              <p
                key={idx}
                className="text-white text-xs font-semibold tracking-wide"
              >
                {content}
              </p>
            )
          )}
        </div>

        {/* COMPANY */}
        <div className="flex flex-col gap-2">
          <h2 className="text-[#ffc801] font-bold">COMPANY</h2>
          {[
            "About Us",
            "Terms & Conditions",
            "Privacy Policy",
            "We are Hiring",
          ].map((content, idx) => (
            <p
              key={idx}
              className="text-white text-xs font-semibold tracking-wide"
            >
              {content}
            </p>
          ))}
        </div>

        {/* CONNECT WITH US */}
        <div className="flex flex-col gap-2">
          <h2 className="text-[#ffc801] font-bold">CONNECT WITH US</h2>
          {[
            { svg: <IoLogoFacebook />, info: "4.7M People like this" },
            { svg: <IoLogoInstagram />, info: "1M People like this" },
          ].map((item, idx) => (
            <div key={idx} className="flex items-center gap-2">
              {React.cloneElement(item.svg, {
                className: "text-xl text-white",
              })}
              <p className="text-white text-xs font-semibold tracking-wide">
                {item.info}
              </p>
            </div>
          ))}
        </div>

        {/* KEEP UP TO DATE */}
        <div className="flex flex-col gap-2">
          <h2 className="text-[#ffc801] font-bold">KEEP UP TO DATE</h2>
          <div className="flex">
            <input
              className="border-b-2 w-[50%] text-gray-300 border-[#ffc801] py-1 outline-0"
              type="text"
              placeholder="Enter Email Id:"
            />
            <button className="text-sm w-[50%] text-center bg-[#ffc801] tracking-wide font-semibold py-1.5 px-4">
              SUBSCRIBE
            </button>
          </div>
        </div>

        {/* SECOND ROW */}

        {/* CASH ON DELIVERY & RETURN POLICY */}
        <div className="flex flex-col gap-4">
          {[
            { svg: <FiTruck />, info: "15 Days Return Policy*" },
            { svg: <GiMoneyStack />, info: "Cash On Delivery*" },
          ].map((item, idx) => (
            <div key={idx} className="flex items-center gap-2">
              {React.cloneElement(item.svg, {
                className: "text-white text-lg",
              })}
              <p className="text-white text-xs">{item.info}</p>
            </div>
          ))}
        </div>

        {/* DOWNLOAD APP */}
        <div className="flex flex-col gap-2">
          <h2 className="text-[#ffc801] font-bold">DOWNLOAD THE APP</h2>
          <div className="flex items-center flex-wrap gap-3 w-full">
            <img className="w-25" src={Play} alt="Google Play" />
            <img className="w-25" src={App} alt="App Store" />
          </div>
        </div>

        {/* SECURE PAYMENTS */}
        <div className="flex flex-col gap-2">
          <h2 className="text-[#ffc801] font-bold">100% SECURE PAYMENTS</h2>
          <div className="flex items-center gap-2 flex-wrap">
            {[
              { icon: <FaGooglePay />, color: "text-black" }, // Google Pay (Black)
              { icon: <SiPaytm />, color: "text-[#00baf2]" }, // Paytm (Blue)
              { icon: <SiPhonepe />, color: "text-[#5f259f]" }, // PhonePe (Purple)
              { icon: <RiVisaLine />, color: "text-[#1a1f71]" }, // Visa (Dark Blue)
              { icon: <RiMastercardFill />, color: "text-[#eb001b]" }, // Mastercard (Red)
            ].map((item, idx) => (
              <div key={idx} className="px-3 py-1 rounded bg-white">
                {React.cloneElement(item.icon, {
                  className: `${item.color} text-lg`,
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Category Section */}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 text-white text-xs mt-10 py-5 border-t-2 border-slate-400">
        <div className="flex flex-col gap-5">
          <h2 className="text-lg font-semibold tracking-wide">
            Men's Clothing
          </h2>
          <div className="flex flex-wrap gap-3 md:grid md:grid-cols-1 md:gap-3">
            {[
              "Top Wear",
              "Men's New Arrivals",
              "Men's T-Shirts",
              "Men's Hoodies & Sweatshirts",
              "Oversized T-Shirts for Men",
              "Men's Long Sleeve T-shirts",
              "Men's White T-shirts",
              "Men's Crew Neck T-shirts",
              "Men's Half Sleeve T-Shirts",
              "Men's Printed T-shirts",
              "Men's Plain T-shirts",
              "Men's Plus Size T-shirts",
              "Men's Vests",
              "Men's Polo T-Shirts",
              "Men's Tank Tops",
              "Men's Sweaters",
              "Men's Jackets",
              "Men's Combo T-Shirts",
              "Men's Shirts",
              "Men's Nightwear",
              "Men's Innerwear",
              "Men's Plus Size Store",
              "Bottom Wear",
              "Men's Pajamas",
              "Men's Boxer Shorts",
              "Men's Shorts",
              "Men's Jogger",
              "Men's Cargo Joggers",
              "Men's Track Pants",
              "Men's Jeans",
              "Men's Sweatpants",
              "Men's Trousers & Pants",
            ].map((item, idx) => (
              <p key={idx}>{item}</p>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <h2 className="text-lg font-semibold tracking-wide">
            Women's Clothing
          </h2>
          <div className="flex flex-wrap gap-3 md:grid md:grid-cols-1 md:gap-3">
            {[
              "Women's Top Wear",
              "Women's New Arrivals",
              "Women's T-Shirts",
              "Women's Fashion Tops",
              "Women's Tank Tops",
              "Women's Hoodies & Sweatshirts",
              "Women's Dresses",
              "Women's 3/4 Sleeve T-Shirts",
              "Women's Kurtis",
              "Women's Combo T-Shirts",
              "Women's Nightwear",
              "Women's Plus Size Store",
              "Women's Bottom Wear",
              "Women's Co-ord Sets",
              "Women's Pajamas",
              "Women's Boxer Shorts",
              "Women's Jeans",
              "Women's Wide Leg Jeans",
              "Women's Jeggings",
              "Women's Joggers",
              "Women's Trousers & Pants",
              "Women's Cargo Pants",
              "Women's Track Pants",
              "Women's Shorts",
            ].map((item, idx) => (
              <p key={idx}>{item}</p>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <h2 className="text-lg font-semibold tracking-wide">
            Mobile Cover's
          </h2>
          <div className="flex flex-wrap gap-3 md:grid md:grid-cols-1 md:gap-3">
            {[
              "Mobile Covers",
              "Apple",
              "iPhone 14 Cases & Covers",
              "iPhone 13 Back Covers",
              "iPhone 12 Back Covers Cases",
              "iPhone 13 Pro Back Covers",
              "Realme",
              "Samsung",
              "Xiaomi",
              "OnePlus",
              "Vivo",
              "Oppo",
              "Poco",
            ].map((item, idx) => (
              <p key={idx}>{item}</p>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-5">
          {["FANBOOK", "OFFERS", "SITEMAP"].map((item, idx) => (
            <p
              key={idx}
              className="text-[#1c7eaa] text-lg tracking-wide font-semibold"
            >
              {item}
            </p>
          ))}
        </div>
      </div>

      {/* Bewakoof Info */}

      <div className="text-white border-t-2 border-slate-400 md:border-0 py-10">
        <p className="text-lg">
          BEWAKOOF® THE NEW AGE ONLINE SHOPPING EXPERIENCE. Founded in 2012,
          Bewakoof® is a lifestyle fashion brand that makes creative,
          distinctive fashion for the trendy, contemporary Indian. Bewakoof® was
          created on the principle of creating impact through innovation,
          honesty and thoughtfulness.
          <br />
          <br />
          With a team of 400 members, and 2mn products sold till date. We like
          to experiment freely, which allows us to balance creativity and
          relatability, and our innovative designs. Our range of products is
          always fresh and up-to-date, and we clock sales of over 1 lakh
          products a month. Our innovation focus extends to our operations as
          well. We are vertically integrated, manufacture our own products, and
          cut out the middleman wherever possible. This direct-to-consumer model
          allows us to create high-quality fashion at affordable prices. A
          thoughtful brand, we actively attempt to minimize our environmental
          footprint and maximize our social impact. These efforts are integrated
          right into our day-to-day operations, from rainwater harvesting to
          paper packaging to employee benefits. To create an accessible,
          affordable and thoughtful experience of online shopping in India.
          <br />
          <br />
          Online Shopping at Bewakoof® is hassle-free, convenient and
          super-exciting! Online Shopping has always been a fun and exciting
          task for most and more so when the shopping mall is none other than
          your own house. We have all had days when we have planned trips to the
          clothing store in advance, dreaming about what we would buy once we
          get there. Now we wouldnt think twice before indulging in some online
          shopping. Well, cut to todays time and age, you can do all this from
          the comfort of your home while enjoying many online shopping offers,
          right from amazing deals and discounts to one of the most robust user
          interface amongst most online shopping sites in India, with many
          shopping filters to make your shopping experience truly hassle free.
          This in our own words is what we call Bewakoof.com.
          <br />
          <br />
          Bewakoof®, THE place to be when it comes to the coolest in online
          fashion, offers you fine, high-quality merchandise go ahead and
          indulge in a bit of online shopping for men and womens fashion. So
          browse through the exciting categories we have on offer from mens
          fashion to basic mens clothing as well as wide variety in womenswear
          and womens clothes to the amazing range of accessories, fill up your
          carts and get fast home delivery for all orders. All of this topped
          with our exclusive online shopping offers makes for an exciting,
          irresistible and uber cool combo! You can even gift some to your near
          and dear ones while being absolutely certain that it will put a smile
          on their faces.
          <br />
          <br />
          Bewakoof.com: the quirkiest online shopping sites of all!
          <br />
          Online fashion is definitely more accessible with Bewakoof.com.
          Explore the latest collections in Marvel t-shirts including avengers
          t-shirts and captain America t-shirts in official merchandise. Apart
          from these, quirkiest of T-shirts that you wont find on any online
          shopping sites in India are showcased at Bewakoof.com. If your
          wardrobe has been longing for a cool overhaul then bewakoof.com will
          certainly be your best bet amongst all online shopping sites. Also,
          take a tour of our bewakoof® blog to stay abreast with the latest
          runway trends and be a trendsetter among your immediate circles. What
          we wear speaks volumes of us they say. But what if what you wore
          actually spoke what your mood was! Havent we all wondered where we
          could get those quirky t-shirts and sport them with confidence? Sure
          otherwise getting them made or even buying them from otherwise
          expensive online shopping sites for clothes may cost you substantially
          but with Bewakoof.com, you will understand that you do not have to
          spend a fortune on online fashion to look great. Sliders, joggers,
          sweatshirts, bag and bag packs and so much more are just some of the
          other items you can grab hold of here.
          <br />
          <br />
          Avail of Online shopping benefits at Bewakoof.com and youll shop
          nowhere else!
          <br />
          Choose your product, get it ordered online, and we ensure that its
          delivery happens right at your doorstep anywhere in India. You just
          need to take care of the payment for the product from the comfort of
          your home, while we ensure free shipping all the time on almost
          everything with no strings attached. For any second thoughts after
          purchase, we have in place a return policy as well. One of the best
          you will find on any online shopping sites in India. For your online
          shopping experience to be safe and risk-free, we offer Cash On
          Delivery (COD) facility too. So you dont have to worry anymore about
          your hard earned money being stuck when you buy clothes online at
          bewakoof.com. Avail exciting online shopping offers like designs of
          the day and colour of the month when you shop with us. Make sure to
          use our easy 15-day returns policy, card or cash on delivery option
          and other customer-friendly features. A comprehensive sizing guide and
          detailed product descriptions coupled with high-resolution product
          shots will give you all the information to make the right buying
          decision. Give your wardrobe the much-needed upgrade with uber cool
          clothing head to Bewakoof.com for a great online shopping india
          experience now! Could you have asked for more?
          <br />
          <br />
          Dont miss out on accessories available on our multi-faceted online
          store!
          <br />
          We dont just offer you exciting options in online fashion but also
          give you amazing accessories with really cool bags and bag packs to
          choose from. Our bags and backpacks are compact, hassle-free and easy
          to stuff things in. And all of this with the swag that you get to
          carry along with it. Cool designs are what form a major part of our
          online fashion and we also ensure our accessories section doesnt feel
          left out!
          <br />
          <br />
          As for our accessories collection, they are also manufactured with
          impeccable quality materials. Our mobile covers are made from hard and
          durable polycarbonate, with a matte finish that will make for a great
          protection for your phone with the rough use that we put them through
          nowadays.
          <br />
          <br />
          Design of The Day- the coolest feature ever!
          <br />
          Who said good and cool t-shirts have to expensive? We bring newer,
          cooler and more youth oriented designs everyday. Yes! Everyday you get
          a new design to explore and buy. Although all our t-shirts are at an
          extremely affordable price, we decided to slash them down even
          further. But there is a catch. It is only for those designs and these
          exclusive prices are only valid for for a duration of 24 hours!
          Designs refresh every day at 3pm and are valid only for 24 hours. So
          you need to hurry and grab one fast before it ends. Because we believe
          everyone needs to have a fair chance at all of our fresh designs of
          the day.
          <br />
          <br />
          Bewakoof.com: the Uber Cool Online Fashion Store for the Youth
          <br />
          We, at Bewakoof.com, have all that you need to glam up your cool
          quotient. From an extensive range of plus size clothing, casual shirts
          for men and accessories for everyone, we purvey diversity of choices
          in online shopping india platform has to offer under one umbrella. The
          range of apparels like men t-shirts, joggers, sliders, Henley shirts,
          Polo t-shirts, Oxford pants and more provide an array of options for
          the online customer to create a ravishing ensemble from. We try to
          target all kinds of customers and cater to their needs and
          preferences. Communication is the key to our functioning. Your
          Bewakoof® Online fashion Shop has arrived! Do not miss the attractive
          online shopping offers everyday. Work your fashion with the wide range
          of apparels available only one click away! Make a statement with our
          best t-shirts online! Get more, pay less!
          <br />
          <br />
          OUR PHILOSOPHY
          <br />
          We believe in creating the kind of fashion, that makes you stand out
          as they are in line with the latest local and global trends of the
          industry, but also at the same time offer value for money
          functionality, with quality materials and comfortable and flattering
          prints. We try to look into the psyche of our customers, and try to
          get inspired by the conversations and experiences around us while
          creating our graphics, to ensure that they are relatable. We believe
          in constant and consistent innovation to ensure that our fans get
          nothing short of the bets at affordable rates! While most people do
          not know, we do not outsource the manufacturing of our products,
          everything from the conception of the designs to the manufacture and
          the styling that you see on the photographs of the banners and product
          pages of our website all happen in house! We go from yarn to product
          and since we 're vertically integrated and bring fashion from us
          directly to your doorstep without any middlemen that also further
          ensures reliability because for us it is not just about the money but
          about building the trust and credibility in our fans about our brand.
          We also make sure to decrease the impact on environment and are
          building initiatives that will help us with the same, for now by
          optimizing our processes to use only as much as we need from nature,
          rain water harvesting and recycling the water from our RO water
          facility, because we believe that the spirit of Bewakoof® is about
          creating an impact by breaking conventions and having a different
          perspective!
        </p>
      </div>
    </footer>
  );
}
