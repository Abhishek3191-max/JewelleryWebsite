import React, { useState, useEffect } from 'react';
import { Copy } from 'lucide-react';

// Material UI style icons as SVG components
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

export default function ProductDetails() {
  const [showLess, setShowLess] = useState(false);
  const [showPriceBreakupModal, setShowPriceBreakupModal] = useState(false);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (showPriceBreakupModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showPriceBreakupModal]);

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

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-100 to-blue-100 px-3 py-2 flex justify-between items-center">
          <h1 className="text-base font-semibold text-gray-800">Product Details</h1>
          <button 
            onClick={handlePriceBreakupClick}
            className="bg-purple-200 hover:bg-purple-300 text-purple-800 px-2 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer"
          >
            + PRICE BREAKUP
          </button>
        </div>

        {/* SKU */}
        <div className="px-3 py-2 border-b border-gray-100">
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <span>SKU JE10688-YGS3CI</span>
            <Copy className="w-3 h-3 text-gray-400 cursor-pointer hover:text-gray-600" />
          </div>
        </div>

        {/* Product Description */}
        <div className="px-3 py-2 border-b border-gray-100">
          <p className="text-xs text-gray-700">
            Set in 18 KT Yellow Gold(2.820 g) with diamonds (0.160 ct ,FG-SI)
          </p>
        </div>

        {/* Gold Card */}
        <div className="p-3">
          <div className="bg-orange-50 rounded-lg p-3 mb-3 border border-orange-100">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-5 h-5 bg-orange-200 rounded-full flex items-center justify-center">
                <GoldIcon />
              </div>
              <span className="font-medium text-gray-800 text-sm">GOLD</span>
            </div>
            
            <div className="grid grid-cols-3 gap-3 text-xs">
              <div>
                <p className="text-gray-600 mb-1">Dimensions</p>
                <p className="text-gray-800">Width : 9.90 mm</p>
                <p className="text-gray-800">Height : 13.7 mm</p>
              </div>
              <div>
                <p className="text-gray-600 mb-1">Weight</p>
                <p className="text-gray-800">Gross : 3.040 g</p>
              </div>
              <div>
                <p className="text-gray-600 mb-1">Purity</p>
                <p className="text-gray-800">18 KT</p>
              </div>
            </div>
          </div>

          {/* Diamond Card */}
          <div className="bg-blue-50 rounded-lg p-3 mb-3 border border-blue-100">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-5 h-5 bg-blue-200 rounded-full flex items-center justify-center text-blue-800">
                <DiamondIcon />
              </div>
              <span className="font-medium text-gray-800 text-sm">DIAMOND</span>
            </div>
            
            <div className="grid grid-cols-3 gap-3 text-xs">
              <div>
                <p className="text-gray-600 mb-1">Type</p>
                <p className="text-gray-800">FG-SI</p>
              </div>
              <div>
                <p className="text-gray-600 mb-1">Setting</p>
                <p className="text-gray-800">Setting : Micro Pave</p>
                <p className="text-gray-800">Total No. : 28</p>
              </div>
              <div>
                <p className="text-gray-600 mb-1">Total Weight</p>
                <p className="text-gray-800">0.160 ct</p>
              </div>
            </div>
          </div>

          {/* Gemstone Card */}
          <div className="bg-amber-50 rounded-lg p-3 mb-3 border border-amber-100">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-5 h-5 bg-amber-200 rounded-full flex items-center justify-center text-amber-800">
                <GemstoneIcon />
              </div>
              <span className="font-medium text-gray-800 text-sm">GEMSTONE</span>
            </div>
            
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <p className="text-gray-600 mb-1">Type</p>
                <p className="text-gray-800">Citrine (6.00 × 4.00 mm)</p>
              </div>
              <div>
                <p className="text-gray-600 mb-1">Total No.</p>
                <p className="text-gray-800">2</p>
              </div>
            </div>
          </div>
        </div>

        {/* Collapsible sections */}
        {!showLess && (
          <>
            {/* Manufacturer Section */}
            <div className="px-3 py-2 border-t border-gray-100">
              <p className="text-gray-600 text-xs mb-1">Manufactured by</p>
              <p className="text-gray-800 text-xs font-medium">CaratLane Trading Pvt Ltd.</p>
              <p className="text-gray-600 text-xs mt-1">
                4th & 5th Floor, 6/1, Pycrofts Garden Road, Nungambakkam, Chennai, Tamil Nadu - 600006
              </p>
            </div>

            {/* Quantity Section */}
            <div className="px-3 py-2 border-t border-gray-100">
              <p className="text-gray-600 text-xs mb-1">Quantity</p>
              <p className="text-gray-800 text-xs">1N</p>
            </div>

            {/* Country of Origin Section */}
            <div className="px-3 py-2 border-t border-gray-100">
              <p className="text-gray-600 text-xs mb-1">Country of Origin</p>
              <p className="text-gray-800 text-xs">India</p>
            </div>
          </>
        )}

        {/* Footer */}
        <div className="px-3 py-2 border-t border-gray-100">
          <button 
            onClick={() => setShowLess(!showLess)}
            className="text-purple-600 hover:text-purple-800 text-xs font-medium transition-colors"
          >
            {showLess ? "Show More" : "Show Less"}
          </button>
        </div>
      </div>

      {/* Price Breakup Modal */}
      {showPriceBreakupModal && (
       
        <div 
    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    onClick={handleCloseModal}
  >
    <div 
      className="bg-white w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-lg"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Modal Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-purple-800">Zala Diamond Dancing Hoops</h2>
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
    </div>
  );
}