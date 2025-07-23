import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";

export default function Register() {
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
      <h1>Register</h1>
      <form
        onSubmit={handleSubmit((data) => {
          console.log(data);
          navigateHome("/");
          login();
        })}
      >
        <label for="firstName">First Name:</label>
        <input
          id="firstName"
          type="text"
          {...register("firstName", { required: true })}
        />
        <label for="lastName">Last Name:</label>{" "}
        <input
          id="lastName"
          type="text"
          {...register("firstName", { required: true })}
        />
        <label for="email">Email:</label>{" "}
        <input
          id="email"
          type="email"
          {...register("email", { required: "Please fill in the email" })}
        />
        <p>{errors.email?.message}</p>
        <label for="password">Password:</label>{" "}
        <input
          id="password"
          type="password"
          {...register("password", {
            required: "Please fill in the password",
            minLength: { value: 4, message: "Minimum length is 4" },
          })}
        />
        <p>{errors.password?.message}</p>
        <input type="submit" />
      </form>
    </>
  );
}
