import { useRef } from "react";
import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router";
import { useToast } from "buttered-toast";

import { useAuth } from "../providers/AuthProvider";
import { postBid } from "../services/server";

import FormInput from "../components/FormInput";
import Toast from "../components/Toast";
import BidList from "../components/Bid/BidList";

export default function Product() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();
  const { user } = useAuth();
  const product = useLoaderData();
  const modal = useRef();
  const { show } = useToast();

  const showModal = () => modal.current.showModal();
  const closeModal = () => modal.current.close();

  const handleBid = async (data) => {
    const bid = {
      ...data,
      product_image: product.image,
      bid_price: Number(data.bid_price),
      status: "pending",
      buyer_image: user.photoURL,
      product: product._id,
    };
    reset();
    closeModal();
    const response = await postBid(bid);
    if (response.acknowledged) {
      show(
        <Toast
          type="success"
          message={`You submitted a bid of $${bid.bid_price}`}
        />,
        { timeout: 5000 }
      );
    } else {
      show(<Toast type="error" message="Couldn't submit the bid" />, {
        timeout: 5000,
      });
    }
  };

  return (
    <main className="max-w-5xl mx-auto px-6 py-12">
      <section className="grid lg:grid-cols-2 gap-10 items-start">
        <div className="relative rounded-box overflow-hidden shadow-lg border border-base-300 bg-base-100">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-[420px] object-cover"
          />
          <div
            className={`absolute top-4 left-4 badge ${
              product.status === "sold" ? "badge-error" : "badge-success"
            } badge-lg uppercase`}
          >
            {product.status}
          </div>
        </div>

        <div>
          <h1 className="text-4xl font-extrabold text-base-content">
            {product.title}
          </h1>
          <p className="mt-2 text-sm opacity-70">
            Category: <span className="font-medium">{product.category}</span>
          </p>
          <p className="text-sm opacity-70">
            Location: <span className="font-medium">{product.location}</span>
          </p>

          <div className="mt-6 p-5 rounded-box bg-base-200 border border-base-300">
            <p className="text-lg">
              Bidding Range:{" "}
              <span className="font-bold text-primary">
                ${product.price_min} – ${product.price_max}
              </span>
            </p>
            <p className="mt-2">
              Condition:{" "}
              <span className="capitalize font-semibold">
                {product.condition}
              </span>
            </p>
            <p>
              Usage: <span className="font-medium">{product.usage}</span>
            </p>
            <p className="mt-2 text-sm opacity-80">
              Listed on:{" "}
              {new Date(product.created_at).toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>

          <div className="mt-6 flex gap-4">
            <button
              onClick={showModal}
              disabled={product.status === "sold"}
              className="btn btn-primary btn-wide"
            >
              {product.status === "sold" ? "Sold Out" : "Place a Bid"}
            </button>
            <button className="btn btn-outline btn-secondary">
              Contact Seller
            </button>
          </div>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-2xl font-bold mb-3">Description</h2>
        <p className="leading-relaxed opacity-90">{product.description}</p>
      </section>

      <section className="mt-14">
        <BidList productId={product._id} />
      </section>

      <section className="mt-14">
        <h2 className="text-2xl font-bold mb-4">Seller Information</h2>
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 bg-base-200 p-6 rounded-box border border-base-300">
          <img
            src={product.seller_image}
            alt={product.seller_name}
            className="w-24 h-24 rounded-full border-2 border-primary object-cover"
          />
          <div>
            <h3 className="text-xl font-semibold">{product.seller_name}</h3>
            <p className="text-sm opacity-80">{product.email}</p>
            <p className="mt-2 text-sm opacity-70">
              Contact: {product.seller_contact}
            </p>
          </div>
        </div>
      </section>

      <dialog ref={modal} id="modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">Press ESC key or click outside to close</p>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-2xl text-center mb-2">Place a Bid</h3>

          <form onSubmit={handleSubmit(handleBid)} className="space-y-3">
            <FormInput
              label="Email"
              type="email"
              readOnly={true}
              placeholder="Email"
              defaultValue={user.email}
              register={register("buyer_email", {
                required: "Email is required",
              })}
              error={errors.buyer_email?.message}
            />
            <FormInput
              label="Name"
              type="text"
              readOnly={true}
              placeholder="Name"
              defaultValue={user.displayName}
              register={register("buyer_name", {
                required: "Name is required",
              })}
              error={errors.buyer_name?.message}
            />

            <FormInput
              label="Bid Price"
              type="number"
              placeholder="Name your price"
              register={register("bid_price", {
                required: "Price is required",
              })}
              error={errors.bid_price?.message}
            />

            <button
              className={`btn btn-primary w-full ${
                isSubmitting ? "cursor-not-allowed" : "cursor-pointer"
              }`}
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Please wait..." : "Place a Bid"}
            </button>
          </form>
        </div>
      </dialog>
    </main>
  );
}
