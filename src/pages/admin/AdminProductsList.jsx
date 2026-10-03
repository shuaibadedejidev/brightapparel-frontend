import React, { useEffect } from 'react';
import useProductStore from '../../store/useProductStore';
import { Link } from 'react-router';
import { EditIcon, Trash2Icon } from 'lucide-react';

const AdminProductsList = () => {
  const { products, isFetchingProducts, fetchProducts, deleteProduct, setSelectedProduct } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, []);

  if (isFetchingProducts) {
    return (
      <div className="max-w-4xl mx-auto space-y-6 flex items-center justify-center min-h-screen bg-[#f8f6f0]">
        <div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold text-gray-800">Admin Products</h1>
        <Link to={'/admin/add-product'} className="px-4 py-2 bg-black cursor-pointer hover:bg-black/80 text-white rounded-lg text-sm font-medium ">
          + Add Product
        </Link>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto overflow-y-hidden rounded-lg border max-w-full border-gray-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm text-gray-600">
          <thead className="bg-gray-50 border-b border-gray-200 text-gray-700 uppercase text-xs">
            <tr>
              <th className="px-4 py-3 text-left">Image Prev.</th>
              <th className="px-4 py-3 text-left">Product Name</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3 text-center">Actions</th> 
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50 transition cursor-pointer">
                <td className="px-4 py-4 font-medium text-gray-900">
                  <div className="w-14 h-12 rounded-xl overflow-hidden bg-gray-100">
                    <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                  </div>
                </td>
                <td className="px-4 py-4 font-medium text-gray-900">{product.name}</td>
                <td className="px-4 py-4">{product.category}</td>
                <td className="px-4 py-4 font-semibold text-gray-900">${(product.price / 100).toFixed(2)}</td>

                <td className="px-4 py-4 align-middle">
                  <div className="flex items-center justify-center space-x-2">
                    <Link
                      to={`/admin/edit-product/${product.id}`}
                      className="p-2 bg-amber-50 text-amber-700 hover:bg-amber-100 rounded-md transition-colors"
                      title="Edit product"
                    >
                      <EditIcon size={18} />
                    </Link>
                    <button
                      onClick={() => deleteProduct(product.id)}
                      className="p-2 cursor-pointer bg-red-50 text-red-700 hover:bg-red-100 rounded-md transition-colors"
                      title="Delete product"
                    >
                      <Trash2Icon size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card Layout (Auto-triggers on screens smaller than md) */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {products.map((product) => (
          <div key={product.id} className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-gray-900">{product.name}</h3>
                <p className="text-xs text-gray-500">{product.category}</p>
              </div>
              <span className="font-bold text-gray-900">${(product.price / 100).toFixed(2)}</span>
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-gray-100 text-xs">
              <div className="w-14 h-12 rounded-xl overflow-hidden bg-gray-100">
                <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
              </div>
              <div className="space-x-2 flex">
                <Link
                  to={`/admin/edit-product/${product.id}`}
                  className="px-3 py-1 bg-amber-50 cursor-pointer text-amber-700 rounded font-medium"
                >
                  <EditIcon size={18} />
                </Link>
                <button
                  onClick={() => deleteProduct(product.id)}
                  className="px-3 py-1 bg-red-50 text-red-700 rounded cursor-pointer font-medium"
                >
                  <Trash2Icon size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminProductsList