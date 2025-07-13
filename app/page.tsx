"use client";

import React, { useState, useRef } from 'react';
import { Camera, Upload, Sparkles, User, Zap, Target, ChevronRight, Star } from 'lucide-react';

const TryOnUploadPage = () => {
  const [selectedGenre, setSelectedGenre] = useState('');
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);
  const fileInputRef = useRef(null);

  const fashionGenres = [
    { id: 'casual', name: 'Casual Wear', icon: '👕', color: 'bg-gradient-to-br from-blue-500 to-blue-600', accent: 'from-blue-50 to-blue-100' },
    { id: 'formal', name: 'Formal Wear', icon: '👔', color: 'bg-gradient-to-br from-purple-500 to-purple-600', accent: 'from-purple-50 to-purple-100' },
    { id: 'streetwear', name: 'Street Style', icon: '🧥', color: 'bg-gradient-to-br from-orange-500 to-orange-600', accent: 'from-orange-50 to-orange-100' },
    { id: 'bohemian', name: 'Bohemian', icon: '👗', color: 'bg-gradient-to-br from-pink-500 to-pink-600', accent: 'from-pink-50 to-pink-100' },
    { id: 'minimalist', name: 'Minimalist', icon: '🤍', color: 'bg-gradient-to-br from-gray-500 to-gray-600', accent: 'from-gray-50 to-gray-100' },
    { id: 'vintage', name: 'Vintage', icon: '🕺', color: 'bg-gradient-to-br from-yellow-500 to-yellow-600', accent: 'from-yellow-50 to-yellow-100' },
    { id: 'athletic', name: 'Athletic', icon: '🏃', color: 'bg-gradient-to-br from-green-500 to-green-600', accent: 'from-green-50 to-green-100' },
    { id: 'business', name: 'Business', icon: '💼', color: 'bg-gradient-to-br from-indigo-500 to-indigo-600', accent: 'from-indigo-50 to-indigo-100' }
  ];

  const processingSteps = [
    { text: 'Analyzing your photo...', icon: <Target className="w-5 h-5" /> },
    { text: 'Detecting face structure...', icon: <User className="w-5 h-5" /> },
    { text: 'Analyzing body type...', icon: <Sparkles className="w-5 h-5" /> },
    { text: 'Matching fashion styles...', icon: <Zap className="w-5 h-5" /> },
    { text: 'Generating try-on looks...', icon: <Star className="w-5 h-5" /> }
  ];

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target.result);
        startProcessing();
      };
      reader.readAsDataURL(file);
    }
  };

  const startProcessing = () => {
    setIsProcessing(true);
    setProcessingStep(0);
    
    const stepInterval = setInterval(() => {
      setProcessingStep(prev => {
        if (prev >= processingSteps.length - 1) {
          clearInterval(stepInterval);
          setTimeout(() => {
            // Redirect to /scroll page
            window.location.href = '/scroll';
          }, 1500);
          return prev;
        }
        return prev + 1;
      });
    }, 2000);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  if (isProcessing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md mx-auto bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 text-center">
          {/* Walmart Logo */}
          <div className="mb-8">
            <div className="text-3xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2 tracking-tight">
              Try-On
            </div>
            <div className="text-sm text-slate-600 font-medium tracking-wide">Powered by Walmart</div>
          </div>

          {/* Processing Animation */}
          <div className="mb-8">
            <div className="w-28 h-28 mx-auto mb-8 relative">
              <div className="w-full h-full rounded-full border-4 border-blue-200/50 border-t-blue-600 animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-white animate-pulse" />
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              {processingSteps.map((step, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between p-4 rounded-xl transition-all duration-700 ${
                    index <= processingStep
                      ? 'bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border-l-4 border-blue-500 shadow-sm'
                      : 'bg-gray-50/50 text-gray-400'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`${index <= processingStep ? 'text-blue-600' : 'text-gray-400'} transition-colors duration-500`}>
                      {step.icon}
                    </div>
                    <span className="font-semibold text-sm tracking-wide">{step.text}</span>
                  </div>
                  {index <= processingStep && (
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="text-sm text-slate-600 font-medium tracking-wide">
            Creating your personalized fashion experience...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-10 pt-8">
          <div className="text-4xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-3 tracking-tight">
            Try-On
          </div>
          <div className="text-base text-slate-700 mb-2 font-semibold tracking-wide">AI Fashion Experience</div>
          <div className="text-xs text-blue-600 font-bold tracking-widest uppercase">Powered by Walmart</div>
        </div>

        {/* Genre Selection */}
        {!selectedGenre && (
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 p-7 mb-6">
            <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center tracking-tight">
              Choose Your Style
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {fashionGenres.map((genre) => (
                <button
                  key={genre.id}
                  onClick={() => setSelectedGenre(genre.id)}
                  className={`${genre.color} text-white rounded-2xl p-5 flex flex-col items-center gap-3 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl active:scale-95`}
                >
                  <span className="text-3xl filter drop-shadow-sm">{genre.icon}</span>
                  <span className="text-sm font-bold tracking-wide">{genre.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Upload Section */}
        {selectedGenre && !uploadedImage && (
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 p-7 mb-6">
            <div className="text-center mb-8">
              <div className="text-xl font-bold text-slate-800 mb-3 tracking-tight">
                Upload Your Photo
              </div>
              <div className="text-sm text-slate-600 font-medium tracking-wide">
                Get personalized {fashionGenres.find(g => g.id === selectedGenre)?.name} recommendations
              </div>
            </div>

            <div
              onClick={triggerFileInput}
              className="border-2 border-dashed border-blue-300 rounded-3xl p-10 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50/50 transition-all duration-300 backdrop-blur-sm"
            >
              <div className="mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Camera className="w-10 h-10 text-white" />
                </div>
                <div className="text-xl font-bold text-slate-800 mb-3 tracking-tight">
                  Take or Upload Photo
                </div>
                <div className="text-sm text-slate-600 font-medium tracking-wide">
                  Tap to capture or select from gallery
                </div>
              </div>
              
              <div className="flex justify-center gap-4">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl flex items-center gap-3 text-sm font-bold tracking-wide shadow-lg hover:shadow-xl transition-all duration-300">
                  <Upload className="w-5 h-5" />
                  Upload Photo
                </div>
              </div>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              capture="user"
            />
          </div>
        )}

        {/* Selected Genre Display */}
        {selectedGenre && (
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 p-5 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 ${fashionGenres.find(g => g.id === selectedGenre)?.color} rounded-xl flex items-center justify-center text-white shadow-lg`}>
                  <span className="text-lg">{fashionGenres.find(g => g.id === selectedGenre)?.icon}</span>
                </div>
                <div>
                  <div className="font-bold text-slate-800 tracking-tight">
                    {fashionGenres.find(g => g.id === selectedGenre)?.name}
                  </div>
                  <div className="text-xs text-slate-500 font-medium tracking-wide">Selected Style</div>
                </div>
              </div>
              <button
                onClick={() => setSelectedGenre('')}
                className="text-blue-600 text-sm font-bold hover:text-blue-800 tracking-wide transition-colors duration-200"
              >
                Change
              </button>
            </div>
          </div>
        )}

        {/* Tips */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-8 text-white text-center shadow-xl">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div className="text-base font-bold mb-3 tracking-wide">Pro Tips</div>
          <div className="text-sm opacity-90 font-medium tracking-wide leading-relaxed">
            • Face the camera directly<br />
            • Use good lighting<br />
            • Stand against a plain background
          </div>
        </div>
      </div>
    </div>
  );
};

export default TryOnUploadPage;