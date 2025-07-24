import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";

export default function Login() {
  const { login } = useAuth();
  const navigateHome = useNavigate();
  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm();

  return (
    <>
      <h1>Login</h1>
      <form
        onSubmit={handleSubmit((data) => {
          console.log(data);
          navigateHome("/");
          login();
        })}
      >
        <input
          type="email"
          {...register("email", { required: "Please fill in the email" })}
        />
        <p>{errors.email?.message}</p>
        <input
          type="password"
          {...register("password", { required: "Please fill in the password" })}
        />
        <p>{errors.password?.message}</p>

        <input type="submit" />
      </form>
    </>
  );
}
