import { useAuth } from "../providers/AuthProvider";

import MyBids from "../components/Bid/MyBids";

export default function MyBidsPage() {
  const { user } = useAuth();

  return <MyBids email={user.email} />;
}
