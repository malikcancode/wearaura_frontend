import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-[#5A463A] text-white py-10 px-6 md:px-20">
      <div className="grid gap-10 md:grid-cols-4 w-full">
        {/* <div className="flex flex-col items-start">
          <img
            className="w-40 object-contain mb-2"
            src="/svg.png"
            alt="Brand Logo"
          />
        </div> */}

        <div>
          <h4 className="mb-2 font-semibold text-lg">About Us</h4>
          <ul className="space-y-2 text-sm text-zinc-200">
            <li>
              <Link to="#">Our Story</Link>
            </li>
            <li>
              <Link to="#">Influencers</Link>
            </li>
            <li>
              <Link to="#">Careers</Link>
            </li>
            <li>
              <Link to="#">Join Our Team</Link>
            </li>
            <li>
              <Link to="#">Terms & Conditions</Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-2 font-semibold text-lg">Quick Links</h4>
          <ul className="space-y-2 text-sm text-zinc-200">
            <li>
              <Link to="#">About Us</Link>
            </li>
            <li>
              <Link to="#">Shipping & Returns</Link>
            </li>
            <li>
              <Link to="#">Size Guide</Link>
            </li>
            <li>
              <Link to="#">FAQs</Link>
            </li>
            <li>
              <Link to="#">Privacy Policy</Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-2 font-semibold text-lg">Our Products</h4>
          <ul className="space-y-2 text-sm text-zinc-200">
            <li>
              <Link to="#">Shirts</Link>
            </li>
            <li>
              <Link to="#">Shoes</Link>
            </li>
            <li>
              <Link to="#">Glasses</Link>
            </li>
            <li>
              <Link to="#">Accessories</Link>
            </li>
            <li>
              <Link to="#">New Arrivals</Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-2 font-semibold text-lg">Join Our Newsletter</h4>
          <p className="text-xs mb-3 capitalize text-zinc-300">
            Sign up to hear about our latest sales, new arrivals & more.
          </p>
          <input
            type="email"
            placeholder="Enter your email"
            className="p-2 px-4 w-full bg-transparent border border-white rounded-full text-white placeholder:text-sm placeholder:text-zinc-300 focus:outline-none"
          />
          <button className="mt-3 bg-[#8b6146] hover:bg-[#7a5440] cursor-pointer transition px-6 py-2 rounded-full text-white font-semibold w-full">
            Subscribe
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
