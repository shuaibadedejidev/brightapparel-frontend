import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Edit3, AlertCircle, Check, XIcon, Loader2 } from 'lucide-react';
import axiosInstance from '../../lib/axiosInstance';
import toast from 'react-hot-toast';

const AVAILABLE_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

const AdminEditProduct = () => {
  const { id } = useParams()
  const navigate = useNavigate();

  const [isLoadingProduct, setIsLoadingProduct] = useState(true);
  const [isUpdatingProduct, setIsUpdatingProduct] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    compareAtPrice: '',
    isFeatured: false,
    gender: 'unisex',
    category: 'tops',
    rating: '',
    reviewCount: '',
    sizes: [],
    productImages: [],
    colors: []
  });

  const [images, setImages] = useState([]);
  const [errors, setErrors] = useState({});
  const [colorName, setColorName] = useState('');
  const [hexCode, setHexCode] = useState('#000000');

  // Fetch product data on mount
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoadingProduct(true);
        const response = await axiosInstance.get(`/products/${id}`);
        const product = response.data;

        setFormData({
          name: product.name || '',
          description: product.description || '',
          price: product.price ? (product.price / 100).toString() : '',
          compareAtPrice: product.compareAtPrice ? (product.compareAtPrice / 100).toString() : '',
          isFeatured: Boolean(product.isFeatured),
          gender: product.gender || 'unisex',
          category: product.category || 'tops',
          rating: product.rating !== undefined ? product.rating.toString() : '',
          reviewCount: product.reviewCount !== undefined ? product.reviewCount.toString() : '',
          sizes: product.sizes || [],
          productImages: product.productImages || [],
          colors: product.colors || []
        });

        if (product.productImages && product.productImages.length > 0) {
          const initialImages = product.productImages.map((url, index) => ({
            id: `existing-${index}-${Date.now()}`,
            previewUrl: url,
            cloudinaryUrl: url,
            isUploading: false,
            error: false
          }));
          setImages(initialImages);
        }
      } catch (err) {
        toast.error('Failed to fetch product details');
        navigate('/admin/products');
      } finally {
        setIsLoadingProduct(false);
      }
    };

    if (id) fetchProduct();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const toggleSize = (size) => {
    setFormData((prev) => {
      const exists = prev.sizes.includes(size);
      const newSizes = exists
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size];
      return { ...prev, sizes: newSizes };
    });

    if (errors.sizes) {
      setErrors((prev) => ({ ...prev, sizes: null }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Product name is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';

    if (!formData.price) {
      newErrors.price = 'Price is required';
    } else {
      const priceInCents = Math.round(parseFloat(formData.price) * 100);
      if (isNaN(priceInCents) || priceInCents <= 0) {
        newErrors.price = 'Enter a valid price greater than $0.00';
      }
    }

    if (formData.compareAtPrice) {
      const comparePriceInCents = Math.round(parseFloat(formData.compareAtPrice) * 100);
      if (isNaN(comparePriceInCents) || comparePriceInCents <= 0) {
        newErrors.compareAtPrice = 'Compare price must be a valid amount greater than $0.00';
      }
    }

    if (formData.sizes.length === 0) {
      newErrors.sizes = 'Select at least one size';
    }

    if (formData.rating && (isNaN(formData.rating) || formData.rating < 0 || formData.rating > 5)) {
      newErrors.rating = 'Rating must be between 0 and 5';
    }

    if (formData.reviewCount && (isNaN(formData.reviewCount) || formData.reviewCount < 0)) {
      newErrors.reviewCount = 'Review count must be 0 or higher';
    }

    if (formData.productImages.length === 0) {
      toast.error('Please select product images');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    const payload = {
      ...formData,
      price: Math.round(parseFloat(formData.price) * 100),
      compareAtPrice: formData.compareAtPrice
        ? Math.round(parseFloat(formData.compareAtPrice) * 100)
        : null,
      rating: formData.rating ? parseFloat(formData.rating) : 0,
      reviewCount: formData.reviewCount ? parseInt(formData.reviewCount, 10) : 0,
    };

    console.log(payload)

    try {
      setIsUpdatingProduct(true);
      await axiosInstance.put(`/products/${id}`, payload);
      toast.success('Product updated successfully');
      navigate('/admin/products');
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to update product');
    } finally {
      setIsUpdatingProduct(false);
    }
  };

  const handleFileChange = async (e) => {
    const selectedFiles = Array.from(e.target.files || []);
    if (selectedFiles.length === 0) return;

    const newPreviews = selectedFiles.map((file) => ({
      id: Math.random().toString(36).substring(2, 9),
      previewUrl: URL.createObjectURL(file),
      cloudinaryUrl: null,
      isUploading: true,
      error: false,
    }));

    setImages((prev) => [...prev, ...newPreviews]);

    const uploadData = new FormData();
    selectedFiles.forEach((file) => {
      uploadData.append('files', file);
    });

    try {
      const response = await axiosInstance.post('/upload', uploadData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const uploadedUrls = response.data.urls;

      setImages((prev) => {
        const updated = prev.map((img) => {
          const matchIndex = newPreviews.findIndex((p) => p.id === img.id);
          if (matchIndex !== -1 && uploadedUrls[matchIndex]) {
            return {
              ...img,
              cloudinaryUrl: uploadedUrls[matchIndex],
              isUploading: false,
            };
          }
          return img;
        });

        // Keep formData.productImages synced
        const allUrls = updated
          .map((i) => i.cloudinaryUrl)
          .filter(Boolean);
        setFormData((prevForm) => ({ ...prevForm, productImages: allUrls }));

        return updated;
      });
    } catch (err) {
      setImages((prev) =>
        prev.map((img) =>
          newPreviews.some((p) => p.id === img.id)
            ? { ...img, isUploading: false, error: true }
            : img
        )
      );
    }
  };

  const handleRemoveImage = (idToRemove) => {
    const updatedImages = images.filter((img) => img.id !== idToRemove);
    setImages(updatedImages);

    const remainingUrls = updatedImages
      .map((img) => img.cloudinaryUrl || img.previewUrl)
      .filter(Boolean);

    setFormData((prev) => ({ ...prev, productImages: remainingUrls }));
  };

  const handleAddColor = (e) => {
    e.preventDefault();

    if (!colorName.trim()) {
      toast.error('Please enter a color name');
      return;
    }

    const isDuplicate = formData.colors.some(
      (c) => c.name.toLowerCase() === colorName.trim().toLowerCase()
    );
    if (isDuplicate) {
      toast.error('This color has already been added.');
      return;
    }

    setFormData((prev) => ({
      ...prev,
      colors: [...prev.colors, { name: colorName.trim(), hex: hexCode }]
    }));

    setColorName('');
    setHexCode('#000000');
  };

  const handleRemoveColor = (indexToRemove) => {
    setFormData((prev) => ({
      ...prev,
      colors: prev.colors.filter((_, index) => index !== indexToRemove)
    }));
  };

  if (isLoadingProduct) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-[#4a3b32]" />
        <p className="text-sm font-medium text-[#6c5d53]">Fetching product details...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-[#e2ddd5] pb-4">
        <div className="p-2.5 bg-[#1a1a1a] text-white rounded-xl">
          <Edit3 size={22} />
        </div>
        <div>
          <h1 className="text-2xl font-serif font-bold text-[rgb(74,59,50)]">Edit Product</h1>
          <p className="text-xs text-[#6c5d53]">Update details and inventory for this item</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6" id="product-form">
        {/* Basic Information Card */}
        <div className="bg-white border border-[#e2ddd5] rounded-2xl p-6 space-y-5 shadow-2xs">
          <h2 className="font-serif font-bold text-base text-[#4a3b32] border-b border-[#f4f1eb] pb-2">
            Basic Information
          </h2>

          <div>
            <label className="block text-xs font-semibold text-[#4a3b32] mb-1.5">
              Product Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Oversized Heavyweight Cotton Tee"
              className={`w-full px-4 py-2.5 text-sm rounded-xl border bg-[#fcfbf9] focus:outline-hidden transition ${errors.name ? 'border-red-500' : 'border-[#e2ddd5] focus:border-[#4a3b32]'
                }`}
            />
            {errors.name && (
              <p className="flex items-center gap-1 text-xs text-red-600 mt-1.5 font-medium">
                <AlertCircle size={13} /> {errors.name}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#4a3b32] mb-1.5">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              rows={4}
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe fit, fabric GSM, care instructions..."
              className={`w-full px-4 py-2.5 text-sm rounded-xl border bg-[#fcfbf9] focus:outline-hidden transition resize-none ${errors.description ? 'border-red-500' : 'border-[#e2ddd5] focus:border-[#4a3b32]'
                }`}
            />
            {errors.description && (
              <p className="flex items-center gap-1 text-xs text-red-600 mt-1.5 font-medium">
                <AlertCircle size={13} /> {errors.description}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#4a3b32] mb-1.5">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-[#e2ddd5] bg-[#fcfbf9] focus:outline-hidden focus:border-[#4a3b32] capitalize"
              >
                <option value="tops">Tops & Tees</option>
                <option value="hoodies">Hoodies & Sweats</option>
                <option value="outerwear">Outerwear</option>
                <option value="bottoms">Bottoms</option>
                <option value="accessories">Accessories</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#4a3b32] mb-1.5">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-[#e2ddd5] bg-[#fcfbf9] focus:outline-hidden focus:border-[#4a3b32] capitalize"
              >
                <option value="unisex">Unisex</option>
                <option value="men">Men</option>
                <option value="women">Women</option>
              </select>
            </div>
          </div>
        </div>

        {/* Pricing Card */}
        <div className="bg-white border border-[#e2ddd5] rounded-2xl p-6 space-y-5 shadow-2xs">
          <h2 className="font-serif font-bold text-base text-[#4a3b32] border-b border-[#f4f1eb] pb-2">
            Pricing & Inventory
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#4a3b32] mb-1.5">
                Price ($) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                step="0.01"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="45.00"
                className={`w-full px-4 py-2.5 text-sm rounded-xl border bg-[#fcfbf9] focus:outline-hidden transition ${errors.price ? 'border-red-500' : 'border-[#e2ddd5] focus:border-[#4a3b32]'
                  }`}
              />
              {errors.price && (
                <p className="flex items-center gap-1 text-xs text-red-600 mt-1.5 font-medium">
                  <AlertCircle size={13} /> {errors.price}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#4a3b32] mb-1.5">
                Compare-at Price ($)
              </label>
              <input
                type="number"
                step="0.01"
                name="compareAtPrice"
                value={formData.compareAtPrice}
                onChange={handleChange}
                placeholder="60.00"
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-[#e2ddd5] bg-[#fcfbf9] focus:outline-hidden focus:border-[#4a3b32]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#4a3b32] mb-2">
              Available Sizes <span className="text-red-500">*</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {AVAILABLE_SIZES.map((size) => {
                const isSelected = formData.sizes.includes(size);
                return (
                  <button
                    key={size}
                    type="button"
                    onClick={() => toggleSize(size)}
                    className={`h-10 px-4 rounded-xl text-xs font-bold transition-all border flex items-center gap-1.5 cursor-pointer ${isSelected
                        ? 'bg-[#1a1a1a] text-white border-[#1a1a1a]'
                        : 'bg-[#fcfbf9] text-[#6c5d53] border-[#e2ddd5]'
                      }`}
                  >
                    {isSelected && <Check size={14} />}
                    {size}
                  </button>
                );
              })}
            </div>
            {errors.sizes && (
              <p className="flex items-center gap-1 text-xs text-red-600 mt-2 font-medium">
                <AlertCircle size={13} /> {errors.sizes}
              </p>
            )}
          </div>

          <div className="pt-2">
            <label className="flex items-center gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                name="isFeatured"
                checked={formData.isFeatured}
                onChange={handleChange}
                className="w-4 h-4 rounded-md border-[#e2ddd5] text-black focus:ring-black accent-black cursor-pointer"
              />
              <span className="text-xs font-semibold text-[#4a3b32]">
                Mark as Featured Product
              </span>
            </label>
          </div>
        </div>

        {/* Colors Card */}
        <div className="bg-white border border-[#e2ddd5] rounded-2xl p-6 space-y-5 shadow-2xs">
          <label className="block text-sm font-medium text-gray-700">Product Colors</label>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 border bg-white p-1 rounded-md">
              <input
                type="color"
                value={hexCode}
                onChange={(e) => setHexCode(e.target.value)}
                className="w-8 h-8 rounded cursor-pointer border-0"
              />
              <span className="text-xs font-mono uppercase text-gray-600">{hexCode}</span>
            </div>

            <input
              type="text"
              placeholder="Color Name (e.g., Off White, Crimson)"
              value={colorName}
              onChange={(e) => setColorName(e.target.value)}
              className="flex-1 px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black"
            />

            <button
              type="button"
              onClick={handleAddColor}
              className="px-4 py-2 cursor-pointer bg-black text-white text-sm font-medium rounded-md hover:bg-gray-800 transition"
            >
              Add Color
            </button>
          </div>

          <div className="flex flex-wrap gap-2 mt-3">
            {formData.colors.length === 0 && (
              <p className="text-xs text-gray-500 italic">No colors added yet.</p>
            )}

            {formData.colors.map((color, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-3 py-1.5 bg-white border rounded-full text-xs shadow-sm"
              >
                <span
                  className="w-4 h-4 rounded-full border border-gray-300"
                  style={{ backgroundColor: color.hex }}
                />
                <span className="font-medium text-gray-800">{color.name}</span>
                <span className="text-gray-400 font-mono">({color.hex})</span>

                <button
                  type="button"
                  onClick={() => handleRemoveColor(index)}
                  className="text-gray-400 hover:text-red-600 font-bold ml-1"
                >
                  <XIcon size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Images Card */}
        <div className="bg-white border border-[#e2ddd5] rounded-2xl p-6 space-y-5 shadow-2xs">
          <h2 className="font-serif font-bold text-base text-[#4a3b32] border-b border-[#f4f1eb] pb-2">
            Images
          </h2>

          <div className="space-y-4">
            <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 border-gray-300">
              <span className="text-sm font-medium text-gray-600">
                Click to upload additional product images
              </span>
              <input
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {images.map((img) => (
                <div key={img.id} className="relative aspect-square rounded-lg overflow-hidden border border-gray-200 group">
                  <img
                    src={img.previewUrl || img.cloudinaryUrl}
                    alt="Product Preview"
                    className="w-full h-full object-cover"
                  />

                  {img.isUploading && (
                    <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white text-xs gap-2">
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Uploading...</span>
                    </div>
                  )}

                  {!img.isUploading && (
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(img.id)}
                      className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                    >
                      <XIcon size={14} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end gap-3 pt-2">
          <button
            type="submit"
            disabled={isUpdatingProduct}
            className="px-6 py-3 bg-[#1a1a1a] text-white rounded-xl text-xs font-bold hover:bg-black transition-all cursor-pointer shadow-md disabled:opacity-50"
          >
            {isUpdatingProduct ? 'Saving Changes...' : 'Update Product'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminEditProduct;