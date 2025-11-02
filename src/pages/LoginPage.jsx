import { useToast } from "buttered-toast";

import { useAuth } from "../providers/AuthProvider";
import {
  GoogleProvider,
  loginUser,
  loginWithProvider,
} from "../services/firebase";

import AuthForm from "../components/AuthForm";
import Toast from "../components/Toast";

const LoginPage = () => {
  const { show } = useToast();
  const { setUser } = useAuth();

  const handleLogin = async (data) => {
    const { email, password } = data;
    const { success, message, user } = await loginUser(email, password);

    if (success) {
      setUser(user);
      show(<Toast type="success" message={message} />, { timeout: 5000 });
    } else {
      show(<Toast type="error" message={message} />, { timeout: 5000 });
    }
  };

  const handleGoogleLogin = async () => {
    const { success, message, user } = await loginWithProvider(GoogleProvider);

    if (success) {
      setUser(user);
      show(<Toast type="success" message={message} />, { timeout: 5000 });
    } else {
      show(<Toast type="error" message={message} />, { timeout: 5000 });
    }
  };

  return (
    <AuthForm
      type="login"
      onSubmit={handleLogin}
      onGoogleClick={handleGoogleLogin}
    />
  );
};

export default LoginPage;
