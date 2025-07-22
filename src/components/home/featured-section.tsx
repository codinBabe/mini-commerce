import Image from "next/image";
import { Button } from "../ui";

const FeaturedSection = () => {
  return (
    <section>
      <div className="mb-10">
        <div className="grid-areas-featured">
          {/* Apple AirPods Max */}
          <div className="bg-[var(--bg-secondary)] text-[var(--text-primary)] px-4 py-10 md:px-0 flex flex-col md:flex-row items-center md:text-left justify-center md:gap-8 text-center md:area-airpods md:row-start-2 md:col-start-1">
            <Image
              src="/images/apple-airpod-max-mobile.png"
              alt="Apple AirPods Max"
              width={200}
              height={200}
              className="md:hidden object-contain"
            />
            <Image
              src="/images/apple-airpod-max.png"
              alt="Apple AirPods Max"
              width={200}
              height={200}
              className="hidden md:block object-contain"
            />
            <div>
              <h2 className="text-2xl md:text-3xl mb-2 font-light">
                Apple AirPods <span className="font-bold">Max</span>
              </h2>
              <p className="text-[var(--text-secondary)] max-w-sm">
                Computational audio. Listen, it&apos;s powerful
              </p>
            </div>
          </div>

          {/* Apple Vision Pro */}
          <div className="bg-[var(--gray-600)] text-[var(--color-white)] px-4 py-10 md:px-0 flex flex-col md:flex-row items-center justify-center md:gap-8 text-center md:text-left md:area-vision md:col-start-2 md:row-start-2">
            <Image
              src="/images/apple-vision-pro-mobile.png"
              alt="Apple Vision Pro"
              width={200}
              height={200}
              className="md:hidden object-contain"
            />
            <Image
              src="/images/apple-vision-pro.png"
              alt="Apple Vision Pro"
              width={200}
              height={200}
              className="hidden md:block object-contain"
            />
            <div>
              <h2 className="text-2xl md:text-3xl mb-2 font-light">
                Apple Vision <span className="font-bold">Pro</span>
              </h2>
              <p className="text-[var(--text-secondary)] max-w-sm">
                An immersive way to experience entertainment
              </p>
            </div>
          </div>

          {/* Playstation 5 */}
          <div className="bg-[var(--white)] text-[var(--text-primary)] px-4 py-10 md:px-0 flex flex-col md:flex-row items-center justify-center md:gap-8 text-center md:text-left md:area-ps5 md:col-start-1 md:row-start-1 md:col-span-2">
            <Image
              src="/images/play-station-5-mobile.png"
              alt="Playstation 5"
              width={250}
              height={250}
              className="object-contain"
            />
            <div>
              <h2 className="text-3xl  md:text-5xl mb-2 font-light">
                Playstation <span className="font-bold">5</span>
              </h2>
              <p className="text-[var(--text-secondary)] max-w-sm">
                Incredibly powerful CPUs, GPUs, and an SSD with integrated I/O
                will redefine your PlayStation experience.
              </p>
            </div>
          </div>

          {/* MacBook Air - spans two rows and 2 columns */}
          <div className="bg-[var(--bg-secondary)] text-[var(--text-primary)] px-4 py-10 md:px-0 flex flex-col md:flex-row-reverse items-center justify-center md:gap-8 text-center md:text-left md:area-macbook md:col-start-3 md:row-span-2 md:col-span-2">
            <Image
              src="/images/macbook-air-mobile.png"
              alt="Macbook Air"
              width={300}
              height={300}
              className="md:hidden object-contain"
            />
            <Image
              src="/images/macbook-air.png"
              alt="Macbook Air"
              width={300}
              height={300}
              className="hidden md:block object-contain"
            />
            <div className="md:ml-10">
              <h2 className="text-3xl md:text-6xl mb-2 font-light">
                Macbook <span className="font-bold">Air</span>
              </h2>
              <p className="text-[var(--text-secondary)] max-w-md mb-4">
                The new 15‑inch MacBook Air makes room for more of what you love
                with a spacious Liquid Retina display.
              </p>
              <Button
                variant="outline"
                size="lg"
                className="w-full md:w-auto rounded-md"
              >
                Shop Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
