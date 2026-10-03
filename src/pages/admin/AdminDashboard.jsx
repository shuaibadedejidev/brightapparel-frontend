import adminStore from "../../store/useAdminStore";
import formatCurrency from "../../lib/formatCurrency";
import { useEffect } from "react";
import { Users, Package, ShoppingCart, DollarSign, PlusIcon } from 'lucide-react';
import AdminChart from "../../components/AdminChart";
import DashboardSkeleton from "../../components/DashboardSkeleton";
import { Link } from "react-router";

export default function AdminDashboard() {
    const { dashboardData, fecthAdminDashbaord, isFetching } =  adminStore()

    let stats = [];

    useEffect(() => {
        fecthAdminDashbaord()
    }, [fecthAdminDashbaord])

    if (dashboardData) {
        stats = [
            {
                title: 'Total Revenue',
                value: formatCurrency(dashboardData.totalRevenue),
                badge: '+12.5%',
                icon: <DollarSign size={20} className="text-accent" />,
            },
            {
                title: 'Orders',
                value: dashboardData?.orderCount || 0,
                badge: '+8.2%',
                icon: <ShoppingCart size={20} className="text-accent" />,
            },
            {
                title: 'Products',
                value: dashboardData?.productCount || 0,
                badge: 'Active items',
                icon: <Package size={20} className="text-accent" />,
            },
            {
                title: 'Active Users',
                value: dashboardData?.activeUser || 0,
                badge: '+8 new',
                icon: <Users size={20} className="text-accent" />,
            },
        ];
    }

    if (isFetching) {
        return (
            <DashboardSkeleton />
        )
    }

    return <div className="min-h-screen bg-main-bg text-text-primary">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div>
                <h1 className="text-4xl font-bold font-serif text-[#4a3b32]">Admin Dashboard</h1>
                <p className="text-sm text-text-muted mt-1">Performance metrics & recent activity</p>
            </div>

            <Link to={'/admin/add-product'} className="bg-accent flex items-center justify-center text-black text-sm px-4 py-1.5 rounded-xl font-medium shadow-sm">
                <PlusIcon size={22} /> Add Product
            </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats?.map((stat, idx) => (
                <div
                    key={idx}
                    className="bg-bg-card border border-border-color rounded-2xl p-5 shadow-sm flex flex-col justify-between"
                >
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium text-text-muted">{stat.title}</span>
                        <div className="p-2 rounded-xl bg-bg-subtle">{stat.icon}</div>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-text-primary">{stat.value}</h2>
                        <span className="inline-block text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md mt-2">
                            {stat.badge}
                        </span>
                    </div>
                </div>
            ))}
        </div>

        <AdminChart data={dashboardData.chartData} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 my-8">

            {/* TOP SELLING PRODUCTS */}
            <div className="bg-bg-card border border-border-color p-6 rounded-2xl shadow-sm">
                <h3 className="text-xl font-bold text-text-primary mb-6">Top Selling Products</h3>

                <div className="space-y-4">
                    {dashboardData?.topProducts?.map((product) => (
                        <div
                            key={product.id}
                            className="flex items-center justify-between p-4 bg-main-bg/50 border border-border-color rounded-xl"
                        >
                            <div>
                                <p className="font-semibold text-text-primary">{product.name}</p>
                                <p className="text-xs text-text-muted mt-1">{product.salesCount} sales</p>
                            </div>
                            <span className="font-bold text-text-primary">
                                {formatCurrency(product.totalRevenue)}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* RECENT ORDERS TABLE */}
            <div className="lg:col-span-2 bg-bg-card border border-border-color rounded-2xl shadow-sm overflow-hidden flex flex-col justify-between">
                <div className="flex items-center justify-between p-6 border-b border-border-color">
                    <h3 className="text-xl font-bold text-text-primary">Recent Orders</h3>
                    <Link to={'/admin/orders'} className="text-sm font-medium text-text-muted hover:text-text-primary">
                        View all
                    </Link>
                </div>

                <div className="w-full overflow-x-auto">
                    <table className="w-full text-left text-sm text-text-primary min-w-[500px]">
                        <thead className="border-b border-border-color text-xs uppercase tracking-wider text-text-muted">
                            <tr>
                                <th className="p-4">Order</th>
                                <th className="p-4">Customer</th>
                                <th className="p-4">Total</th>
                                <th className="p-4">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dashboardData?.latestOrders?.map((order) => (
                                <tr key={order.id} className="border-b border-border-color/50 last:border-none transition hover:bg-main-bg/40 cursor-pointer">
                                    <td className="p-4 font-mono font-semibold">#{order.id.slice(-8)}</td>
                                    <td className="p-4 font-semibold text-text-primary truncate max-w-[140px]">{order.name}</td>
                                    <td className="p-4 font-bold">{formatCurrency(order.total)}</td>
                                    <td className="p-4 font-bold">{order.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>

    </div>
}