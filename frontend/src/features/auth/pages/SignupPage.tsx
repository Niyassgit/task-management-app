import React, { useState } from "react";
import { signup as signupApi } from "../api";
import { useNavigate, Link } from "react-router-dom";
import { registerSchema } from "../Schema";
import AuthLayout from "../components/AuthLayout";

const SignupPage = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        cpassword: "",
    });
    const [error, setError] = useState<string | null>(null);
    const [fieldErrors, setFieldErrors] = useState<{
        name?: string;
        email?: string;
        phone?: string;
        password?: string;
        cpassword?: string;
    }>({});
    const [success, setSuccess] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        const validation = registerSchema.safeParse(formData);
        if (!validation.success) {
            const errors: typeof fieldErrors = {};
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
            await signupApi(formData);
            setSuccess("Account created successfully! Redirecting to login...");
            setTimeout(() => {
                navigate("/login");
            }, 2000);
        } catch (err: any) {
            setError(
                err.response?.data?.message || "Signup failed. Please try again.",
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthLayout
            title="Create Account"
            subtitle="Join us to manage your tasks effectively"
        >
            <form
                className="w-full flex flex-col items-center justify-center gap-4"
                onSubmit={handleSignup}
                noValidate
            >
                <div className="w-full flex flex-col gap-1">
                    <div className="flex items-center w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
                        <input
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>
                    {fieldErrors.name && <p className="text-red-500 text-xs pl-4">{fieldErrors.name}</p>}
                </div>

                <div className="w-full flex flex-col gap-1">
                    <div className="flex items-center w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    {fieldErrors.email && <p className="text-red-500 text-xs pl-4">{fieldErrors.email}</p>}
                </div>

                <div className="w-full flex flex-col gap-1">
                    <div className="flex items-center w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
                        <input
                            type="text"
                            name="phone"
                            placeholder="Phone Number"
                            className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
                            value={formData.phone}
                            onChange={handleChange}
                        />
                    </div>
                    {fieldErrors.phone && <p className="text-red-500 text-xs pl-4">{fieldErrors.phone}</p>}
                </div>

                <div className="w-full flex flex-col gap-1">
                    <div className="flex items-center w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>
                    {fieldErrors.password && <p className="text-red-500 text-xs pl-4">{fieldErrors.password}</p>}
                </div>

                <div className="w-full flex flex-col gap-1">
                    <div className="flex items-center w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
                        <input
                            type="password"
                            name="cpassword"
                            placeholder="Confirm Password"
                            className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
                            value={formData.cpassword}
                            onChange={handleChange}
                        />
                    </div>
                    {fieldErrors.cpassword && <p className="text-red-500 text-xs pl-4">{fieldErrors.cpassword}</p>}
                </div>

                {error && <p className="text-red-500 text-sm">{error}</p>}
                {success && <p className="text-green-500 text-sm">{success}</p>}

                <button
                    type="submit"
                    disabled={isLoading}
                    className={`mt-4 w-full h-11 rounded-full text-white bg-indigo-500 hover:opacity-90 transition-opacity ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                    {isLoading ? "Creating account..." : "Sign up"}
                </button>
                <p className="text-gray-500/90 text-sm mt-2">
                    Already have an account?{" "}
                    <Link className="text-indigo-400 hover:underline" to="/login">
                        Sign in
                    </Link>
                </p>
            </form>
        </AuthLayout>
    );
};

export default SignupPage;
