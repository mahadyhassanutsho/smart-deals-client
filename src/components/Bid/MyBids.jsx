import { Suspense, use, useState } from "react";
import { Link } from "react-router";
import Swal from "sweetalert2";

import { getBidsByUserEmail, deleteBid } from "../../services/server";

import Loading from "../Loading";

const MyBidsContent = ({ bidsPromise, refreshKey }) => {
  const bids = use(bidsPromise);

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      showDenyButton: true,
      confirmButtonText: "Delete",
      denyButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await deleteBid(id);
        if (response.acknowledged) {
          Swal.fire("Deleted bid", "", "success");
          refreshKey.update();
        } else {
          Swal.fire("Couldn't delete", "", "error");
        }
      } else if (result.isDenied) {
        Swal.fire("Canceled deletion", "", "info");
      }
    });
  };

  if (!bids.length)
    return (
      <p className="text-center text-sm opacity-70 py-6">
        You haven’t placed any bids yet. Go find a deal worth bidding on! 😎
      </p>
    );

  return (
    <div className="overflow-x-auto rounded-box border border-base-300 bg-base-200">
      <table className="table table-zebra w-full">
        <thead>
          <tr className="text-base-content">
            <th>#</th>
            <th>Product</th>
            <th>Bid Price</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bids.map((bid, i) => (
            <tr key={bid._id} className="hover:bg-base-300 transition">
              <td>{i + 1}</td>
              <td className="flex items-center gap-3">
                <img
                  src={bid.product_image}
                  alt={bid.product_title}
                  className="w-12 h-12 rounded-lg border border-primary object-cover"
                />
                <div className="font-semibold">{bid.product_title}</div>
              </td>
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
              <td className="space-x-2">
                <Link
                  to={`/products/${bid.product}`}
                  className="btn btn-xs btn-outline btn-primary"
                >
                  View Product
                </Link>
                <button
                  onClick={() => handleDelete(bid._id)}
                  className="btn btn-xs btn-primary"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const MyBids = ({ email }) => {
  const [refreshCounter, setRefreshCounter] = useState(0);

  const refreshKey = {
    value: refreshCounter,
    update: setRefreshCounter,
  };

  return (
    <main className="w-full px-6 py-12">
      <h1 className="text-3xl font-extrabold mb-6">My Bids</h1>

      <Suspense fallback={<Loading type="block" />}>
        <MyBidsContent
          bidsPromise={getBidsByUserEmail(email)}
          refreshKey={refreshKey}
        />
      </Suspense>
    </main>
  );
};

export default MyBids;
