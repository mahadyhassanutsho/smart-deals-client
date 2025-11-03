import { use } from "react";

const ProductsList = ({ productsPromise }) => {
  const products = use(productsPromise);

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      {products.map((p) => (
        <div
          key={p.id}
          className="bg-base-200 shadow-md rounded-2xl overflow-hidden hover:scale-[1.02] transition-transform"
        >
          <img
            src={p.image}
            alt={p.title}
            className="h-48 w-full object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold">{p.title}</h3>
            <p className="text-sm text-gray-500">
              Starting from ${p.price_min} – up to ${p.price_max}
            </p>
            <button className="btn btn-sm btn-primary mt-3 w-full">
              Bid Now
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductsList;
