import {ArrowRight} from 'lucide-react'
import { Link } from 'react-router';

const Footer = () => {
  return (
    <footer className="w-full bg-[#111111] text-white pt-16 pb-12 px-6 mt-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-10 mb-12">
        
        {/* Brand Column */}
        <div className="md:col-span-1 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-serif font-bold tracking-widest mb-3">BRIGHT</h3>
            <p className="text-xs text-gray-400 leading-relaxed mb-6">
              Timeless fashion for every moment. Designed with you in mind.
            </p>
          </div>
          {/* Social Icons using Inline SVGs */}
          <div className="flex items-center space-x-4 text-gray-400">
            {/* Instagram */}
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            {/* Facebook */}
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.375 14.5 5 15.5 5H18V0h-3.808C10.5 0 9 1.5 9 4.615V8z"/>
              </svg>
            </a>
            {/* Twitter / X */}
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Shop Links */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-300 mb-4">Shop</h4>
          <ul className="space-y-2.5 text-xs text-gray-400">
            <li><Link to="/shop" className="hover:text-white transition-colors">All Products</Link></li>
            <li><Link to="/shop?sort=newest" className="hover:text-white transition-colors">New Arrivals</Link></li>
            <li><Link to="/shop?category=women" className="hover:text-white transition-colors">Women</Link></li>
            <li><Link to="/shop?category=men" className="hover:text-white transition-colors">Men</Link></li>
            <li><Link to="/shop?sale=true" className="hover:text-white transition-colors">Sale</Link></li>
          </ul>
        </div>

        {/* Customer Care */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-300 mb-4">Customer Care</h4>
          <ul className="space-y-2.5 text-xs text-gray-400">
            <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
            <li><Link to="/shipping" className="hover:text-white transition-colors">Shipping & Delivery</Link></li>
            <li><Link to="/returns" className="hover:text-white transition-colors">Returns & Exchanges</Link></li>
            <li><Link to="/size-guide" className="hover:text-white transition-colors">Size Guide</Link></li>
            <li><Link to="/faqs" className="hover:text-white transition-colors">FAQs</Link></li>
          </ul>
        </div>

        {/* About Us */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-300 mb-4">About Us</h4>
          <ul className="space-y-2.5 text-xs text-gray-400">
            <li><Link to="/about" className="hover:text-white transition-colors">Our Story</Link></li>
            <li><Link to="/sustainability" className="hover:text-white transition-colors">Sustainability</Link></li>
            <li><Link to="/careers" className="hover:text-white transition-colors">Careers</Link></li>
            <li><Link to="/press" className="hover:text-white transition-colors">Press</Link></li>
            <li><Link to="/store-locator" className="hover:text-white transition-colors">Store Locator</Link></li>
          </ul>
        </div>

        {/* Stay Connected (Footer Mini Form) */}
        <div className="md:col-span-1">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-300 mb-4">Stay Connected</h4>
          <p className="text-xs text-gray-400 mb-4 leading-relaxed">
            Sign up for updates and get 10% off your first order.
          </p>
          <form onSubmit={(e) => e.preventDefault()} className="flex items-center bg-white rounded-lg overflow-hidden p-1">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="w-full px-2 py-1.5 text-xs text-black focus:outline-none"
            />
            <button type="submit" className="bg-black text-white p-2 rounded-md hover:bg-gray-800 transition-colors">
              <ArrowRight />
            </button>
          </form>
        </div>

      </div>

      {/* Bottom Copyright */}
      <div className="max-w-7xl mx-auto pt-8 border-t border-gray-800 text-center text-[11px] text-gray-500">
        &copy; {new Date().getFullYear()} Bright Tech. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;