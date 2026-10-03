import { Link } from 'react-router';
import {ArrowRight} from 'lucide-react'
import spring1 from '../assets/spring1.jfif'
import spring2 from '../assets/spring2.jfif'

const PromoBanners = () => {
  return (
    <section className="w-full max-w-7xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Banner 1: Spring Sale */}
        <div className="bg-[#f4f1eb] rounded-2xl overflow-hidden flex items-center justify-between flex-wrap p-8 relative min-h-[260px]">
          {/* Text Content */}
          <div className="z-10 max-w-[45%] w-full">
            <span className="text-[10px] uppercase tracking-widest text-[#6c5d53] font-semibold block mb-2">
              Limited Time Offer
            </span>
            <h3 className="text-2xl font-serif font-bold text-[#4a3b32] mb-4 leading-tight">
              Spring Sale <br /> Up to 50% Off
            </h3>
            <Link
              to="/shop"
              className="max-w-[70%] inline-flex flex-wrap items-center gap-2 bg-[#1a1a1a] text-white text-xs font-medium px-5 py-2.5 rounded-lg hover:bg-black transition-colors"
            >
              Shop The Sale
              <ArrowRight />
            </Link>
          </div>

          {/* Image Container (Positioned to the right) */}
          <div className="flex absolute right-0 bottom-0 h-full w-[55%]  items-end justify-end">
            <img 
              src={spring1} 
              alt="Spring Sale" 
              className="h-full w-full object-cover object-top"
            />
          </div>
        </div>

        {/* Banner 2: Fresh Styles */}
        <div className="bg-[#f4f1eb] rounded-2xl overflow-hidden flex items-center justify-between p-8 relative min-h-[260px]">
          {/* Text Content */}
          <div className="z-10 max-w-[45%] w-full">
            <span className="text-[10px] uppercase tracking-widest text-[#6c5d53] font-semibold block mb-2">
              New Arrivals
            </span>
            <h3 className="text-2xl font-serif font-bold text-[#4a3b32] mb-4 leading-tight">
              Fresh Styles <br /> Just Landed
            </h3>
            <Link
              to="/shop"
              className="max-w-[70%] inline-flex items-center gap-2 bg-[#1a1a1a] text-white text-xs font-medium px-5 py-2.5 rounded-lg hover:bg-black transition-colors"
            >
              Explore New In 
              <ArrowRight />
            </Link>
          </div>

          {/* Image Container (Positioned to the right) */}
          <div className="flex absolute right-0 bottom-0 h-full w-[55%] items-end justify-end">
            <img 
              src={spring2} 
              alt="Fresh Styles" 
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default PromoBanners;