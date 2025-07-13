"use client";

import React, { useState, useRef } from 'react';
import { 
  ChevronLeft, 
  Heart, 
  Share2, 
  Star, 
  ShoppingCart, 
  Plus, 
  Minus, 
  Truck, 
  Shield, 
  RotateCcw,
  Check,
  ChevronRight,
  User,
  ThumbsUp,
  Camera,
  Sparkles
} from 'lucide-react';

const ProductPage = () => {
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('black');
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [showTryOn, setShowTryOn] = useState(false);
  const [activeTab, setActiveTab] = useState('details');

  const product = {
    id: 3,
    name: 'Street Style Hoodie',
    brand: 'UrbanWear',
    price: 67.99,
    originalPrice: 89.99,
    rating: 4.3,
    reviewCount: 127,
    description: 'Premium cotton blend hoodie with contemporary street style design. Features adjustable drawstrings, kangaroo pocket, and ribbed cuffs for comfort and style.',
    features: [
      '80% Cotton, 20% Polyester blend',
      'Machine washable',
      'Adjustable drawstring hood',
      'Kangaroo front pocket',
      'Ribbed cuffs and hem',
      'Unisex fit'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'black', color: '#000000', label: 'Black' },
      { name: 'gray', color: '#6B7280', label: 'Gray' },
      { name: 'navy', color: '#1E3A8A', label: 'Navy' },
      { name: 'burgundy', color: '#991B1B', label: 'Burgundy' }
    ],
    images: [
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&h=600&fit=crop',
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=600&fit=crop',
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=500&h=600&fit=crop',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=500&h=600&fit=crop'
    ]
  };

  const reviews = [
    {
      id: 1,
      user: 'Sarah M.',
      rating: 5,
      comment: 'Perfect fit and super comfortable! The quality is amazing.',
      date: '2 days ago',
      verified: true
    },
    {
      id: 2,
      user: 'Alex R.',
      rating: 4,
      comment: 'Great hoodie, runs slightly large. Would recommend sizing down.',
      date: '1 week ago',
      verified: true
    },
    {
      id: 3,
      user: 'Mike K.',
      rating: 5,
      comment: 'Exactly what I was looking for. Fast shipping too!',
      date: '2 weeks ago',
      verified: true
    }
  ];

  const handleQuantityChange = (delta) => {
    setQuantity(prev => Math.max(1, prev + delta));
  };

  const handleAddToCart = () => {
    // Add to cart logic here
    alert('Added to cart!');
  };

  const handleTryOn = () => {
    setShowTryOn(true);
    setTimeout(() => setShowTryOn(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => window.history.back()}
              className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center hover:bg-blue-200 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-blue-600" />
            </button>
            
            <div className="text-center">
              <div className="text-lg font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent tracking-tight">
                {product.brand}
              </div>
            </div>
            
            <div className="flex gap-2">
              <button 
                onClick={() => setIsLiked(!isLiked)}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                  isLiked ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-400 hover:bg-red-100 hover:text-red-600'
                }`}
              >
                <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
              </button>
              <button className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
                <Share2 className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 pb-20">
        {/* Product Images */}
        <div className="relative mb-6">
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 overflow-hidden">
            <div className="relative h-96">
              <img
                src={product.images[currentImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              
              {/* Try-On Badge */}
              <div className="absolute top-4 right-4">
                <button
                  onClick={handleTryOn}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2"
                >
                  <Camera className="w-4 h-4" />
                  Try-On
                </button>
              </div>

              {/* Image Navigation */}
              {product.images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                  <div className="flex gap-2">
                    {product.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          index === currentImageIndex ? 'bg-white w-6' : 'bg-white/50'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 p-6 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h1 className="text-2xl font-black text-slate-800 mb-2 tracking-tight">
                {product.name}
              </h1>
              <div className="flex items-center gap-4 mb-3">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-bold text-slate-700">{product.rating}</span>
                  <span className="text-sm text-slate-500">({product.reviewCount} reviews)</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <div className="text-3xl font-black text-blue-600">
              ${product.price}
            </div>
            <div className="text-lg text-slate-400 line-through">
              ${product.originalPrice}
            </div>
            <div className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-bold">
              24% OFF
            </div>
          </div>

          {/* Color Selection */}
          <div className="mb-6">
            <h3 className="text-sm font-bold text-slate-700 mb-3">Color</h3>
            <div className="flex gap-3">
              {product.colors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color.name)}
                  className={`w-12 h-12 rounded-full border-4 transition-all ${
                    selectedColor === color.name 
                      ? 'border-blue-600 scale-110' 
                      : 'border-white hover:border-gray-300'
                  }`}
                  style={{ backgroundColor: color.color }}
                  title={color.label}
                />
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div className="mb-6">
            <h3 className="text-sm font-bold text-slate-700 mb-3">Size</h3>
            <div className="grid grid-cols-6 gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`py-3 rounded-xl text-sm font-bold transition-all ${
                    selectedSize === size
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="mb-6">
            <h3 className="text-sm font-bold text-slate-700 mb-3">Quantity</h3>
            <div className="flex items-center gap-4">
              <button
                onClick={() => handleQuantityChange(-1)}
                className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <Minus className="w-4 h-4 text-gray-600" />
              </button>
              <span className="text-xl font-bold text-slate-800 min-w-[2rem] text-center">
                {quantity}
              </span>
              <button
                onClick={() => handleQuantityChange(1)}
                className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <Plus className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 p-6 mb-6">
          <div className="flex border-b border-gray-100 mb-4">
            <button
              onClick={() => setActiveTab('details')}
              className={`flex-1 py-3 text-sm font-bold transition-colors ${
                activeTab === 'details' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'
              }`}
            >
              Details
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`flex-1 py-3 text-sm font-bold transition-colors ${
                activeTab === 'reviews' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'
              }`}
            >
              Reviews
            </button>
          </div>

          {activeTab === 'details' && (
            <div>
              <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                {product.description}
              </p>
              <div className="space-y-2">
                {product.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span className="text-sm text-slate-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-4">
              {reviews.map((review) => (
                <div key={review.id} className="border-b border-gray-100 pb-4 last:border-b-0">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-slate-700">{review.user}</span>
                        {review.verified && (
                          <div className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs font-bold">
                            Verified
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${
                                i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-slate-500">{review.date}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 ml-11">{review.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Shipping Info */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 p-6 mb-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Truck className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-700">Free Shipping</div>
                <div className="text-xs text-slate-500">On orders over $50</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <RotateCcw className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-700">Easy Returns</div>
                <div className="text-xs text-slate-500">30-day return policy</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <Shield className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-700">Secure Payment</div>
                <div className="text-xs text-slate-500">256-bit SSL encryption</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-white/20 p-4">
        <div className="max-w-md mx-auto flex gap-4">
          <button
            onClick={handleTryOn}
            className="flex-1 bg-white border-2 border-blue-600 text-blue-600 py-4 rounded-2xl font-bold text-lg hover:bg-blue-50 transition-all duration-200 shadow-lg flex items-center justify-center gap-2"
          >
            <Camera className="w-5 h-5" />
            Try-On
          </button>
          <button
            onClick={handleAddToCart}
            className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-2xl font-bold text-lg hover:shadow-xl transition-all duration-200 shadow-lg flex items-center justify-center gap-2"
          >
            <ShoppingCart className="w-5 h-5" />
            Add to Cart
          </button>
        </div>
      </div>

      {/* Try-On Modal */}
      {showTryOn && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 text-center shadow-2xl border border-white/20">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-10 h-10 text-white animate-pulse" />
            </div>
            <div className="text-xl font-bold text-slate-800 mb-2">Try-On Loading...</div>
            <div className="text-sm text-slate-600">Preparing your virtual fitting room</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;