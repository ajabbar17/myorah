"use client";
import Image from "next/image";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="relative h-[500px] md:h-[600px] flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/hero.jpg"
          alt="Hero Background"
          layout="fill"
          objectFit="cover"
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/45" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white">
        <h1 className="text-2xl md:text-6xl font-semibold">
          Browse our latest products
        </h1>
        <Link href="/collections/all">
          <button className="mt-4 border border-white px-6 py-2 text-white hover:bg-white hover:text-black transition">
            Shop all
          </button>
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
