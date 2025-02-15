import Image from "next/image";
import Link from "next/link";

const ProductCard = ({ product }) => {
  return (
    <Link href={`/product/${product.slug}`} className="group">
      <div className="w-[360px] sm:max-w-72 cursor-pointer transition-transform duration-200 ease-in-out group-hover:-translate-y-1">
        <div className="relative w-full aspect-square overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
          />
          {product.discountedPrice < product.actualPrice && (
            <span className="absolute bottom-2 left-2 bg-blue-600 text-white px-3 py-1 text-sm rounded-full">
              Sale
            </span>
          )}
        </div>
        {/* Product Details */}
        <div className="h-[120px] mt-4 flex flex-col">
          <h3 className="text-lg font-medium line-clamp-2">{product.name}</h3>
          <div>
            <p className="text-gray-500 line-through">
              Rs.{product.actualPrice.toLocaleString()} PKR
            </p>
            <p className="text-lg font-semibold">
              Rs.{product.discountedPrice.toLocaleString()} PKR
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
