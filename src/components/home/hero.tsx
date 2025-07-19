import Image from "next/image";
import { Button } from "../ui";

const Hero = () => {
  return (
    <section className="bg-[var(--bg-hero)] text-white px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-center gap-10 md:gap-32">
        <div className="text-center md:text-left max-w-2xl mt-20">
          <p className="text-2xl font-semibold text-[var(--text-secondary)]">
            Pro.Beyond.
          </p>
          <h1 className="text-6xl md:text-8xl font-light leading-tight">
            IPhone 14 <span className="font-bold">Pro</span>
          </h1>
          <p className="mt-2 text-lg text-[var(--text-secondary)]">
            Created to change everything for the better. For everyone.
          </p>

          <Button
            variant="outline"
            size={"lg"}
            className="mt-6 text-lg font-semibold rounded-md text-white border border-white hover:bg-white hover:text-black transition-colors"
          >
            Shop Now
          </Button>
        </div>

        <div>
          <Image
            src="/images/hero-iphone.png"
            alt="iPhone 14 Pro"
            width={400}
            height={400}
            className="mt-8"
          />
        </div>
      </div>
    </section>
  );
};
export default Hero;
