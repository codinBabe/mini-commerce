import { Button } from "../ui";

const SaleBanner = () => {
  return (
    <section
      className="sale-banner relative text-white py-20 overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/sale-banner.png')" }}
    >
      {/* Main Text Content */}
      <div className="relative z-10 max-w-2xl mx-auto text-center px-6">
        <h2 className="text-5xl md:text-7xl font-light mb-4 leading-relaxed">
          Big Summer <span className="font-bold">Sale</span>
        </h2>
        <p className="text-[var(--text-secondary)] mb-8">
          Commodo fames vitae vitae leo mauris in. Eu consequat.
        </p>
        <Button
          variant="outline"
          className="px-8 py-3 border-white text-white hover:bg-white hover:text-black"
        >
          Shop Now
        </Button>
      </div>
    </section>
  );
};

export default SaleBanner;
