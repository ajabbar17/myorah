"use client";

import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { client } from "@/sanity/lib/client";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch products from Sanity
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const query = `*[_type == "product"] | order(_createdAt desc) [0...23] {
          _id,
          name,
          "image": image.asset->url,
          actualPrice,
          discountedPrice,
          "slug": slug.current
        }`;

        const productsData = await client.fetch(query);
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-black"></div>
      </div>
    );
  }

  return (
    <div className="w-full xl:w-[90%] mx-auto py-10">
      <h2 className="text-3xl font-medium text-center mb-6">
        Featured Products
      </h2>
      <div className="flex flex-wrap md:ps-12 justify-center md:justify-start xl:ps-12 gap-6">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

      {products.length === 0 && (
        <p className="text-center text-gray-500 my-8">No products found</p>
      )}
    </div>
  );
};

export default ProductList;
