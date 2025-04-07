"use client";
import { useState, FormEvent } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useAuth } from "@/hooks/useAuth";
import { Eye, EyeOff } from "lucide-react";

const SignupForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [matchError, setMatchError] = useState(false);

  const { signup, loading, error } = useAuth();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMatchError(true);
      return;
    }

    setMatchError(false);
    try {
      await signup({ username, email, password });
    } catch (err) {}
  };

  return (
    <div className="w-full max-w-md">
      <form
        onSubmit={handleSubmit}
        className="bg-[#F1FFEF] border border-[#C2E7DA] p-8 rounded-xl shadow-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-[#1A1341]">
          Registrarse
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        {matchError && (
          <div className="mb-4 p-3 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded">
            Las contraseñas no coinciden
          </div>
        )}

        <Input
          label="Nombre de Usuario"
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          minLength={3}
        />

        <Input
          label="Email"
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <div className="relative">
          <Input
            label="Contraseña"
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
          />
          <div
            className="absolute right-3 top-[38px] cursor-pointer text-[#1A1341]"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </div>
        </div>

        <div className="relative">
          <Input
            label="Repetir Contraseña"
            id="confirmPassword"
            type={showConfirm ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            minLength={8}
          />
          <div
            className="absolute right-3 top-[38px] cursor-pointer text-[#1A1341]"
            onClick={() => setShowConfirm(!showConfirm)}
          >
            {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
          </div>
        </div>

        <div className="mt-4">
          <Button
            type="submit"
            variant="primary"
            className="w-full"
            disabled={loading}
          >
            {loading ? "Registrando..." : "Registrarse"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
