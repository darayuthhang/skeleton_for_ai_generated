"use client";
import React from "react";
import Link from "next/link";

const marketAppObject = [
    {
        text: "Boost your sale by adding testimonials",
        url: "https://testimonial.to/?via=darayuth",
        hightLightText: "Testimonials",
      },
  {
    text: "Get an app like mine in a day, not a month with",
    url: "https://shipfa.st/?via=darayuth",
    hightLightText: "#1 Next.js boilerplate code.",
  },
  {
    text: "Get professional business headshots in minutes.",
    url: "https://www.headshotpro.com?via=darayuth",
    hightLightText: "Headshotpro",
  },
  // Add more objects here if needed
];

const MarketingApp = () => {
  return (
    <section className="mt-4 mb-3 p-4">
      <div className="flex justify-center">
        <div className="card border-dashed border-2 border-indigo-600 md:max-w-2xl bg-orange-100 text-primary-content">
          <div className="card-body p-4 text-black">
            <h2 className="card-title">Check this out. These might help you.</h2>
            {marketAppObject.map((item, index) => (
              <div key={index} className="mt-2">
                {index + 1}.{" "}
                <Link
                  href={item.url}
                  className="ml-2  underline"
                  target="_blank"
                >
                  {item.text.includes("Shipfast") ? "Shipfast" : item.text.includes("InvoiceSonic") ? "InvoiceSonic" : "Link"}:
                </Link>
                <span className="ml-2">
                  {item.text}
                  <Link
                    target="_blank"
                    href={item.url}
                    className="ml-2 underline font-bold text-indigo-600 md:text-xl"
                  >
                    {item.hightLightText}
                  </Link>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketingApp;
