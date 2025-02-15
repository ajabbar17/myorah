import ProductCard from "./ProductCard";
import { client } from "@/sanity/lib/client";

// Function to fetch products
async function getProducts() {
  const query = `*[_type == "product"] | order(_createdAt desc) [0...12] {
    _id,
    name,
    "image": image.asset->url,
    actualPrice,
    discountedPrice,
    "slug": slug.current
  }`;

  try {
    const products = await client.fetch(query);
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

const ProductList = async () => {
  const products = await getProducts();

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
    </div>
  );
};

export default ProductList;
