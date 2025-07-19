import { FaTwitter, FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-white px-4 py-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-y-6 items-start font-light text-sm leading-relaxed text-[var(--text-gray)]">
        <div className="max-w-sm">
          <h3 className="font-bold text-lg mb-4">Mini Commerce</h3>
          <p>
            We are a residential interior design firm located in Portland. Our
            boutique-studio offers more than
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Services</h4>
          <ul className="space-y-4">
            <li>
              <a href="#">Bonus program</a>
            </li>
            <li>
              <a href="#">Gift cards</a>
            </li>
            <li>
              <a href="">Credit and payment</a>
            </li>
            <li>
              <a href="#">Service contracts</a>
            </li>
            <li>
              <a href="">Non-cash account</a>
            </li>
            <li>
              <a href="#">Payment</a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Assistance to the buyer</h4>
          <ul className="space-y-4">
            <li>
              <a href="#">Find an order</a>
            </li>
            <li>
              <a href="#">Terms of delivery</a>
            </li>
            <li>
              <a href="#">Exchange and return of goods</a>
            </li>
            <li>
              <a href="#">Guarantee</a>
            </li>
            <li>
              <a href="#">Frequently asked questions</a>
            </li>
            <li>
              <a href="#">Terms of use of the site</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-6xl mx-auto flex gap-4 mt-8">
        <a href="#" aria-label="Twitter">
          <FaTwitter className="h-5 w-5 text-white hover:text-gray-400" />
        </a>
        <a href="#" aria-label="Facebook">
          <FaFacebookF className="h-5 w-5 text-white hover:text-gray-400" />
        </a>
        <a href="#" aria-label="TikTok">
          <FaTiktok className="h-5 w-5 text-white hover:text-gray-400" />
        </a>
        <a href="#" aria-label="Instagram">
          <FaInstagram className="h-5 w-5 text-white hover:text-gray-400" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
