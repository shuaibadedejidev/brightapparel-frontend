import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useOrderStore from '../../store/useOrderStore';
import formatCurrency from '../../lib/formatCurrency';
import { XIcon } from 'lucide-react';

const STATUSES = ['ALL', 'PENDING', 'PAID', 'PROCESSING', 'SHIPPED', 'COMPLETED', 'CANCELLED'];

export const AdminOrders = () => {
  const { orders, isLoading, fetchOrdersAdmin, handleStatusChange } = useOrderStore()

  const [activeFilter, setActiveFilter] = useState('ALL');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    fetchOrdersAdmin(activeFilter, searchQuery);
  }, [activeFilter, searchQuery]);

  return (
    <div className="p-4 md:p-6 max-w-5xl w-full mx-auto space-y-6 bg-main-bg min-h-screen text-text-primary min-w-0 overflow-x-hidden">
      {/* Header & Search Bar */}
      <div className="flex flex-col justify-between items-start md:flex-row md:items-center gap-4 w-full">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Admin Order</h1>
          <p className="text-sm text-text-muted">Track, and manage customer fulfillment</p>
        </div>

        {/* Search Input */}
        <input
          type="text"
          placeholder="Search by ID, name, or phone..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-4 py-2 border border-border-color rounded-lg text-sm w-full md:w-72 bg-bg-card text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-main"
        />
      </div>

      {/* Status Filter Tabs */}
      <div className="w-full min-w-0 overflow-x-auto border-b border-border-color pb-2">
        <div className="flex gap-2 w-max">
          {STATUSES?.map((status) => {
            const isActive = activeFilter === status;
            return (
              <button
                key={status}
                onClick={() => setActiveFilter(status)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition whitespace-nowrap cursor-pointer ${isActive
                    ? 'bg-accent-main text-accent-text'
                    : 'bg-bg-subtle text-text-muted hover:bg-border-color'
                  }`}
              >
                {status}
              </button>
            );
          })}
        </div>
      </div>

      {/* Orders Table */}
      {isLoading ? (
        <div className="text-center py-12 text-text-muted">Loading orders...</div>
      ) : orders?.length === 0 ? (
        <div className="text-center py-12 text-text-muted">No orders found.</div>
      ) : (
        /* FIXED: Removed max-w-4xl and added min-w-0 to force horizontal scroll inside the card */
        <div className="bg-bg-card border w-full min-w-0 border-border-color rounded-xl overflow-x-auto shadow-sm">
          <table className="w-full min-w-[650px] text-left text-sm text-text-primary">
            <thead className="bg-bg-subtle border-b border-border-color text-xs uppercase tracking-wider text-text-muted">
              <tr>
                <th className="p-4">Order ID</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Items</th>
                <th className="p-4">Total</th>
                <th className="p-4">Status</th>
                <th className="p-4">Date</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-color">
              {orders?.map((order) => (
                <tr key={order.id} className="hover:bg-bg-subtle transition cursor-pointer">
                  <td className="p-4 font-mono font-semibold">
                    #{order.id.slice(-8)}
                  </td>
                  <td className="p-4">
                    <p className="font-semibold text-text-primary">{order.name}</p>
                    <p className="text-xs text-text-muted">{order.phone}</p>
                  </td>
                  <td className="p-4">
                    {order.items.length} item(s)
                  </td>
                  <td className="p-4 font-bold">
                    {formatCurrency(order.total)}
                  </td>
                  <td className="p-4">
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      className="px-2 py-1 text-xs font-semibold rounded-md border cursor-pointer border-border-color bg-bg-card text-text-primary focus:outline-none"
                    >
                      {STATUSES.filter((s) => s !== 'ALL').map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="p-4 text-xs text-text-muted">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="text-xs font-semibold text-accent hover:underline cursor-pointer"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* View Order Modal */}
      {selectedOrder && (
        <div
          onClick={() => setSelectedOrder(null)}
          className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-bg-card rounded-2xl max-w-lg w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto border border-border-color text-text-primary"
          >
            <div className="flex justify-between items-center border-b border-border-color pb-3">
              <h3 className="text-lg font-bold">Order Id: #{selectedOrder.id}</h3>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-text-muted font-bold text-lg hover:opacity-75 cursor-pointer"
              >
                <XIcon size={22} />
              </button>
            </div>

            <div className="bg-bg-subtle p-4 rounded-lg text-xs space-y-1">
              <p className="font-bold">Shipping Details</p>
              <p className="font-medium">Name: {selectedOrder.name}</p>
              <p className="font-medium">Phone: {selectedOrder.phone}</p>
              <p className="font-medium">Address: {selectedOrder.address}</p>
              <p className="font-medium">Delivery Type: {selectedOrder.deliveryOption}</p>
              {selectedOrder.additionalNotes && <p>Notes: {selectedOrder.additionalNotes}</p>}
            </div>

            <div className="space-y-2">
              <p className="font-bold text-xs">Order Items</p>
              {selectedOrder.items.map((item) => (
                <div key={item.id} className="flex justify-between text-xs border-b border-border-color pb-2">
                  <div>
                    <p className="font-medium">{item.product.name}</p>
                    <p className="text-text-muted">Qty: {item.quantity} | Unit: {formatCurrency(item.price)}</p>
                  </div>
                  <p className="font-semibold">{formatCurrency(item.price * item.quantity)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;