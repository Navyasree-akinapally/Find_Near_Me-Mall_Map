import { useFormik } from "formik";
import { useState } from "react";
import BaseLoading from "../loader/config-loading";
import { Link, useNavigate, useLocation } from "react-router-dom";
import authServices from "../../services/auth.service";
import { useAuth } from "../../context/auth-context";
import { useTheme } from './../../context/theme-context';

function ForgotPassword() {
    const { setIsAuth } = useAuth();

    const [loading, setLoading] = useState(false);
    const [initialValues, setInitialValues] = useState({
        email: "",
    });
    const [isButtonClicked, setIsButtonClicked] = useState(false);
    const [message, setMessage] = useState('')

    const formik = useFormik({
        initialValues,
        enableReinitialize: true,
        onSubmit: async (values, { setStatus, setSubmitting, setFieldValue }) => {
            setLoading(true);
            try {
                const res = await authServices.forgotPassword(values);
                if (res) {
                    setStatus(null);
                    setMessage("Email has been sent to your registered email address")
                    setLoading(false);
                    return;
                }
                setStatus("Invalid credentials");
            } catch (error) {
                console.error(error);
                setStatus(error.response.data.message)

            } finally {
                setLoading(false);
                setSubmitting(false);
            }
        },
    });

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
                        Forgot your password?
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

                {message && (
                    <div className="mb-4 text-teal-600 font-bold">
                        <div>{message}</div>
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

            </form>

        </BaseLoading>
    );
}

export default ForgotPassword;
