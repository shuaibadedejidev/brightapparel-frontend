export default function DashboardSkeleton() {
    return (
        <div className="min-h-screen bg-main-bg animate-pulse">
            {/* HEADER SKELETON */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <div>
                    <div className="h-9 w-64 bg-gray-300/40 dark:bg-gray-700/40 rounded-lg mb-2" />
                    <div className="h-4 w-48 bg-gray-300/30 dark:bg-gray-700/30 rounded" />
                </div>
                <div className="h-9 w-32 bg-gray-300/40 dark:bg-gray-700/40 rounded-xl" />
            </div>

            {/* STAT CARDS SKELETON */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {[...Array(4)].map((_, idx) => (
                    <div
                        key={idx}
                        className="bg-bg-card border border-border-color rounded-2xl p-5 shadow-sm flex flex-col justify-between h-[130px]"
                    >
                        <div className="flex items-center justify-between mb-3">
                            <div className="h-4 w-24 bg-gray-300/40 dark:bg-gray-700/40 rounded" />
                            <div className="w-9 h-9 rounded-xl bg-gray-300/40 dark:bg-gray-700/40" />
                        </div>
                        <div>
                            <div className="h-7 w-28 bg-gray-300/40 dark:bg-gray-700/40 rounded-md mb-2" />
                            <div className="h-5 w-16 bg-gray-300/30 dark:bg-gray-700/30 rounded-md" />
                        </div>
                    </div>
                ))}
            </div>

            {/* CHART SKELETON */}
            <div className="bg-bg-card border border-border-color rounded-2xl p-6 mb-8 shadow-sm h-[320px] flex flex-col justify-between">
                <div className="flex justify-between items-center mb-6">
                    <div className="h-6 w-36 bg-gray-300/40 dark:bg-gray-700/40 rounded" />
                    <div className="h-8 w-24 bg-gray-300/30 dark:bg-gray-700/30 rounded-lg" />
                </div>
                {/* Mock Chart Bars */}
                <div className="flex items-end justify-between gap-2 h-48 pt-4">
                    {[40, 70, 45, 90, 60, 80, 50, 65, 85, 40, 75, 95].map((height, i) => (
                        <div
                            key={i}
                            className="w-full bg-gray-300/30 dark:bg-gray-700/30 rounded-t"
                            style={{ height: `${height}%` }}
                        />
                    ))}
                </div>
            </div>

            {/* BOTTOM SECTION */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 my-8">
                {/* TOP SELLING PRODUCTS SKELETON */}
                <div className="bg-bg-card border border-border-color p-6 rounded-2xl shadow-sm">
                    <div className="h-6 w-44 bg-gray-300/40 dark:bg-gray-700/40 rounded mb-6" />

                    <div className="space-y-4">
                        {[...Array(4)].map((_, i) => (
                            <div
                                key={i}
                                className="flex items-center justify-between p-4 bg-main-bg/50 border border-border-color rounded-xl"
                            >
                                <div className="space-y-2">
                                    <div className="h-4 w-28 bg-gray-300/40 dark:bg-gray-700/40 rounded" />
                                    <div className="h-3 w-16 bg-gray-300/30 dark:bg-gray-700/30 rounded" />
                                </div>
                                <div className="h-5 w-20 bg-gray-300/40 dark:bg-gray-700/40 rounded" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* RECENT ORDERS TABLE SKELETON */}
                <div className="lg:col-span-2 bg-bg-card border border-border-color rounded-2xl shadow-sm overflow-hidden flex flex-col justify-between">
                    <div>
                        <div className="flex items-center justify-between p-6 border-b border-border-color">
                            <div className="h-6 w-32 bg-gray-300/40 dark:bg-gray-700/40 rounded" />
                            <div className="h-4 w-16 bg-gray-300/30 dark:bg-gray-700/30 rounded" />
                        </div>

                        <div className="p-4 space-y-4">
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="flex items-center justify-between py-2 border-b border-border-color/40 last:border-none">
                                    <div className="h-4 w-20 bg-gray-300/40 dark:bg-gray-700/40 rounded" />
                                    <div className="h-4 w-28 bg-gray-300/40 dark:bg-gray-700/40 rounded" />
                                    <div className="h-4 w-16 bg-gray-300/40 dark:bg-gray-700/40 rounded" />
                                    <div className="h-6 w-20 bg-gray-300/30 dark:bg-gray-700/30 rounded-full" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}