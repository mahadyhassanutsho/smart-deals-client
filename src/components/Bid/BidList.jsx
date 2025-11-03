import { Suspense, use } from "react";

import { getBidsWithProductId } from "../../services/server";

import Loading from "../Loading";

const BidListContent = ({ bidsPromise }) => {
  const bids = use(bidsPromise);

  if (!bids.length)
    return (
      <p className="text-center text-sm opacity-70 py-6">
        No bids yet — be the first to place one!
      </p>
    );

  return (
    <div className="overflow-x-auto rounded-box border border-base-300 bg-base-200">
      <table className="table table-zebra w-full">
        <thead>
          <tr className="text-base-content">
            <th>#</th>
            <th>Buyer</th>
            <th>Email</th>
            <th>Bid Price</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {bids.map((bid, i) => (
            <tr key={bid._id} className="hover:bg-base-300 transition">
              <td>{i + 1}</td>
              <td className="flex items-center gap-3">
                <img
                  src={bid.buyer_image}
                  alt={bid.buyer_name}
                  className="w-10 h-10 rounded-full border border-primary"
                />
                <div className="font-semibold">{bid.buyer_name}</div>
              </td>
              <td className="text-sm opacity-80">{bid.buyer_email}</td>
              <td className="font-bold text-primary">${bid.bid_price}</td>
              <td>
                <span
                  className={`badge badge-sm uppercase ${
                    bid.status === "pending"
                      ? "badge-warning"
                      : bid.status === "accepted"
                      ? "badge-success"
                      : "badge-error"
                  }`}
                >
                  {bid.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const BidList = ({ productId }) => {
  return (
    <section className="mt-14">
      <h2 className="text-2xl font-bold mb-4">Bids</h2>

      <Suspense fallback={<Loading type="block" />}>
        <BidListContent bidsPromise={getBidsWithProductId(productId)} />
      </Suspense>
    </section>
  );
};

export default BidList;
