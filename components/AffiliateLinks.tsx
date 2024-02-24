"use client";

import LinksCarousel from "@/components/LinksCarousel";

export default function AffiliateLinks() {
  return (
    <div className="w-full py-12 mt-12">
      <div className="max-w-6xl mx-auto">
        <div>
          <div className="pb-12 max-w-xl mx-auto text-center space-y-4">
            <h3 className="text-xl md:text-2xl font-bold balanced">
              Are you starting to feel the irresistable urge to build?
            </h3>
            <p className="text-lg md:text-xl font-medium balanced">
              We know that feeling! Consider purchasing some of our favorite
              sets. By using our affiliate links you help support this site.{" "}
            </p>
          </div>
          <div className='px-12'>
            <LinksCarousel />
          </div>
        </div>
      </div>
    </div>
  );
}
