export const ProductSkeleton = ({ count = 6 }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {Array.from({ length: count }).map((_, index) => (
                <div key={index} className="flex flex-col animate-pulse">

                    {/* Image Container Skeleton */}
                    <div className="w-full h-72 bg-gray-200 rounded-2xl relative mb-3">
                        {/* Heart Button Placeholder */}
                        <div className="absolute top-3 right-3 w-8 h-8 bg-gray-300 rounded-full" />
                    </div>

                    {/* Product Details Skeleton */}
                    <div className="flex flex-col flex-1 justify-between">
                        <div>
                            {/* Product Title Placeholder */}
                            <div className="h-3.5 bg-gray-200 rounded-md w-3/4 mb-2" />
                            {/* Description Line Placeholder */}
                            <div className="h-3 bg-gray-200 rounded-md w-full mb-3" />
                        </div>

                        {/* Price & Action Button Skeleton */}
                        <div className="flex items-center justify-between mt-auto">
                            {/* Price Placeholder */}
                            <div className="h-3.5 bg-gray-200 rounded-md w-16" />
                            {/* "View" Button Placeholder */}
                            <div className="h-7 bg-gray-200 rounded-lg w-16" />
                        </div>
                    </div>

                </div>
            ))}
        </div>
    );
};