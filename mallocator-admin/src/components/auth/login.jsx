import { useFormik } from "formik";
import { useState } from "react";
import BaseLoading from "../loader/config-loading";
import { Link, useNavigate, useLocation } from "react-router-dom";
import authServices from "../../services/auth.service";
import { useAuth } from "../../context/auth-context";

function Login() {
    const { setIsAuth } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // Determine if we're currently on superadmin login page
    const isSuperAdminLogin = location.pathname === "/auth/superadmin";
    const [loading, setLoading] = useState(false);
    const [initialValues, setInitialValues] = useState({
        email: "",
        password: ""
    });
    const [isButtonClicked, setIsButtonClicked] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const formik = useFormik({
        initialValues,
        enableReinitialize: true,
        onSubmit: async (values, { setStatus, setSubmitting, setFieldValue }) => {
            setLoading(true);
            try {
                const role = isSuperAdminLogin ? 'superadmin' : 'malladmin';
                const res = await authServices.login(values, role);
                if (res) {
                    setStatus(null);
                    setLoading(false);
                    setIsAuth(true);
                    navigate(`${role === 'superadmin' ? '/admin/' : '/malladmin/'}`)
                    return;
                }
                setStatus("Invalid credentials");
            } catch (error) {
                console.error(error);
                setStatus(error);
            } finally {
                setLoading(false);
                setSubmitting(false);
            }
        },
    });

    // Handle the switch login route
    const switchLogin = () => {
        if (isSuperAdminLogin) {
            navigate("/auth/malladmin");
        } else {
            navigate("/auth/superadmin");
        }
    };

    return (
        <BaseLoading loading={loading}>
            <form
                className="w-full text-white"
                onSubmit={(e) => {
                    e.preventDefault();
                    formik.handleSubmit();
                }}
                noValidate
                id="kt_login_signin_form"
            >
                <div className="text-center mb-10">
                    <h1 className="text-white text-2xl font-bold mb-3">
                        Sign In to {isSuperAdminLogin ? "Super Admin" : "Mall Admin"} Portal
                    </h1>
                    <div className="text-slate-500 font-semibold text-lg">
                        New Here?{" "}
                        <Link to="/auth/registration/customer" className="text-purple-500 font-bold">
                            Create an Account
                        </Link>
                    </div>
                </div>

                {formik.status && (
                    <div className="mb-4 text-red-600 font-bold">
                        <div>{formik.status}</div>
                    </div>
                )}

                <div className="mb-4">
                    <label className="block text-white text-sm font-bold mb-2">Email/Username</label>
                    <input
                        placeholder="Enter email or username"
                        {...formik.getFieldProps("email")}
                        className="w-full px-3 py-2 bg-gray-200 text-black outline-none rounded-sm"
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
                            className="w-full px-3 py-2 bg-gray-200 text-black rounded-sm"
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

                <div className="text-center text-slate-900 pt-4">
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
                            "Continue"
                        )}
                    </button>
                </div>
                <span className="text-left text-white mt-2">Forgotten Password?{" "}
                    <Link to={'/auth/forgot-password'} className="hover:underline text-teal-500">Click Here</Link>
                </span>
                <div className="mt-4">
                    <button
                        type="button"
                        className="text-white py-2 rounded-md font-semibold underline"
                        onClick={switchLogin}
                    >
                        Switch to {isSuperAdminLogin ? "Mall Admin" : "Super Admin"} Login
                    </button>
                </div>
            </form>
        </BaseLoading>
    );
}

export default Login;