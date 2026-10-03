import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import {
    ArrowLeft,
    ShoppingBag,
    Package,
    ChevronRight,
    X,
    MapPin,
    Phone,
    User,
    FileText
} from 'lucide-react';

import useOrderStore from '../store/useOrderStore';
import formatCurrency from '../lib/formatCurrency';

const OrderHistoryPage = () => {
    const { orders, isLoading, fetchOrders } = useOrderStore();
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        fetchOrders();
    }, []);

    // Status Badge Helper matching custom theme
    const getStatusBadge = (status) => {
        const styles = {
            PENDING: 'bg-amber-50 text-amber-800 border-amber-200/80',
            PAID: 'bg-emerald-50 text-emerald-800 border-emerald-200/80',
            PROCESSING: 'bg-blue-50 text-blue-800 border-blue-200/80',
            SHIPPED: 'bg-indigo-50 text-indigo-800 border-indigo-200/80',
            COMPLETED: 'bg-emerald-50 text-emerald-800 border-emerald-200/80',
            CANCELLED: 'bg-rose-50 text-rose-800 border-rose-200/80',
        };

        return (
            <span className={`px-3 py-1 text-xs font-semibold rounded-full border transition-all ${styles[status] || 'bg-gray-100 text-gray-700'}`}>
                {status}
            </span>
        );
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-main-bg flex flex-col items-center justify-center p-8 text-center">
                <div className="w-10 h-10 border-3 border-accent border-t-transparent rounded-full animate-spin mb-4" />
                <p className="text-text-muted font-medium text-sm tracking-wide">
                    Fetching your order history...
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-main-bg text-text-primary py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-6">

                {/* Header & Back Navigation */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-border-color pb-6">
                    <div className="flex items-center space-x-3">
                        <Link
                            to="/"
                            className="p-2.5 bg-bg-card border border-border-color rounded-xl hover:bg-bg-subtle hover:border-gray-300 transition-all cursor-pointer shadow-sm group"
                            aria-label="Back to Homepage"
                        >
                            <ArrowLeft className="w-5 h-5 text-text-primary group-hover:-translate-x-0.5 transition-transform" />
                        </Link>
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                                Order History
                            </h1>
                            <p className="text-xs text-gray-500 mt-0.5">
                                View and track all your previous purchases
                            </p>
                        </div>
                    </div>

                    {orders?.length > 0 && (
                        <div className="self-start sm:self-auto bg-bg-subtle px-3.5 py-1.5 rounded-full text-xs font-semibold text-gray-700">
                            {orders.length} {orders.length === 1 ? 'Order' : 'Orders'} Total
                        </div>
                    )}
                </div>

                {/* Empty State */}
                {(!orders || orders.length === 0) ? (
                    <div className="bg-bg-card border border-border-color rounded-2xl p-12 text-center shadow-sm space-y-4 max-w-md mx-auto my-12">
                        <div className="w-16 h-16 bg-bg-subtle rounded-full flex items-center justify-center mx-auto">
                            <ShoppingBag className="w-8 h-8 text-gray-400" />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-text-primary">
                                No orders placed yet
                            </h2>
                            <p className="text-xs text-gray-500 mt-1">
                                Looks like you haven't bought anything yet. Check out our store items!
                            </p>
                        </div>
                        <Link
                            to="/"
                            className="inline-flex items-center justify-center px-6 py-2.5 rounded-xl text-sm font-semibold text-accent-text bg-accent-main hover:bg-accent transition-colors cursor-pointer shadow-sm"
                        >
                            Start Shopping
                        </Link>
                    </div>
                ) : (
                    /* Order List */
                    <div className="space-y-4">
                        {orders.map((order) => (
                            <div
                                key={order.id}
                                onClick={() => setSelectedOrder(order)}
                                className="bg-bg-card border border-border-color rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md hover:border-gray-300 transition-all cursor-pointer group"
                            >
                                {/* Card Header */}
                                <div className="flex flex-wrap justify-between items-center pb-4 border-b border-border-color gap-3">
                                    <div className="flex items-center space-x-3">
                                        <div className="p-2 bg-bg-subtle rounded-lg">
                                            <Package className="w-4 h-4 text-gray-700" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Order Reference</p>
                                            <p className="font-mono font-bold text-sm text-text-primary">
                                                #{order.id.slice(-8).toUpperCase()}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-4">
                                        <div className="text-right hidden sm:block">
                                            <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Date Placed</p>
                                            <p className="text-xs font-medium text-gray-700">
                                                {new Date(order.createdAt).toLocaleDateString('en-US', {
                                                    month: 'short',
                                                    day: 'numeric',
                                                    year: 'numeric'
                                                })}
                                            </p>
                                        </div>
                                        {getStatusBadge(order.status)}
                                    </div>
                                </div>

                                {/* Item Thumbnails & Summary */}
                                <div className="py-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                    <div className="flex items-center space-x-3 w-full md:w-auto pb-2 md:pb-0">
                                        {order.items?.slice(0, 4).map((item) => (
                                            <div key={item.id} className="relative flex-shrink-0 group/img">
                                                <img
                                                    src={item.image || item.product?.image}
                                                    alt={item.product?.name || 'Product Image'}
                                                    className="w-14 h-14 object-cover rounded-xl border border-border-color bg-gray-50"
                                                />
                                                <span className="absolute -top-1.5 -right-1.5 bg-accent-main text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                                                    {item.quantity}
                                                </span>
                                            </div>
                                        ))}
                                        {order.items?.length > 4 && (
                                            <div className="flex-shrink-0 w-14 h-14 rounded-xl border border-border-color bg-bg-subtle flex items-center justify-center">
                                                <span className="text-xs font-bold text-gray-700">
                                                    +{order.items.length - 4}
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Pricing Summary */}
                                    <div className="flex justify-between items-center w-full md:w-auto md:text-right border-t md:border-t-0 pt-3 md:pt-0 border-dashed border-gray-200">
                                        <div>
                                            <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Total Amount</p>
                                            <p className="text-lg font-extrabold text-text-primary">
                                                {formatCurrency(order.total)}
                                            </p>
                                        </div>
                                        <div className="md:hidden">
                                            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-accent transition-colors" />
                                        </div>
                                    </div>
                                </div>

                                {/* Action Bar */}
                                <div className="pt-3 border-t border-border-color flex justify-between items-center text-xs">
                                    <span className="text-gray-500 font-medium">
                                        {order.items?.length} {order.items?.length === 1 ? 'item' : 'items'} • Delivery Option: <span className="capitalize font-semibold text-gray-800">{order.deliveryOption || 'delivery'}</span>
                                    </span>
                                    <button
                                        type="button"
                                        className="inline-flex items-center text-xs font-bold text-accent-main group-hover:text-accent transition-colors cursor-pointer"
                                    >
                                        View Details
                                        <ChevronRight className="w-4 h-4 ml-0.5 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* ORDER DETAILS MODAL */}
            {selectedOrder && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fadeIn overflow-y-hidden">
                    <div className="bg-bg-card border border-border-color rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl">

                        {/* Modal Header */}
                        <div className="flex justify-between items-start border-b border-border-color pb-4">
                            <div>
                                <div className="flex items-center space-x-2">
                                    <h3 className="text-xl font-bold text-text-primary">
                                        Order Details
                                    </h3>
                                    {getStatusBadge(selectedOrder.status)}
                                </div>
                                <p className="text-xs text-gray-500 font-mono mt-1">
                                    ID: #{selectedOrder.id}
                                </p>
                            </div>
                            <button
                                onClick={() => setSelectedOrder(null)}
                                className="p-2 text-gray-400 hover:text-gray-800 hover:bg-bg-subtle rounded-full transition-colors cursor-pointer"
                                aria-label="Close details"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Customer & Shipping Info */}
                        <div className="bg-bg-subtle/60 border border-border-color p-4 rounded-xl space-y-3">
                            <h4 className="text-xs uppercase font-bold text-gray-500 tracking-wider">
                                Shipping & Contact Information
                            </h4>
                            <div className="space-y-2 text-xs sm:text-sm text-gray-700">
                                <div className="flex items-center space-x-2">
                                    <User className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                    <span className="font-semibold text-text-primary">
                                        {selectedOrder.name}
                                    </span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Phone className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                    <span>{selectedOrder.phone}</span>
                                </div>
                                <div className="flex items-start space-x-2">
                                    <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                                    <span>{selectedOrder.address}</span>
                                </div>
                                {selectedOrder.additionalNotes && (
                                    <div className="flex items-start space-x-2 pt-1 border-t border-gray-200/60 mt-2">
                                        <FileText className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                                        <p className="text-xs text-gray-600 italic">
                                            "{selectedOrder.additionalNotes}"
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Items Breakdown */}
                        <div className="space-y-3">
                            <h4 className="text-xs uppercase font-bold text-gray-500 tracking-wider">
                                Purchased Items ({selectedOrder.items?.length})
                            </h4>
                            <div className="divide-y divide-border-color border-t border-b border-border-color">
                                {selectedOrder.items?.map((item) => (
                                    <div key={item.id} className="py-3 flex justify-between items-center gap-3">
                                        <div className="flex items-center space-x-3">
                                            <img
                                                src={item.image || item.product?.image}
                                                alt={item.product?.name || 'Product'}
                                                className="w-12 h-12 rounded-xl border border-border-color object-cover bg-gray-50"
                                            />
                                            <div>
                                                <p className="font-bold text-xs sm:text-sm text-text-primary">
                                                    {item.product?.name || 'Product Item'}
                                                </p>
                                                <div className="flex items-center space-x-2 text-[11px] text-gray-500 mt-0.5">
                                                    {item.color && <span>Color: <strong className="text-gray-700">{item.color}</strong></span>}
                                                    {item.size && <span>• Size: <strong className="text-gray-700">{item.size}</strong></span>}
                                                    <span>• Qty: <strong className="text-gray-700">{item.quantity}</strong></span>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="font-bold text-xs sm:text-sm text-text-primary">
                                            {formatCurrency(item.price * item.quantity)}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Payment Breakdown */}
                        <div className="space-y-2 text-xs sm:text-sm pt-2">
                            <div className="flex justify-between text-gray-500">
                                <span>Subtotal</span>
                                <span>{formatCurrency(selectedOrder.subtotal)}</span>
                            </div>
                            <div className="flex justify-between text-gray-500">
                                <span>Delivery Fee</span>
                                <span>{formatCurrency(selectedOrder.deliveryFee)}</span>
                            </div>
                            <div className="flex justify-between text-gray-500">
                                <span>Estimated Tax</span>
                                <span>{formatCurrency(selectedOrder.tax)}</span>
                            </div>
                            <div className="flex justify-between text-base font-extrabold text-text-primary border-t border-border-color pt-3 mt-2">
                                <span>Total Paid</span>
                                <span className="text-accent">
                                    {formatCurrency(selectedOrder.total)}
                                </span>
                            </div>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
};

export default OrderHistoryPage;