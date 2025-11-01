import AuthForm from "../components/AuthForm";

const LoginPage = () => {
  const handleLogin = async (data) => {
    console.log("Logging in:", data);
    await new Promise((r) => setTimeout(r, 1000));
    alert("Logged in successfully!");
  };

  return <AuthForm type="login" onSubmit={handleLogin} />;
};

export default LoginPage;
