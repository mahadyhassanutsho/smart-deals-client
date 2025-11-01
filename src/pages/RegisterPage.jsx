import AuthForm from "../components/AuthForm";

const RegisterPage = () => {
  const handleRegister = async (data) => {
    console.log("Registering:", data);
    await new Promise((r) => setTimeout(r, 1000));
    alert("Registered successfully!");
  };

  return <AuthForm type="register" onSubmit={handleRegister} />;
};

export default RegisterPage;
