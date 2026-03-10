"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function SignupPage() {
  const router = useRouter();
  const supabase = createClient();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const { email, password, firstName, lastName } = form;

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
        },
      },
    });

    if (error) {
      setErrorMsg(error.message);
      setLoading(false);
      return;
    }

    router.push("/dashboard");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black px-6">
      <div className="w-full max-w-md bg-white dark:bg-zinc-900 p-8 rounded-xl shadow">
        <h1 className="text-3xl font-semibold text-black dark:text-white mb-6">
          Create your account
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            name="firstName"
            placeholder="First Name"
            className="p-3 rounded border border-zinc-300 dark:border-zinc-700 bg-transparent"
            onChange={handleChange}
          />

          <input
            name="lastName"
            placeholder="Last Name"
            className="p-3 rounded border border-zinc-300 dark:border-zinc-700 bg-transparent"
            onChange={handleChange}
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            className="p-3 rounded border border-zinc-300 dark:border-zinc-700 bg-transparent"
            onChange={handleChange}
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            className="p-3 rounded border border-zinc-300 dark:border-zinc-700 bg-transparent"
            onChange={handleChange}
          />

          {errorMsg && (
            <p className="text-red-500 text-sm">{errorMsg}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white py-3 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Signing up..." : "Sign up"}
          </button>
        </form>
      </div>
    </div>
  );
}