"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Heart, ShoppingCart, ArrowLeft, ArrowRight, Star, Sparkles, Check, X, ChevronLeft, ChevronRight } from 'lucide-react';

const FashionScrollPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [likedItems, setLikedItems] = useState([]);
  const [swipeDirection, setSwipeDirection] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Mock fashion items with placeholder images
  const fashionItems = [
    {
      id: 1,
      name: 'Casual Denim Jacket',
      price: '$89.99',
      size: 'M',
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=600&fit=crop',
      brand: 'Urban Style',
      color: 'Light Blue'
    },
    {
      id: 2,
      name: 'Elegant Summer Dress',
      price: '$124.99',
      size: 'S',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=600&fit=crop',
      brand: 'Chic Boutique',
      color: 'Floral Print'
    },
    {
      id: 3,
      name: 'Street Style Hoodie',
      price: '$67.99',
      size: 'L',
      rating: 4.3,
      image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=600&fit=crop',
      brand: 'UrbanWear',
      color: 'Black'
    },
    {
      id: 4,
      name: 'Business Blazer',
      price: '$156.99',
      size: 'M',
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop',
      brand: 'Professional',
      color: 'Navy Blue'
    }
  ];

  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      handleSwipeLeft();
    } else if (isRightSwipe) {
      handleSwipeRight();
    }
  };

  const handleSwipeLeft = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setSwipeDirection('left');
    
    setTimeout(() => {
      addToCart(fashionItems[currentIndex]);
      nextItem();
      setSwipeDirection(null);
      setIsAnimating(false);
    }, 300);
  };

  const handleSwipeRight = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setSwipeDirection('right');
    
    setTimeout(() => {
      nextItem();
      setSwipeDirection(null);
      setIsAnimating(false);
    }, 300);
  };

  const nextItem = () => {
    setCurrentIndex((prev) => (prev + 1) % fashionItems.length);
  };

  const prevItem = () => {
    setCurrentIndex((prev) => (prev - 1 + fashionItems.length) % fashionItems.length);
  };

  const addToCart = (item) => {
    setCartItems(prev => {
      if (!prev.find(cartItem => cartItem.id === item.id)) {
        return [...prev, item];
      }
      return prev;
    });
  };

  const toggleLike = (item) => {
    setLikedItems(prev => {
      if (prev.find(likedItem => likedItem.id === item.id)) {
        return prev.filter(likedItem => likedItem.id !== item.id);
      }
      return [...prev, item];
    });
  };

  const handleCenterClick = () => {
    if (currentIndex === 2) { // Third image (0-indexed)
      window.location.href = '/product';
    }
  };

  const currentItem = fashionItems[currentIndex];
  const isLiked = likedItems.find(item => item.id === currentItem.id);

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
              <div className="text-xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent tracking-tight">
                Try-On Results
              </div>
              <div className="text-xs text-blue-600 font-bold tracking-widest uppercase">
                Powered by Walmart
              </div>
            </div>
            
            <div className="relative">
              <button className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center hover:bg-blue-200 transition-colors">
                <ShoppingCart className="w-5 h-5 text-blue-600" />
              </button>
              {cartItems.length > 0 && (
                <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-xs text-white font-bold">{cartItems.length}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-md mx-auto px-4 py-6">
        {/* Progress Indicator */}
        <div className="flex justify-center mb-6">
          <div className="flex gap-2">
            {fashionItems.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-blue-600 w-8' : 'bg-blue-200'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Fashion Card */}
        <div className="relative mb-6">
          <div
            className={`bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden transform transition-all duration-300 ${
              swipeDirection === 'left' ? 'translate-x-[-100%] rotate-[-15deg] opacity-0' :
              swipeDirection === 'right' ? 'translate-x-[100%] rotate-[15deg] opacity-0' :
              'translate-x-0 rotate-0 opacity-100'
            }`}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Size Badge */}
            <div className="absolute top-4 right-4 z-10">
              <div className="bg-black/70 text-white px-3 py-1 rounded-full text-sm font-bold backdrop-blur-sm">
                Size {currentItem.size}
              </div>
            </div>

            {/* Image Container */}
            <div 
              className="relative h-96 overflow-hidden cursor-pointer"
              onClick={handleCenterClick}
            >
              <img
                src={currentItem.image}
                alt={currentItem.name}
                className="w-full h-full object-cover"
              />
              
              {/* Special indicator for third image */}
              {currentIndex === 2 && (
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent flex items-center justify-center">
                  <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 animate-pulse">
                    <Sparkles className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              )}
              
              {/* Gradient Overlay */}
              <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/60 to-transparent" />
            </div>

            {/* Product Info */}
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-1 tracking-tight">
                    {currentItem.name}
                  </h3>
                  <p className="text-sm text-slate-600 font-medium">
                    {currentItem.brand} • {currentItem.color}
                  </p>
                </div>
                <button
                  onClick={() => toggleLike(currentItem)}
                  className={`p-2 rounded-full transition-all duration-200 ${
                    isLiked ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-400 hover:bg-red-100 hover:text-red-600'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                </button>
              </div>

              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-bold text-slate-700">{currentItem.rating}</span>
                </div>
                <div className="text-2xl font-black text-blue-600">
                  {currentItem.price}
                </div>
              </div>
            </div>
          </div>

          {/* Swipe Indicators */}
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <div className={`bg-red-500 text-white p-3 rounded-full shadow-lg transform transition-all duration-300 ${
              swipeDirection === 'right' ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
            }`}>
              <X className="w-6 h-6" />
            </div>
          </div>
          
          <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
            <div className={`bg-green-500 text-white p-3 rounded-full shadow-lg transform transition-all duration-300 ${
              swipeDirection === 'left' ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
            }`}>
              <Check className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={handleSwipeRight}
            disabled={isAnimating}
            className="flex-1 bg-white/80 backdrop-blur-xl border border-red-200 text-red-600 py-4 rounded-2xl font-bold text-lg hover:bg-red-50 transition-all duration-200 shadow-lg disabled:opacity-50"
          >
            Pass
          </button>
          <button
            onClick={handleSwipeLeft}
            disabled={isAnimating}
            className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-2xl font-bold text-lg hover:shadow-xl transition-all duration-200 shadow-lg disabled:opacity-50"
          >
            Add to Cart
          </button>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={prevItem}
            className="w-12 h-12 bg-white/80 backdrop-blur-xl rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <ArrowLeft className="w-5 h-5 text-blue-600" />
          </button>
          
          <div className="text-center">
            <div className="text-sm font-bold text-slate-700">
              {currentIndex + 1} of {fashionItems.length}
            </div>
            <div className="text-xs text-slate-500">Swipe to explore</div>
          </div>
          
          <button
            onClick={nextItem}
            className="w-12 h-12 bg-white/80 backdrop-blur-xl rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <ArrowRight className="w-5 h-5 text-blue-600" />
          </button>
        </div>

        {/* Tips */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl p-6 text-white text-center">
          <div className="text-sm font-bold mb-2">💡 Pro Tip</div>
          <div className="text-xs opacity-90">
            Swipe left to add to cart • Swipe right to pass • Tap the third item for details
          </div>
        </div>
      </div>

      {/* Cart Summary */}
      {cartItems.length > 0 && (
        <div className="fixed bottom-4 left-4 right-4 max-w-md mx-auto">
          <div className="bg-green-500 text-white p-4 rounded-2xl shadow-xl backdrop-blur-xl">
            <div className="text-center">
              <div className="text-sm font-bold mb-1">
                {cartItems.length} items in cart
              </div>
              <div className="text-xs opacity-90">
                Total: ${cartItems.reduce((sum, item) => sum + parseFloat(item.price.replace('$', '')), 0).toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FashionScrollPage;