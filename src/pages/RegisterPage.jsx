import { useToast } from "buttered-toast";

import { useAuth } from "../providers/AuthProvider";
import {
  registerUser,
  loginWithProvider,
  GoogleProvider,
} from "../services/firebase";
import { postUser } from "../services/server";

import AuthForm from "../components/AuthForm";
import Toast from "../components/Toast";

const RegisterPage = () => {
  const { show } = useToast();
  const { setUser } = useAuth();

  const handleRegister = async (data) => {
    const { email, password, displayName, photoURL } = data;
    const { success, message, user } = await registerUser(
      email,
      password,
      displayName,
      photoURL
    );

    if (success) {
      const data = await postUser(user);
      console.log(data);
      setUser(user);
      show(<Toast type="success" message={message} />, { timeout: 5000 });
    } else {
      show(<Toast type="error" message={message} />, { timeout: 5000 });
    }
  };

  const handleGoogleLogin = async () => {
    const { success, message, user } = await loginWithProvider(GoogleProvider);

    if (success) {
      const data = await postUser(user);
      console.log(data);
      setUser(user);
      show(<Toast type="success" message={message} />, { timeout: 5000 });
    } else {
      show(<Toast type="error" message={message} />, { timeout: 5000 });
    }
  };

  return (
    <AuthForm
      type="register"
      onSubmit={handleRegister}
      onGoogleClick={handleGoogleLogin}
    />
  );
};

export default RegisterPage;
