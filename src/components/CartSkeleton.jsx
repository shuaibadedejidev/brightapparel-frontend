export const CartSkeleton = () => {
    return (
        <div className="w-full max-w-7xl mx-auto px-6 py-5 animate-pulse">
            {/* Top Nav Back Skeleton */}
            <div className="flex items-center gap-2 mb-2 py-3">
                <div className="h-4 w-16 bg-[#e2ddd5] rounded" />
            </div>

            {/* Header Skeleton */}
            <div className="h-8 w-40 bg-[#e2ddd5] rounded-md mb-6" />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Cart Items List Skeleton */}
                <div className="lg:col-span-2 bg-[#f4f1eb] rounded-2xl p-6 md:p-8 shadow-md">
                    {/* Header row */}
                    <div className="pb-4 border-b border-[#e2ddd5] mb-6">
                        <div className="h-4 w-32 bg-[#e2ddd5] rounded" />
                    </div>

                    {/* Cart Item Skeleton Cards (renders 3 placeholder rows) */}
                    <div className="divide-y divide-[#e2ddd5]">
                        {[1, 2, 3].map((index) => (
                            <div
                                key={index}
                                className="py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                            >
                                {/* Product details block */}
                                <div className="flex items-center gap-4">
                                    <div className="w-20 h-20 rounded-xl bg-[#e2ddd5] shrink-0" />
                                    <div className="space-y-2">
                                        <div className="h-4 w-44 bg-[#e2ddd5] rounded" />
                                        <div className="h-3 w-28 bg-[#e2ddd5] rounded" />
                                        <div className="h-4 w-20 bg-[#e2ddd5] rounded" />
                                    </div>
                                </div>

                                {/* Quantity and Action buttons block */}
                                <div className="flex items-center justify-between w-full sm:w-auto gap-6">
                                    <div className="h-9 w-24 bg-[#e2ddd5] rounded-lg" />
                                    <div className="h-5 w-5 bg-[#e2ddd5] rounded" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Column: Order Summary Skeleton */}
                <div className="space-y-6">
                    {/* Coupons Box Skeleton */}
                    <div className="bg-[#f4f1eb] rounded-2xl p-6 shadow-md">
                        <div className="h-3 w-20 bg-[#e2ddd5] rounded mb-4" />
                        <div className="flex gap-2">
                            <div className="flex-1 h-9 bg-[#e2ddd5] rounded-lg" />
                            <div className="h-9 w-24 bg-[#e2ddd5] rounded-lg" />
                        </div>
                    </div>

                    {/* Order Summary Box Skeleton */}
                    <div className="bg-[#f4f1eb] rounded-2xl p-6 shadow-md">
                        <div className="h-3 w-28 bg-[#e2ddd5] rounded mb-4 pb-3 border-b border-[#e2ddd5]" />

                        <div className="space-y-4 mb-6">
                            <div className="flex justify-between">
                                <div className="h-3 w-16 bg-[#e2ddd5] rounded" />
                                <div className="h-3 w-12 bg-[#e2ddd5] rounded" />
                            </div>

                            <div className="pt-2 border-t border-[#e2ddd5] space-y-2">
                                <div className="h-3 w-24 bg-[#e2ddd5] rounded mb-2" />
                                <div className="flex justify-between items-center">
                                    <div className="h-3 w-20 bg-[#e2ddd5] rounded" />
                                    <div className="h-3 w-10 bg-[#e2ddd5] rounded" />
                                </div>
                                <div className="h-3 w-24 bg-[#e2ddd5] rounded" />
                            </div>

                            <div className="flex justify-between pt-2">
                                <div className="h-3 w-28 bg-[#e2ddd5] rounded" />
                                <div className="h-3 w-10 bg-[#e2ddd5] rounded" />
                            </div>
                        </div>

                        {/* Total Payable divider & amount */}
                        <div className="flex justify-between items-center pt-4 border-t border-[#e2ddd5] mb-6">
                            <div className="h-4 w-28 bg-[#e2ddd5] rounded" />
                            <div className="h-5 w-16 bg-[#e2ddd5] rounded" />
                        </div>

                        {/* Checkout Button Skeleton */}
                        <div className="w-full h-12 bg-[#e2ddd5] rounded-xl" />
                    </div>
                </div>
            </div>
        </div>
    );
};