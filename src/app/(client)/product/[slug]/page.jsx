// app/products/[slug]/page.js
import React from "react";
import { client } from "@/sanity/lib/client";
import Image from "next/image";
import AddToCartButton from "@/components/AddToCartButton";
import QuantitySelector from "@/components/QuantitySelector";
import SizeSelector from "@/components/SizeSelector";
import ProductDetails from "@/components/ProductDetails";

async function getProduct(slug) {
  const query = `*[_type == "product" && slug.current == "${slug}"][0] {
    _id,
    name,
    description,
    "image": image.asset->url,
    actualPrice,
    discountedPrice,
    "slug": slug.current,
    category,
    sizes
  }`;

  try {
    const product = await client.fetch(query);
    return product;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

const ProductPage = async ({ params }) => {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="">
    <ProductDetails product={product} />
    </div>
  );
};

export default ProductPage;