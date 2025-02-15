// components/SizeSelector.js
"use client";

const SizeSelector = ({ sizes, onSizeChange, selectedSize: initialSize }) => {
  return (
    <div className="mb-8">
      <p className="text-gray-700 mb-2">Size</p>
      <div className="flex flex-wrap gap-2">
        {sizes.map((size) => (
          <button
            key={size}
            className={`w-10 h-10 border rounded-full flex items-center justify-center transition-colors ${
              initialSize === size
                ? "border-black bg-black text-white"
                : "border-gray-300 hover:border-black"
            }`}
            onClick={() => onSizeChange(size)}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SizeSelector;
