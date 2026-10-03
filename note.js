import React, { useEffect, useState } from 'react';
import { Users, Package, ShoppingCart, DollarSign } from 'lucide-react';

interface DashboardData {
    totalRevenue: number;
    orderCount: number;
    productCount: number;
    activeUser: number;
    chartData: { day: string; revenue: number }[];
}

const AdminDashboard = () => 

    

    return (
        <div className="">
            {/* Header */}
            

            {/* Top Metric Cards Grid */}
            

            {/* Revenue Trend Chart Section */}
            <div className="bg-bg-card border border-border-color rounded-2xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-text-primary mb-6">
                    Revenue Trend (Last 7 Days)
                </h3>

                <div className="h-72 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data?.chartData || []} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E5E5" />
                            <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#171717', fontSize: 12 }} />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#171717', fontSize: 12 }}
                                tickFormatter={(value) => `$${value}`}
                            />
                            <Tooltip
                                cursor={{ fill: '#F0EDE6' }}
                                contentStyle={{
                                    backgroundColor: '#FFFFFF',
                                    borderColor: '#E5E5E5',
                                    borderRadius: '12px',
                                    color: '#171717',
                                }}
                                formatter={(value: number) => [`$${value}`, 'Revenue']}
                            />
                            <Bar dataKey="revenue" fill="#ff6b00" radius={[8, 8, 0, 0]} barSize={36} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;