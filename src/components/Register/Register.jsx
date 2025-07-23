import { useForm } from "react-hook-form";

export default function Register() {
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
        })}
      >
        <input
          type="email"
          {...register("email", { required: "Please fill in the email" })}
        />
        <p>{errors.email?.message}</p>
        <input
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
