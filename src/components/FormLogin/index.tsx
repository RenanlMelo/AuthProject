import React, { useState } from "react";
import { useLoginAuthContext } from "../../contexts/authLogin";

export const FormLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const context = useLoginAuthContext();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!email || !password) {
      setError("Please fill in both fields.");
      return;
    }

    try {
      await context.authLogin(email, password);
    } catch (err) {
      setError(
        "Falha ao fazer login. Verifique seu email e senha e tente novamente."
      );
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="w-full h-full flex justify-center items-center">
        <div className="card w-96 h-96 p-3 sm:p-8 flex justify-center items-center flex-col">
          <h1 className="text-4xl text-white p-4">Sign In</h1>
          <form
            className="bg-white p-8 flex justify-center items-center flex-col gap-y-10"
            onSubmit={handleSubmit}
          >
            <div className="form_control">
              <label
                htmlFor="user_email"
                className="absolute -translate-y-4
            "
              >
                Email
              </label>
              <input
                id="user_email"
                type="email"
                name="email"
                placeholder="example@gmail.com"
                aria-describedby="user-email"
                aria-invalid="false"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="border-b border-black py-2 outline-none"
              />
            </div>
            <div className="form_control">
              <label
                htmlFor="user_password"
                className="absolute -translate-y-4
            "
              >
                Password
              </label>
              <input
                id="user_password"
                type="password"
                name="password"
                placeholder="*****"
                aria-describedby="user-password"
                aria-invalid="false"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="border-b border-black py-2 outline-none"
              />
            </div>
            <button className="btn_submit">
              {loading ? "Loading..." : "Sign In"}
            </button>
          </form>
        </div>
      </section>
    </>
  );
};
