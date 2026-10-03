import { Link } from 'react-router';
import { useState } from 'react';
import { LogOut, Menu, ShoppingBag, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import useUserStore from '../store/useUserStore';
import useCartStore from '../store/useCartStore';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { user, logout } = useUserStore();
  const { cartItems } = useCartStore();

  function handleOpen() {
    setIsOpen(!isOpen);
  }

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="w-full bg-main-bg border-b border-[#e2ddd5] px-6 py-4 flex items-center justify-between sticky top-0 z-50"
    >
      {/* Logo */}
      <div className="flex items-center">
        <Link to="/" className="text-2xl font-serif tracking-wide text-[#4a3b32] font-semibold">
          BRIGHT
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="hidden md:flex items-center space-x-8">
        <Link to="/" className="text-sm font-semibold text-[#6c5d53] hover:text-[#2d241e] transition-colors">
          Home
        </Link>
        <Link to="/shop" className="text-sm font-semibold text-[#6c5d53] hover:text-[#2d241e] transition-colors">
          Shop
        </Link>
        <Link to="/about" className="text-sm font-semibold text-[#6c5d53] hover:text-[#2d241e] transition-colors">
          About us
        </Link>
        <Link to="/contact" className="text-sm font-semibold text-[#6c5d53] hover:text-[#2d241e] transition-colors">
          Contact us
        </Link>
      </nav>

      {/* Utility Icons */}
      <div className="flex items-center space-x-4 text-[#6c5d53]">
        {user && (
          <>
            <Link to="/cart" aria-label="Shopping Cart" className="hover:text-[#2d241e] transition-colors relative">
              <ShoppingBag size={20} />
              {cartItems?.length > 0 && (
                <motion.span
                  key={cartItems?.length}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 25 }}
                  className='bg-accent absolute rounded-full px-1.5 text-sm text-white top-1 left-1 transition-transform -translate-y-3 translate-x-1'
                >
                  {cartItems?.length}
                </motion.span>
              )}
            </Link>
            <Link to="/order-history" aria-label="User Account" className="hover:text-[#2d241e] transition-colors">
              <User size={20} />
            </Link>
            <LogOut size={20} className='cursor-pointer hover:text-[#2d241e]' onClick={logout} />
          </>
        )}

        {/* Admin Panel Link */}
        {user && user?.role === 'ADMIN' && (
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link
              to="/admin"
              className="bg-accent px-2.5 py-1.5 rounded-xl text-sm text-white hover:bg-accent/80 block"
            >
              Admin Panel
            </Link>
          </motion.div>
        )}

        {!user && (
          <>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link to='/signup' className='bg-accent px-2.5 py-1.5 rounded-xl text-sm text-white hover:bg-accent/80 block'>
                Sign up
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link to='/login' className='border px-3 py-1.5 rounded-xl text-sm text-accent hover:bg-gray-100 block'>
                Login
              </Link>
            </motion.div>
          </>
        )}

        <Menu onClick={handleOpen} className="md:hidden cursor-pointer" />

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {isOpen && (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="flex flex-col px-6 space-y-6 absolute top-full left-0 w-full bg-[#f4f1eb] border-t border-[#e2ddd5] py-4 md:hidden overflow-hidden shadow-lg"
              onClick={handleOpen}
            >
              <Link to="/" className="text-sm font-semibold text-[#6c5d53] hover:text-[#2d241e] transition-colors">
                Home
              </Link>
              <Link to="/shop" className="text-sm font-semibold text-[#6c5d53] hover:text-[#2d241e] transition-colors">
                Shop
              </Link>
              <Link to="/about" className="text-sm font-semibold text-[#6c5d53] hover:text-[#2d241e] transition-colors">
                About us
              </Link>
              <Link to="/contact" className="text-sm font-semibold text-[#6c5d53] hover:text-[#2d241e] transition-colors">
                Contact us
              </Link>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;