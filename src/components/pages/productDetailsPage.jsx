
import React, { useEffect, useState } from "react";
import { Heart, Share2, ShoppingCart, Star, Shield, Truck, Eye, Copy } from 'lucide-react';
import Header from '../Header1';
import NavigationBar from '../navigationbar';
import Footer from '../Footer1';
import CustomerReviewSection from '../customerReview';
import { Link } from 'react-router-dom';
import WarrantyFeatures from "../trustBadge";
import BannerSlidder from "../bannerSlidder";

// Material UI style icons as SVG components for ProductDetails
const GoldIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <circle cx="12" cy="12" r="8" />
  </svg>
);

const DiamondIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6 2L12 8L18 2L22 6L12 22L2 6L6 2Z" />
  </svg>
);

const GemstoneIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.5 3.5L22 12L17.5 20.5L12 18L6.5 20.5L2 12L6.5 3.5L12 6L17.5 3.5Z" />
  </svg>
);


const ProductPage = () => {
  const [productData] = useState({
    id: "UE06254",
    name: "Helio Shine Gemstone Hoop Earrings",
    price: 51264,
    originalPrice: 58584,
    discount: 30,
    rating: 5,
    reviewCount: 10,
    images: [
      "https://cdn.caratlane.com/media/catalog/product/U/E/UE06254-1R0000_9_lar.jpg",
      "https://cdn.caratlane.com/media/catalog/product/U/E/UE06254-1R0000_4_lar.jpg",
      "https://cdn.caratlane.com/media/catalog/product/U/E/UE06254-1R0000_3_lar.jpg",
      "https://cdn.caratlane.com/media/catalog/product/U/E/UE06254-1R0000_6_lar.jpg",
      "https://cdn.caratlane.com/media/catalog/product/U/E/UE06254-1R0000_8_lar.jpg",
      "https://cdn.caratlane.com/media/catalog/product/U/E/UE06254-1R0000_7_lar.jpg",
      "https://cdn.caratlane.com/media/catalog/product/U/E/UE06254-1R0000_9_lar.jpg",
      "https://cdn.caratlane.com/media/catalog/product/U/E/UE06254-1R0000_4_lar.jpg",
      "https://cdn.caratlane.com/media/catalog/product/U/E/UE06254-1R0000_3_lar.jpg",
    ],
    description: "Embrace a whimsical touch with the Helio Shine Gemstone Hoop Earrings from CaratLane. These earrings feature elegant gemstone designs that add a sophisticated charm to your look.",
    specifications: {
      material: "GOLD",
      dimensions: "Width - 7.95 mm, Height - 8.69 mm",
      weight: "0.630 g",
      purity: "14 KT"
    },
    manufacturer: "CaratLane Trading Pvt Ltd",
    features: [
      "100% Certified",
      "Lifetime Exchange",
      "One Year Warranty",
      "15 Day Money-Back"
    ],
    inStock: true,
    fastDelivery: true,
    deliveryTime: "Tomorrow 6PM-8PM"
  });

  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [showLess, setShowLess] = useState(false);
  const [showPriceBreakupModal, setShowPriceBreakupModal] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // Customization states
  const [showCustomizationModal, setShowCustomizationModal] = useState(false);
  const [selectedMetal, setSelectedMetal] = useState("18 KT Yellow Gold");
  const [selectedDiamond, setSelectedDiamond] = useState("IJ-SI");
  const [selectedSize, setSelectedSize] = useState("5");
  const [estimatedPrice, setEstimatedPrice] = useState(158127);
  const [originalEstimatedPrice, setOriginalEstimatedPrice] = useState(195909);

  const formatPrice = (price) => `₹${price.toLocaleString()}`;
  const calculateSavings = () => productData.originalPrice - productData.price;

  // Detect mobile screen
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (showCustomizationModal || showPriceBreakupModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup function to reset overflow when component unmounts
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showCustomizationModal, showPriceBreakupModal]);

  // Handle dot click
  const handleDotClick = (index) => {
    setSelectedImage(index);
  };

  // Handle swipe/touch
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && selectedImage < productData.images.length - 1) {
      setSelectedImage(selectedImage + 1);
    }
    if (isRightSwipe && selectedImage > 0) {
      setSelectedImage(selectedImage - 1);
    }
  };

  const handlePriceBreakupClick = () => {
    setShowPriceBreakupModal(true);
  };

  const handleCloseModal = () => {
    setShowPriceBreakupModal(false);
  };

  // Close modal when clicking on backdrop
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleCloseModal();
    }
  };
  const handleCopySKU = () => {
    navigator.clipboard.writeText("SKU JE10688-YGS3CI");
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000); // Hide after 2 seconds
  };

  // Product Details Component with show less/more functionality and price breakup modal
  const ProductDetailsSection = () => (
  //  <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
  <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden self-start">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-100 to-blue-100 px-2 py-1.5 md:px-3 md:py-2 flex justify-between items-center">
        <h1 className="text-sm md:text-base font-semibold text-gray-800">Product Details</h1>
        <button
          onClick={handlePriceBreakupClick}
          className="bg-purple-200 hover:bg-purple-300 text-purple-800 px-1.5 py-0.5 md:px-2 md:py-1 rounded-full text-xs font-medium transition-colors cursor-pointer"
        >
          + PRICE BREAKUP
        </button>
      </div>

      {/* SKU */}
      {/* <div className="px-2 py-1.5 md:px-3 md:py-2 border-b border-gray-100">
        <div className="flex items-center gap-2 text-xs text-gray-600">
          <span>SKU JE10688-YGS3CI</span>
          <Copy className="w-3 h-3 text-gray-400 cursor-pointer hover:text-gray-600" />
        </div>
      </div>
       */}
      {/* SKU Section with purple text and working copy */}
      <div className="px-3 py-2 border-b border-gray-100">
        <div className="flex items-center gap-2 text-xs">
          <span className="text-purple-600 font-medium">SKU JE10688-YGS3CI</span>
          <button onClick={handleCopySKU} className="text-gray-400 hover:text-gray-600 transition-colors">
            <Copy className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Toast Notification */}
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg z-50">
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-sm">SKU copied to clipboard!</span>
          </div>
        </div>
      )}

      {/* Product Description */}
      <div className="px-2 py-1.5 md:px-3 md:py-2 border-b border-gray-100">
        <p className="text-xs text-gray-700">
          Set in 18 KT Yellow Gold(2.820 g) with diamonds (0.160 ct ,FG-SI)
        </p>
      </div>

      {/* Gold Card */}
      <div className="p-2 md:p-3">
        <div className="bg-orange-50 rounded-lg p-2 md:p-3 mb-2 md:mb-3 border border-orange-100">
          <div className="flex items-center gap-2 mb-1.5 md:mb-2">
            <div className="w-4 h-4 md:w-5 md:h-5 bg-orange-200 rounded-full flex items-center justify-center">
              <GoldIcon />
            </div>
            <span className="font-medium text-gray-800 text-xs md:text-sm">GOLD</span>
          </div>

          <div className="grid grid-cols-3 gap-2 md:gap-3 text-xs">
            <div>
              <p className="text-gray-600 mb-0.5 md:mb-1">Dimensions</p>
              <p className="text-gray-800">Width : 9.90 mm</p>
              <p className="text-gray-800">Height : 13.7 mm</p>
            </div>
            <div>
              <p className="text-gray-600 mb-0.5 md:mb-1">Weight</p>
              <p className="text-gray-800">Gross : 3.040 g</p>
            </div>
            <div>
              <p className="text-gray-600 mb-0.5 md:mb-1">Purity</p>
              <p className="text-gray-800">18 KT</p>
            </div>
          </div>
        </div>

        {/* Diamond Card */}
        <div className="bg-blue-50 rounded-lg p-2 md:p-3 mb-2 md:mb-3 border border-blue-100">
          <div className="flex items-center gap-2 mb-1.5 md:mb-2">
            <div className="w-4 h-4 md:w-5 md:h-5 bg-blue-200 rounded-full flex items-center justify-center text-blue-800">
              <DiamondIcon />
            </div>
            <span className="font-medium text-gray-800 text-xs md:text-sm">DIAMOND</span>
          </div>

          <div className="grid grid-cols-3 gap-2 md:gap-3 text-xs">
            <div>
              <p className="text-gray-600 mb-0.5 md:mb-1">Type</p>
              <p className="text-gray-800">FG-SI</p>
            </div>
            <div>
              <p className="text-gray-600 mb-0.5 md:mb-1">Setting</p>
              <p className="text-gray-800">Setting : Micro Pave</p>
              <p className="text-gray-800">Total No. : 28</p>
            </div>
            <div>
              <p className="text-gray-600 mb-0.5 md:mb-1">Total Weight</p>
              <p className="text-gray-800">0.160 ct</p>
            </div>
          </div>
        </div>

        {/* Gemstone Card */}
        <div className="bg-amber-50 rounded-lg p-2 md:p-3 mb-2 md:mb-3 border border-amber-100">
          <div className="flex items-center gap-2 mb-1.5 md:mb-2">
            <div className="w-4 h-4 md:w-5 md:h-5 bg-amber-200 rounded-full flex items-center justify-center text-amber-800">
              <GemstoneIcon />
            </div>
            <span className="font-medium text-gray-800 text-xs md:text-sm">GEMSTONE</span>
          </div>

          <div className="grid grid-cols-2 gap-2 md:gap-3 text-xs">
            <div>
              <p className="text-gray-600 mb-0.5 md:mb-1">Type</p>
              <p className="text-gray-800">Citrine (6.00 × 4.00 mm)</p>
            </div>
            <div>
              <p className="text-gray-600 mb-0.5 md:mb-1">Total No.</p>
              <p className="text-gray-800">2</p>
            </div>
          </div>
        </div>
      </div>

      {/* Collapsible sections - shown when showLess is false */}
      {!showLess && (
        <>
          {/* Manufacturer Section */}
          <div className="px-2 py-1.5 md:px-3 md:py-2 border-t border-gray-100">
            <p className="text-gray-600 text-xs mb-0.5 md:mb-1">Manufactured by</p>
            <p className="text-gray-800 text-xs font-medium">CaratLane Trading Pvt Ltd.</p>
            <p className="text-gray-600 text-xs mt-0.5 md:mt-1">
              4th & 5th Floor, 6/1, Pycrofts Garden Road, Nungambakkam, Chennai, Tamil Nadu - 600006
            </p>
          </div>

          {/* Quantity Section */}
          <div className="px-2 py-1.5 md:px-3 md:py-2 border-t border-gray-100">
            <p className="text-gray-600 text-xs mb-0.5 md:mb-1">Quantity</p>
            <p className="text-gray-800 text-xs">1N</p>
          </div>

          {/* Country of Origin Section */}
          <div className="px-2 py-1.5 md:px-3 md:py-2 border-t border-gray-100">
            <p className="text-gray-600 text-xs mb-0.5 md:mb-1">Country of Origin</p>
            <p className="text-gray-800 text-xs">India</p>
          </div>
        </>
      )}

      {/* Footer with working toggle */}
      <div className="px-2 py-1.5 md:px-3 md:py-2 border-t border-gray-100">
        <button
          onClick={() => setShowLess(!showLess)}
          className="text-purple-600 hover:text-purple-800 text-xs font-medium transition-colors"
        >
          {showLess ? "Show More" : "Show Less"}
        </button>
      </div>
      {/* Certification Section */}
<div className="px-2 py-1.5 md:px-3 md:py-2 border-t border-gray-100">
  <div className="flex items-center justify-between space-x-2">
    {/* BIS Certification */}
    <div className="flex flex-col items-center text-center flex-1">
      <img 
        src="https://cdn.caratlane.com/media/static/images/web/BIS_-_Bureau_of_Indian_Standards-1.png" 
        alt="BIS Certified" 
        className="h-5 md:h-6 object-contain mb-1"
      />
      <div className="text-xs text-gray-700">
        <div className="font-medium text-xs">BIS*</div>
        <div className="text-xs">Hallmarked Jewellery</div>
      </div>
    </div>

    {/* TATA Certification */}
    <div className="flex flex-col items-center text-center flex-1">
      <img 
        src="https://cdn.caratlane.com/media/static/images/web/Tata-Certified-1.png" 
        alt="Tata Certified" 
        className="h-5 md:h-6 object-contain mb-1"
      />
      <div className="text-xs text-gray-700">
        <div className="font-medium text-xs">Trust of TATA</div>
        <div className="text-xs">Spirit of CaratLane</div>
      </div>
    </div>

    {/* 100% Certified */}
    <div className="flex flex-col items-center text-center flex-1">
      <img 
        src="https://cdn.caratlane.com/media/static/images/web/Certificate-2.png" 
        alt="Certificate" 
        className="h-5 md:h-6 object-contain mb-1"
      />
      <div className="text-xs text-gray-700">
        <div className="font-medium text-xs">100% Certified</div>
        <div className="text-xs">by CaratLane</div>
      </div>
    </div>
  </div>
</div>
    </div>
  );


  const handleImageClick = (index) => {
    setSelectedImage(index % productData.images.length);
  };

  const handleWishlistClick = (e) => {
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      {/* <NavigationBar /> */}

      {/* Fixed Container - Reduced padding for mobile */}
      <div className="w-full px-2 sm:px-4 lg:px-8 xl:px-12 py-2 md:py-4">
        {/* <div className="grid grid-cols-1 lg:grid-cols-[70%_30%] gap-3 md:gap-6"> */}
         <div className="grid grid-cols-1 lg:grid-cols-[70%_30%] gap-3 md:gap-6 items-start">

          {/* Image Gallery */}
          <div className="space-y-2 md:space-y-3">
            {/* Mobile Image Slider */}
            <div className="md:hidden relative -mx-2 sm:-mx-4">
              {/* Main Image Container */}
              <div className="relative bg-white overflow-hidden">
                <div
                  className="w-full h-96 overflow-hidden cursor-pointer"
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                >
                  <img
                    src={productData.images[selectedImage]}
                    alt={`${productData.name} ${selectedImage + 1}`}
                    className="w-full h-full object-cover transition-transform duration-300"
                  />
                </div>
                {/* BESTSELLER Badge - Bottom Left */}
                <div className="absolute bottom-2 left-2 z-10">
                  <span className="bg-yellow-400 text-black text-xs font-semibold px-1.5 py-0.5 rounded">
                    BESTSELLER
                  </span>
                </div>

                {/* Custom Dots - Purple Color */}
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
                  <div className="flex space-x-1">
                    {productData.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => handleDotClick(index)}
                        className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full transition-all duration-200 ${index === selectedImage
                            ? 'bg-purple-500 shadow-lg'
                            : 'bg-gray-300 bg-opacity-70 hover:bg-purple-300'
                          }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Rating in bottom right */}
                <div className="absolute bottom-2 right-2 bg-white bg-opacity-90 backdrop-blur-sm rounded px-1.5 py-0.5">
                  <div className="flex items-center space-x-1">
                    <Star className="w-3 h-3 text-yellow-400 fill-current" />
                    <span className="text-xs font-medium text-gray-800">{productData.rating}</span>
                    <span className="text-xs text-gray-600">|</span>
                    <span className="text-xs text-gray-600">{productData.reviewCount}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop View - Updated to show 10 images with increased height */}
            <div className="hidden md:block">
              {/* Desktop: Image Grid - 2 columns × 5 rows for 10 images */}
              <div className="grid grid-cols-2 gap-3">
                {(() => {
                  // Create array of 10 images, repeat if needed
                  const displayImages = [...productData.images];
                  while (displayImages.length < 8) {
                    displayImages.push(...productData.images);
                  }
                  return displayImages.slice(0, 8).map((image, index) => (
                    <div
                      key={index}
                      onClick={() => handleImageClick(index)}
                      className={`relative bg-white rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${selectedImage === (index % productData.images.length)
                          ? "border-purple-500 shadow-md"
                          : "border-gray-200 hover:border-gray-300"
                        }`}
                    >
                      <div className="w-full h-100 overflow-hidden">
                        <img
                          src={image}
                          alt={`${productData.name} ${index + 1}`}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      {index === 0 && (
                        <div className="absolute top-2 right-2">
                          <button
                            onClick={(e) => handleWishlistClick(e)}
                            className={`p-1.5 rounded-full bg-white shadow-md ${isWishlisted ? "text-red-500" : "text-gray-400"
                              } hover:text-red-500 transition-colors`}
                          >
                            <Heart className={`w-3 h-3 ${isWishlisted ? "fill-current" : ""}`} />
                          </button>
                        </div>
                      )}
                    </div>
                  ));
                })()}
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-2 md:space-y-4">
            {/* Action Icons Row - Mobile Only */}
            <div className="md:hidden flex items-center justify-between px-1">
              <div className="flex items-center space-x-2">
                {/* Heart/Like Icon */}
                <button className="p-1.5 text-gray-600 hover:text-purple-500 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
                {/* Share Icon */}
                <button className="p-1.5 text-gray-600 hover:text-purple-500 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                  </svg>
                </button>
                {/* Compare/Copy Icon */}
                <button className="p-1.5 text-gray-600 hover:text-purple-500 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Pricing Section */}
            <div className="space-y-1 px-1 md:px-0">
              <div className="flex items-center space-x-2">
                <span className="text-lg md:text-xl font-bold text-gray-900">
                  {formatPrice(productData.price)}
                </span>
                <span className="text-xs md:text-sm text-gray-500 line-through">
                  {formatPrice(productData.originalPrice)}
                </span>
              </div>
              <p className="text-xs md:text-sm text-gray-600">
                (MRP Inclusive of all taxes)
              </p>
            </div>

            {/* Product Name */}
            <div className="px-1 md:px-0">
              <h1 className="text-base md:text-lg lg:text-xl font-medium text-gray-900 mb-1 md:mb-2">
                {productData.name}
              </h1>
            </div>

            <div className="-mx-1 md:mx-0 md:rounded-lg">
              <div className="bg-red-50 border-l-4 border-red-500 p-2 md:p-3 rounded-r-lg">
                <div className="flex items-center">
                  <span className="text-xs md:text-sm font-medium text-red-800">
                    Flat {productData.discount}% off on Diamond Prices
                  </span>
                </div>
              </div>
            </div>

            {/* Customization Options */}
            <div className="flex items-stretch bg-white border border-yellow-200 rounded-lg overflow-hidden mx-1 md:mx-0">
              {/* Metal Section */}
              <button
                onClick={() => setShowCustomizationModal(true)}
                className="flex-1 p-2 md:p-3 text-center border-r border-yellow-200 hover:bg-gray-50 transition-colors"
              >
                <div className="text-xs text-gray-500 mb-0.5 md:mb-1">Metal</div>
                <div className="text-xs md:text-sm font-medium text-gray-800">{selectedMetal}</div>
              </button>

              {/* Diamond Section */}
              <button
                onClick={() => setShowCustomizationModal(true)}
                className="flex-1 p-2 md:p-3 text-center border-r border-yellow-200 hover:bg-gray-50 transition-colors"
              >
                <div className="text-xs text-gray-500 mb-0.5 md:mb-1">Diamond</div>
                <div className="text-xs md:text-sm font-medium text-gray-800">{selectedDiamond}</div>
              </button>

              {/* Customize Button */}
              <button
                onClick={() => setShowCustomizationModal(true)}
                className="bg-yellow-400 px-4 md:px-6 flex items-center justify-center flex-shrink-0 hover:bg-yellow-500 transition-colors"
              >
                <span className="text-xs md:text-sm font-bold text-black whitespace-nowrap">CUSTOMISE</span>
              </button>
            </div>

            {/* Desktop Add to Cart Button */}
            <div className="hidden md:block">
              <div className="flex items-center space-x-3">
                <button
                  className="flex-1 text-white py-3 px-6 rounded-lg font-semibold text-sm transition-colors flex items-center justify-center space-x-2"
                  style={{ background: 'linear-gradient(90deg, #E56EEB -13.59%, #8863FB 111.41%)' }}
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>ADD TO CART</span>
                </button>

                {/* Heart Icon */}
                <button className="p-3 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors">
                  <Heart className={`w-5 h-5 ${isWishlisted ? "text-red-500 fill-current" : "text-gray-600"}`} />
                </button>

                {/* Share Icon */}
                <button className="p-3 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors">
                  <Share2 className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Product Details Section */}
             <div className="self-start">
      <ProductDetailsSection />
    </div>
          </div>
        </div>
      </div>

      {/* Full-width sections */}
      <div className="w-full">
        
        <WarrantyFeatures/>
        <BannerSlidder/>
        <CustomerReviewSection />
        <Footer />
      </div>

      {/* Mobile Sticky Footer - Reduced padding */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-2 z-40">
        <div className="flex justify-end">
          <button
            className="w-full text-white py-2.5 px-4 rounded-lg font-semibold text-sm transition-colors flex items-center justify-center space-x-2"
            style={{ background: 'linear-gradient(90deg, #E56EEB -13.59%, #8863FB 111.41%)' }}
          >
            <ShoppingCart className="w-4 h-4" />
            <span>ADD TO CART</span>
          </button>
        </div>
      </div>

      {/* Price Breakup Modal */}
      {showPriceBreakupModal && (

        // <div className="fixed inset-0 backdrop-blur-sm bg-[#77778870] bg-opacity-10 z-50 flex items-end md:items-stretch md:justify-end overflow-hidden">
        <div
          className="fixed inset-0 backdrop-blur-sm bg-[#77778870] bg-opacity-10 z-50 flex items-end md:items-stretch md:justify-end overflow-hidden"
          onClick={handleBackdropClick}
        >
          <div className={`bg-white w-full md:max-w-lg md:mx-0 h-auto md:h-full max-h-[80vh] md:max-h-full rounded-t-3xl md:rounded-none md:rounded-l-lg overflow-y-auto transform transition-transform duration-300 ease-in-out ${showPriceBreakupModal
              ? 'translate-y-0 md:translate-x-0'
              : 'translate-y-full md:translate-x-full'
            }`}>
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-purple-800">Helio Shine Gemstone Hoops Earings</h2>
                <button
                  onClick={handleCloseModal}
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-4 space-y-6">
              {/* Gold Price Breakup Section */}
              <div>
                <h3 className="text-sm font-semibold text-gray-800 mb-4">GOLD PRICE BREAKUP</h3>

                {/* Table Header */}
                <div className="grid grid-cols-4 gap-2 mb-3 text-xs font-medium text-purple-600">
                  <div>COMPONENT</div>
                  <div>RATE</div>
                  <div>WEIGHT</div>
                  <div>VALUE</div>
                </div>

                {/* Gold Rows */}
                <div className="space-y-3">
                  {/* 18 KT Rose Gold */}
                  <div className="grid grid-cols-4 gap-2 text-xs text-gray-800">
                    <div>18 KT Rose Gold</div>
                    <div>₹7,634 / g</div>
                    <div className="flex items-center gap-1">
                      5.510 g
                      <svg className="w-3 h-3 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>₹42,063</div>
                  </div>

                  {/* Total Gold Value */}
                  <div className="grid grid-cols-4 gap-2 text-xs text-gray-800 font-medium">
                    <div>Total Gold Value</div>
                    <div>-</div>
                    <div>-</div>
                    <div>₹42,063</div>
                  </div>

                  {/* Diamond */}
                  <div className="grid grid-cols-4 gap-2 text-xs text-gray-800">
                    <div>FG-SI Round-26 Nos.</div>
                    <div>-</div>
                    <div className="flex items-center gap-1">
                      0.190 ct
                      <svg className="w-3 h-3 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      ₹19,684 <span className="text-gray-400 line-through text-xs">₹28,120</span>
                    </div>
                  </div>

                  {/* Total Diamond Value */}
                  <div className="grid grid-cols-4 gap-2 text-xs text-gray-800 font-medium">
                    <div>Total Diamond Value</div>
                    <div>-</div>
                    <div>-</div>
                    <div>
                      ₹19,684 <span className="text-gray-400 line-through text-xs">₹28,120</span>
                    </div>
                  </div>

                  {/* Making Charges */}
                  <div className="grid grid-cols-4 gap-2 text-xs text-gray-800">
                    <div>Making Charges</div>
                    <div>-</div>
                    <div>-</div>
                    <div>₹14,099</div>
                  </div>

                  {/* Subtotal */}
                  <div className="grid grid-cols-4 gap-2 text-xs text-gray-800 font-medium border-t pt-2">
                    <div>Subtotal</div>
                    <div>-</div>
                    <div>-</div>
                    <div>
                      ₹75,846
                      <div className="text-gray-400 line-through text-xs">₹84,282</div>
                    </div>
                  </div>

                  {/* Tax */}
                  <div className="grid grid-cols-4 gap-2 text-xs text-gray-800">
                    <div>Tax</div>
                    <div>-</div>
                    <div>-</div>
                    <div>
                      ₹2,275 <span className="text-gray-400 line-through text-xs">₹2,528</span>
                    </div>
                  </div>

                  {/* Grand Total */}
                  <div className="grid grid-cols-4 gap-2 text-sm text-gray-800 font-bold border-t pt-2">
                    <div>Grand Total</div>
                    <div>-</div>
                    <div>-</div>
                    <div>₹78,121</div>
                  </div>
                </div>
              </div>

              {/* Diamond Price Breakup Section */}
              <div>
                <h3 className="text-sm font-semibold text-gray-800 mb-4">DIAMOND PRICE BREAKUP</h3>

                {/* Diamond Table Header */}
                <div className="grid grid-cols-4 gap-2 mb-3 text-xs font-medium text-purple-600">
                  <div>DIAMOND TYPE</div>
                  <div>SETTING</div>
                  <div>COUNT</div>
                  <div>WEIGHT</div>
                </div>

                {/* Diamond Row */}
                <div className="grid grid-cols-4 gap-2 text-xs text-gray-800">
                  <div>FG-SI</div>
                  <div>Prong</div>
                  <div>26</div>
                  <div>0.190 ct</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Customization Modal */}
      {showCustomizationModal && (
        <div className="fixed inset-0 backdrop-blur-sm bg-[#77778870] bg-opacity-10 z-50 flex items-end md:items-stretch md:justify-end overflow-hidden">
          <div className={`bg-white w-full md:max-w-lg md:mx-0 h-auto md:h-full max-h-[80vh] md:max-h-full rounded-t-3xl md:rounded-none md:rounded-l-lg overflow-y-auto transform transition-transform duration-300 ease-in-out ${showCustomizationModal
              ? 'translate-y-0 md:translate-x-0'
              : 'translate-y-full md:translate-x-full'
            }`}>
            {/* Modal Header - Reduced padding for mobile */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-2 md:p-3 rounded-t-3xl md:rounded-t-lg">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="text-xs text-gray-500">Estimated price</div>
                  <div className="flex items-center space-x-2">
                    <span className="text-base md:text-lg font-bold text-gray-900">₹{estimatedPrice.toLocaleString()}</span>
                    <span className="text-xs text-gray-500 line-through">₹{originalEstimatedPrice.toLocaleString()}</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5 md:mt-1">Delivery by</div>
                  <div className="text-sm font-semibold text-gray-900">8th Sep</div>
                </div>
                <button
                  onClick={() => setShowCustomizationModal(false)}
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-2 md:p-3 space-y-3 md:space-y-4">
              {/* Choice of Metal */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2 md:mb-3">Choice of Metal</h3>
                <div className="grid grid-cols-3 gap-1.5 md:gap-2">
                  {["18 KT Rose Gold", "18 KT White Gold", "18 KT Yellow Gold"].map((metal) => (
                    <button
                      key={metal}
                      onClick={() => setSelectedMetal(metal)}
                      className={`p-1.5 md:p-2 rounded-lg border-2 text-center transition-all ${selectedMetal === metal
                          ? "border-purple-300 bg-purple-50"
                          : "border-gray-200 hover:border-gray-300"
                        }`}
                    >
                      <div className="text-xs font-medium text-gray-900">{metal.replace('18 KT ', '')}</div>
                      <div className="text-xs text-gray-500 mt-0.5 md:mt-1">Made to Order</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Diamond Quality */}
              <div>
                <div className="flex items-center justify-between mb-2 md:mb-3">
                  <h3 className="text-sm font-medium text-gray-900">Diamond Quality</h3>
                  <button className="text-xs text-purple-600 font-medium">DIAMOND GUIDE</button>
                </div>
                <div className="grid grid-cols-1 gap-1.5 md:gap-2">
                  {["IJ-SI"].map((diamond) => (
                    <button
                      key={diamond}
                      onClick={() => setSelectedDiamond(diamond)}
                      className={`w-1/6 p-1.5 md:p-2 rounded-lg border-2 text-center transition-all ${selectedDiamond === diamond
                          ? "border-purple-300 bg-purple-50"
                          : "border-gray-200 hover:border-gray-300"
                        }`}
                    >
                      <div className="text-xs font-medium text-gray-900">{diamond}</div>
                      <div className="text-xs text-gray-500 mt-0.5 md:mt-1">Made to Order</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Select Size */}
              <div>
                <div className="flex items-center justify-between mb-2 md:mb-3">
                  <h3 className="text-sm font-medium text-gray-900">Select Size</h3>
                  <button className="text-xs text-purple-600 font-medium">SIZE GUIDE</button>
                </div>

                {/* All Sizes in Single Scrollable Row */}
                <div className="overflow-x-auto">
                  <div className="flex space-x-1.5 md:space-x-2 pb-2" style={{ minWidth: "800px" }}>
                    {[
                      { size: "5", mm: "44.8 mm", status: "Made to Order" },
                      { size: "6", mm: "45.9 mm", status: "Made to Order" },
                      { size: "7", mm: "47.1 mm", status: "Only 1 left!" },
                      { size: "8", mm: "48.1 mm", status: "Made to Order" },
                      { size: "9", mm: "49.0 mm", status: "Made to Order" },
                      { size: "10", mm: "50.0 mm", status: "Only 1 left!" },
                      { size: "11", mm: "50.9 mm", status: "Made to Order" },
                      { size: "12", mm: "51.8 mm", status: "Only 2 left!" },
                      { size: "13", mm: "52.8 mm", status: "Made to Order" },
                      { size: "14", mm: "54.0 mm", status: "Made to Order" },
                      { size: "15", mm: "55.0 mm", status: "Made to Order" },
                      { size: "16", mm: "55.9 mm", status: "Made to Order" },
                      { size: "17", mm: "56.9 mm", status: "Only 2 left!" },
                      { size: "18", mm: "57.8 mm", status: "Made to Order" },
                      { size: "19", mm: "59.1 mm", status: "Made to Order" },
                      { size: "20", mm: "60.0 mm", status: "Only 1 left!" },
                      { size: "21", mm: "60.9 mm", status: "Made to Order" },
                      { size: "22", mm: "61.9 mm", status: "Made to Order" },
                      { size: "23", mm: "62.8 mm", status: "Made to Order" },
                      { size: "24", mm: "63.8 mm", status: "Made to Order" },
                      { size: "25", mm: "64.7 mm", status: "Made to Order" }
                    ].map((item) => (
                      <button
                        key={item.size}
                        onClick={() => setSelectedSize(item.size)}
                        className={`p-[-30px] md:p-2 rounded-lg border-2 text-center transition-all flex-shrink-0 w-14 md:w-16 ${selectedSize === item.size
                            ? "border-purple-300 bg-purple-50"
                            : "border-gray-200 hover:border-gray-300"
                          }`}
                      >
                        <div className="text-sm font-bold text-gray-900">{item.size}</div>
                        <div className="text-xs text-gray-600">{item.mm}</div>
                        <div className={`text-xs mt-0.5 md:mt-1 ${item.status.includes('left') ? 'text-red-600' : 'text-gray-500'}`}>
                          {item.status}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Confirm Button - Reduced padding for mobile */}
            <div className="sticky bottom-0 bg-white border-t border-gray-200 p-2 md:p-3">
              <button
                onClick={() => setShowCustomizationModal(false)}
                className="w-full bg-purple-600 text-white py-2 md:py-2.5 rounded-lg font-semibold hover:bg-purple-700 transition-colors text-sm"
              >
                CONFIRM CUSTOMISATION
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;