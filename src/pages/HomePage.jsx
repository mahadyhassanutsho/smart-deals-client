import { Suspense } from "react";

import { getLatestProducts } from "../services/server";

import Loading from "../components/Loading";
import Hero from "../components/HomePage/Hero";
import ProductsList from "../components/Product/ProductsList";

const HomePage = () => {
  return (
    <main className="p-6 max-w-6xl mx-auto">
      <Hero />
      <h2 className="text-2xl font-bold mt-16 mb-4">Latest Products</h2>
      <Suspense fallback={<Loading />}>
        <ProductsList productsPromise={getLatestProducts()} />
      </Suspense>
    </main>
  );
};

export default HomePage;
