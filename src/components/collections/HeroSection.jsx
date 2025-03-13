import Image from "next/image";
import Link from "next/link";

const HeroSection = ({ url, title }) => {
  return (
    <section className="relative h-[300px] md:h-[400px] w-full overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/45" />
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center justify-center z-10">
        <h1 className="text-2xl md:text-5xl font-semibold text-white px-4 text-center">
          {title}
        </h1>
      </div>
    </section>
  );
};

export default HeroSection;
