import { useState } from "react";
import type { FormEvent } from "react";
import InputField from "../Common/InputField";

interface AuthFormProps {
  type: "login" | "register";
  onSubmit: (email: string, password: string, name?: string) => void;
  loading?: boolean;
}

export function AuthForm({ type, onSubmit, loading }: AuthFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [touched, setTouched] = useState<{ [k: string]: boolean }>({});

  const errors = {
    email: !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email) ? "Please enter a valid email" : null,
    password: password.length < 8 ? "Password must be at least 8 characters" : null,
    name: type === "register" && name.trim() === "" ? "Full name is required" : null,
  };

  const isValid = !errors.email && !errors.password && !errors.name;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setTouched({ email: true, password: true, name: true });
    if (!isValid) return;
    onSubmit(email, password, name);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md md:max-w-xl lg:max-w-2xl"
      style={{ maxWidth: '900px' }}
      data-testid="auth-form"
    >
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        {type === "login" ? "Login" : "Register"}
      </h2>

      {type === "register" && (
        <InputField
          label="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={() => setTouched((t) => ({ ...t, name: true }))}
          placeholder="John Doe"
          error={touched.name ? errors.name : null}
        />
      )}

      <InputField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onBlur={() => setTouched((t) => ({ ...t, email: true }))}
        error={touched.email ? errors.email : null}
        placeholder="you@example.com"
      />

      <InputField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onBlur={() => setTouched((t) => ({ ...t, password: true }))}
        error={touched.password ? errors.password : null}
        placeholder="••••••••"
      />

      <button
        type="submit"
        disabled={loading || !isValid}
        className={`w-full py-2 rounded-lg font-semibold mt-4 transition ${loading || !isValid
            ? "bg-gray-400 cursor-not-allowed text-white"
            : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
      >
        {loading ? "Processing..." : type === "login" ? "Sign In" : "Create Account"}
      </button>
    </form>
  );
}
