import { useEffect, useState } from 'react';
import { useParams, useSearchParams, Link } from 'react-router';
import useOrderStore from '../store/useOrderStore';
import formatCurrency from '../lib/formatCurrency';

export default function VerifyOrderPage() {
    const { id } = useParams();
    const [searchParams] = useSearchParams();
    const reference = searchParams.get('reference');

    const { order, isVerifying, verifyPayment, error } = useOrderStore()

    useEffect(() => {
        if (id) verifyPayment(id)
    }, [verifyPayment])

    if (isVerifying) {
        return (
            <div className="min-h-screen bg-main-bg flex flex-col items-center justify-center p-6 text-text-primary">
                <div className="bg-bg-card border border-border-color rounded-2xl p-8 max-w-md w-full text-center shadow-sm">
                    <div className="w-12 h-12 border-4 border-bg-subtle border-t-accent rounded-full animate-spin mx-auto mb-6"></div>
                    <h2 className="text-xl font-semibold mb-2">Verifying Payment</h2>
                    <p className="text-sm text-text-muted">
                        Confirming transaction status with Paystack. Please do not close or refresh this page.
                    </p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-main-bg flex flex-col items-center justify-center p-6 text-text-primary">
                <div className="bg-bg-card border border-border-color rounded-2xl p-8 max-w-md w-full text-center shadow-sm">
                    <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                        !
                    </div>
                    <h2 className="text-xl font-semibold mb-2">Verification Failed</h2>
                    <p className="text-sm text-text-muted mb-6">{error}</p>
                    <Link
                        to="/order-history"
                        className="block w-full py-3 bg-accent-main text-accent-text rounded-xl font-medium text-center transition hover:opacity-90"
                    >
                        Return to Orders
                    </Link>
                </div>
            </div>
        );
    }

    if (order.status !== 'PAID') {
        return (
            <div className="min-h-screen bg-main-bg flex flex-col items-center justify-center p-6 text-text-primary">
                <div className="bg-bg-card border border-border-color rounded-2xl p-8 max-w-md w-full text-center shadow-sm">
                    <div className="w-12 h-12 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                        ?
                    </div>
                    <h2 className="text-xl font-semibold mb-2">Payment Not Confirmed</h2>
                    <p className="text-sm text-text-muted mb-6">
                        We couldn't confirm payment completion for this order. If your money was deducted, our webhooks will automatically update your order shortly.
                    </p>
                    <div className="space-y-3">
                        <Link
                            to={`/order-history`}
                            className="block w-full py-3 bg-accent-main text-accent-text rounded-xl font-medium text-center transition hover:opacity-90"
                        >
                            Check My Orders
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-main-bg flex flex-col items-center justify-center p-6 text-text-primary">
            <div className="bg-bg-card border border-border-color rounded-2xl p-8 max-w-lg w-full shadow-sm">

                {/* Top Header */}
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-bg-subtle border border-border-color rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg
                            className="w-8 h-8 text-accent"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <span className="inline-block px-3 py-1 bg-bg-subtle text-accent text-xs font-semibold rounded-full uppercase tracking-wider mb-2">
                        Payment Confirmed
                    </span>
                    <h1 className="text-2xl font-bold tracking-tight">Thank you for your purchase!</h1>
                    <p className="text-sm text-text-muted mt-1">
                        Order ID: <span className="truncate inline-block max-w-[150px] w-full text-xs font-medium text-text-primary">{order?.id}</span>
                    </p>
                </div>

                {/* Order Details Card */}
                <div className="bg-bg-subtle rounded-xl p-5 mb-8 border border-border-color space-y-4">
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-text-muted">Reference</span>
                        <span className="font-mono text-xs truncate font-semibold">{reference || 'PAYSTACK_REF'}</span>
                    </div>

                    <div className="flex justify-between items-center text-sm">
                        <span className="text-text-muted">Status</span>
                        <span className="font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md text-xs border border-emerald-200">
                            {order?.status || 'PROCESSING'}
                        </span>
                    </div>

                    <div className="border-t border-border-color pt-3 flex justify-between items-center">
                        <span className="font-medium text-sm">Total Amount Paid</span>
                        <span className="text-lg font-bold">{formatCurrency(order?.total)}</span>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Link
                        to="/orders-history"
                        className="w-full py-3 bg-accent-main text-accent-text rounded-xl font-medium text-center transition hover:opacity-90 text-sm"
                    >
                        View Order History
                    </Link>
                    <Link
                        to="/shop"
                        className="w-full py-3 bg-bg-subtle border border-border-color text-text-primary rounded-xl font-medium text-center transition hover:bg-main-bg text-sm"
                    >
                        Continue Shopping
                    </Link>
                </div>

            </div>
        </div>
    );
}