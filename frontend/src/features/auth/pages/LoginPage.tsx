import { useState } from "react";
import { login as loginApi } from "../api";
import { useAppDispatch } from "../../../hooks/redux";
import { login } from "../authSlice";
import { useNavigate, Link } from "react-router-dom";
import { loginSchema } from "../Schema";
import AuthLayout from "../components/AuthLayout";
import { toast } from "react-toastify";

import { Eye, EyeOff } from "lucide-react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = loginSchema.safeParse({ email, password });
    if (!validation.success) {
      const errors: { email?: string; password?: string } = {};
      validation.error.issues.forEach((issue) => {
        if (issue.path[0]) {
          errors[issue.path[0] as keyof typeof errors] = issue.message;
        }
      });
      setFieldErrors(errors);
      return;
    }
    setFieldErrors({});
    setIsLoading(true);

    try {
      const response = await loginApi({ email, password });
      if (response.success) {
        toast.success("Login successful!");
        dispatch(login({ token: response.token, user: response.user }));

        if (response.user?.role?.toLowerCase() === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/user/dashboard");
        }
      } else {
        toast.error(response.message || "Login failed");
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout title="Sign in" subtitle="Welcome back! Please sign in to continue">
      <form className="w-full flex flex-col items-center justify-center" onSubmit={handleLogin} noValidate>
        <div className="flex flex-col w-full">
          <div className="flex items-center w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
            <svg
              width="16"
              height="11"
              viewBox="0 0 16 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0 .55.571 0H15.43l.57.55v9.9l-.571.55H.57L0 10.45zm1.143 1.138V9.9h13.714V1.69l-6.503 4.8h-.697zM13.749 1.1H2.25L8 5.356z"
                fill="#6B7280"
              />
            </svg>
            <input
              type="email"
              placeholder="Email id"
              className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {fieldErrors.email && <p className="text-red-500 text-xs mt-1 pl-4">{fieldErrors.email}</p>}
        </div>

        <div className="flex flex-col w-full mt-6">
          <div className="flex items-center w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 pr-4 gap-2">
            <svg
              width="13"
              height="17"
              viewBox="0 0 13 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13 8.5c0-.938-.729-1.7-1.625-1.7h-.812V4.25C10.563 1.907 8.74 0 6.5 0S2.438 1.907 2.438 4.25V6.8h-.813C.729 6.8 0 7.562 0 8.5v6.8c0 .938.729 1.7 1.625 1.7h9.75c.896 0 1.625-.762 1.625-1.7zM4.063 4.25c0-1.406 1.093-2.55 2.437-2.55s2.438 1.144 2.438 2.55V6.8H4.061z"
                fill="#6B7280"
              />
            </svg>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {fieldErrors.password && <p className="text-red-500 text-xs mt-1 pl-4">{fieldErrors.password}</p>}
        </div>

        <div className="w-full flex items-center justify-between mt-8 text-gray-500/80">
          <div className="flex items-center gap-2">
            <input className="h-5" type="checkbox" id="checkbox" />
            <label className="text-sm" htmlFor="checkbox">
              Remember me
            </label>
          </div>
          <a className="text-sm underline" href="#">
            Forgot password?
          </a>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`mt-8 w-full h-11 rounded-full text-white bg-indigo-500 hover:opacity-90 transition-opacity ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {isLoading ? "Signing in..." : "Login"}
        </button>
        <p className="text-gray-500/90 text-sm mt-4">
          Don’t have an account?{" "}
          <Link className="text-indigo-400 hover:underline" to="/signup">
            Sign up
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
