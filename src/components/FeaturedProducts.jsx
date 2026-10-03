import { useEffect } from 'react';
import { Link } from 'react-router';
import useProductStore from '../store/useProductStore';

const FeaturedProducts = () => {
  const { isFetchingFeaturedProducts, featuredProducts, fetchFeaturedProducts } = useProductStore();
  const products = featuredProducts?.slice(0, 4) || [];

  // Trigger the fetch on component mount
  useEffect(() => {
    if (fetchFeaturedProducts) {
      fetchFeaturedProducts();
    }
  }, [fetchFeaturedProducts]);

  return (
    <section className="w-full max-w-7xl mx-auto px-6 py-12">
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-2">
        <div>
          <h2 className="text-2xl font-semibold text-[#4a3b32] font-serif">
            Featured Items
          </h2>
          <p className="text-sm text-[#6c5d53] mt-1">
            Curated minimal staples for daily rotation
          </p>
        </div>
        <Link
          to="/shop"
          className="text-sm font-medium text-[#4a3b32] underline underline-offset-4 hover:text-black transition-colors self-start sm:self-auto"
        >
          View All Products
        </Link>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {isFetchingFeaturedProducts ? (
          /* Loading Skeleton Items */
          Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="flex flex-col animate-pulse">
              <div className="bg-gray-200 rounded-2xl aspect-square w-full mb-4" />
              <div className="h-4 bg-gray-200 rounded-md w-3/4 mb-2" />
              <div className="h-4 bg-gray-200 rounded-md w-1/3 mb-2" />
              <div className="h-4 bg-gray-200 rounded-md w-24 mt-auto" />
            </div>
          ))
        ) : (
          /* Product Cards */
          products.map((product) => {
            // Safe fallback image handling (supports string array or image objects)
            const productImage =
              typeof product.images === 'string'
                ? product.images
                : product.images?.[0]?.url || product.images?.[0] || product.image;

            return (
              <div key={product.id} className="group flex flex-col">
                <Link
                  to={`/details/${product?.id}`}
                  className="bg-[#e9e4dc] rounded-2xl overflow-hidden aspect-square flex items-center justify-center mb-4 relative"
                >
                  <img
                    src={productImage}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </Link>

                {/* Product Meta Data */}
                <Link
                  to={`/details/${product?.id}`}
                  className="text-base font-medium text-[#4a3b32] hover:underline mb-1"
                >
                  {product.name}
                </Link>

                <p className="text-sm font-semibold text-text-primary mb-1">
                  $ {(product.price / 100).toFixed(2)} USD
                </p>

                <div className="mt-auto pt-2">
                  <Link
                    to={`/details/${product?.id}`}
                    className="text-sm font-medium text-accent flex items-center gap-1 hover:text-accent-20 transition-colors"
                  >
                    Add to Cart <span className="text-xs">&gt;</span>
                  </Link>
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;