import { useFormik } from "formik";
import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import BaseLoading from '../loader/config-loading';
import authServices from "../../services/auth.service";

function SignUp() {
    const { reg } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(false);
    const [initialValues, setInitialValues] = useState({
        username: "",
        email: "",
        password: "",
        confirm_password: "",
        role: reg,
    });
    const [isButtonClicked, setIsButtonClicked] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const validRoutes = ['admin', 'customer'];
    const isAdminSignup = location.pathname === "/auth/registration/admin";

    const formik = useFormik({
        initialValues,
        enableReinitialize: true,
        onSubmit: async (values, { setStatus, setSubmitting }) => {
            setLoading(true);
            try {
                const payload = {
                    username: values.username,
                    email: values.email,
                    password: values.password,
                    role: values.role,
                };
                const response = await authServices.signUp(payload);
                if (response) {
                    window.alert('success');
                    setLoading(false);
                    navigate('/auth/user');
                    return;
                }
                setStatus("Invalid credentials");
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
                setSubmitting(false);
            }
        },
    });

    if (!validRoutes.includes(reg)) {
        return <Navigate to={'/auth'} replace />;
    }

    return (
        <BaseLoading loading={loading}>
            <form
                className="w-full text-black"
                onSubmit={e => {
                    e.preventDefault();
                    formik.handleSubmit();
                }}
                noValidate
                id="kt_login_signin_form"
            >
                <div className="text-center mb-10">
                    <h1 className="text-white text-2xl font-bold mb-3">
                        Sign Up for {isAdminSignup ? "Admin" : "Customer"}
                    </h1>
                    <div className="text-gray-400 font-semibold text-lg">
                        Already have an Account?{" "}
                        <Link to={!isAdminSignup ? "/auth/customer" : "/auth/admin"} className="text-blue-500 font-bold">
                            Login
                        </Link>
                    </div>
                </div>

                {formik.status && (
                    <div className="mb-4 text-red-600 font-bold">
                        <div>{formik.status}</div>
                    </div>
                )}

                <div className="mb-4">
                    <label className="block text-white text-sm font-bold mb-2">Username</label>
                    <input
                        placeholder="Enter username"
                        {...formik.getFieldProps("username")}
                        className="w-full px-3 py-2 bg-gray-200 outline-none rounded-sm"
                        type="text"
                        name="username"
                        autoComplete="off"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-white text-sm font-bold mb-2">Email</label>
                    <input
                        placeholder="Enter email or username"
                        {...formik.getFieldProps("email")}
                        className="w-full px-3 py-2 bg-gray-200 outline-none rounded-sm"
                        type="email"
                        name="email"
                        autoComplete="off"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-white text-sm font-bold mb-2">Password</label>
                    <div className="flex items-center">
                        <input
                            type={showPassword ? "text" : "password"}
                            {...formik.getFieldProps("password")}
                            className="w-full px-3 py-2 bg-gray-200 rounded-sm"
                            autoComplete="off"
                            placeholder="Password"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="ml-2 text-gray-400"
                        >
                            <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`} />
                        </button>
                    </div>
                </div>

                <div className="mb-4">
                    <label className="block text-white text-sm font-bold mb-2">Confirm Password</label>
                    <div className="flex items-center">
                        <input
                            type={showPassword ? "text" : "password"}
                            {...formik.getFieldProps("confirm_password")}
                            className="w-full px-3 py-2 bg-gray-200 rounded-sm"
                            autoComplete="off"
                            placeholder="Confirm Password"
                        />
                    </div>
                </div>

                <div className="text-center pt-4">
                    <button
                        type="submit"
                        className="bg-slate-400 w-full py-2 font-semibold rounded-sm"
                        disabled={formik.isSubmitting}
                        onClick={() => setIsButtonClicked(true)}
                    >
                        {loading && isButtonClicked ? (
                            <span>
                                Please wait...
                                <span className="spinner-border spinner-border-sm ml-2"></span>
                            </span>
                        ) : (
                            "Submit"
                        )}
                    </button>
                </div>

                <div className="mt-4">
                    <button
                        type="button"
                        className="text-white py-2 rounded-md font-semibold underline"
                        onClick={() => navigate(isAdminSignup ? "/auth/registration/customer" : "/auth/registration/admin")}
                    >
                        Switch to {isAdminSignup ? "User" : "Admin"} Signup
                    </button>
                </div>
            </form>
        </BaseLoading>
    );
}

export default SignUp;
