export const ProductDetailSkeleton = () => {
    return (
        <div className="w-full max-w-5xl mx-auto px-4 md:px-6 py-8 text-[#111111] animate-pulse">

            {/* Breadcrumb Skeleton */}
            <div className="flex items-center gap-2 mb-8">
                <div className="h-3 bg-gray-200 rounded w-12" />
                <span className="text-gray-300">/</span>
                <div className="h-3 bg-gray-200 rounded w-12" />
                <span className="text-gray-300">/</span>
                <div className="h-3 bg-gray-200 rounded w-28" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">

                {/* Left Column: Image Gallery Skeleton */}
                <div className="space-y-4">
                    {/* Main Display Image Skeleton */}
                    <div className="w-full h-[450px] md:h-[550px] rounded-2xl bg-gray-200" />

                    {/* Thumbnail Selectors Skeleton */}
                    <div className="flex items-center gap-4">
                        {Array.from({ length: 4 }).map((_, idx) => (
                            <div key={idx} className="w-20 h-20 rounded-xl bg-gray-200 shrink-0" />
                        ))}
                    </div>
                </div>

                {/* Right Column: Product Info & Actions Skeleton */}
                <div className="flex flex-col justify-start">

                    {/* Category Pill */}
                    <div className="h-5 bg-gray-200 rounded-full w-20 mb-3" />

                    {/* Title */}
                    <div className="h-8 bg-gray-200 rounded-md w-3/4 mb-3" />

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-4">
                        <div className="h-3.5 bg-gray-200 rounded w-24" />
                        <div className="h-3 bg-gray-200 rounded w-8" />
                        <div className="h-3 bg-gray-200 rounded w-16" />
                    </div>

                    {/* Price */}
                    <div className="flex items-center gap-3 mb-6 pb-6 border-b border-[#e2ddd5]">
                        <div className="h-7 bg-gray-200 rounded-md w-20" />
                        <div className="h-5 bg-gray-200 rounded-md w-14" />
                        <div className="h-4 bg-gray-200 rounded w-16" />
                    </div>

                    {/* Description Paragraph */}
                    <div className="space-y-2 mb-6">
                        <div className="h-3 bg-gray-200 rounded w-full" />
                        <div className="h-3 bg-gray-200 rounded w-full" />
                        <div className="h-3 bg-gray-200 rounded w-2/3" />
                    </div>

                    {/* Color Selector */}
                    <div className="mb-6">
                        <div className="h-3.5 bg-gray-200 rounded w-24 mb-2" />
                        <div className="flex items-center gap-3">
                            {Array.from({ length: 4 }).map((_, idx) => (
                                <div key={idx} className="w-7 h-7 rounded-full bg-gray-200 shrink-0" />
                            ))}
                        </div>
                    </div>

                    {/* Size Selector */}
                    <div className="mb-6">
                        <div className="flex justify-between items-center mb-2">
                            <div className="h-3.5 bg-gray-200 rounded w-20" />
                            <div className="h-3 bg-gray-200 rounded w-16" />
                        </div>
                        <div className="flex items-center gap-3">
                            {Array.from({ length: 4 }).map((_, idx) => (
                                <div key={idx} className="w-10 h-10 rounded-xl bg-gray-200 shrink-0" />
                            ))}
                        </div>
                    </div>

                    {/* Quantity & Add to Cart */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-8 pb-8 border-b border-[#e2ddd5]">
                        <div className="h-11 bg-gray-200 rounded-xl w-28 shrink-0" />
                        <div className="h-11 bg-gray-200 rounded-xl flex-1" />
                    </div>

                    {/* Perks / Features */}
                    <div className="grid grid-cols-3 gap-4 text-center">
                        {Array.from({ length: 3 }).map((_, idx) => (
                            <div key={idx} className="bg-gray-200 rounded-xl h-20 flex flex-col items-center justify-center" />
                        ))}
                    </div>

                </div>

            </div>
        </div>
    );
};