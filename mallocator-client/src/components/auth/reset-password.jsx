import { useFormik } from "formik";
import { useState } from "react";
import BaseLoading from "../loader/config-loading";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import authServices from "../../services/auth.service";
import { useAuth } from "../../context/auth-context";
import { useTheme } from './../../context/theme-context';

function ResetPassword() {
    const { setIsAuth } = useAuth();
    const { token } = useParams()
    const [loading, setLoading] = useState(false);
    const [initialValues, setInitialValues] = useState({
        password: "",
        confirm_password: '',
        token: ''
    });
    const navigate = useNavigate()
    const [isButtonClicked, setIsButtonClicked] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const formik = useFormik({
        initialValues,
        enableReinitialize: true,
        onSubmit: async (values, { setStatus, setSubmitting, setFieldValue }) => {
            setLoading(true);
            try {
                const payload = {
                    password: values.password,
                    confirm_password: values.confirm_password,
                    token: token
                }
                const res = await authServices.resetPassword(payload);
                if (res) {
                    setStatus(null);
                    setLoading(false);
                    return navigate('/auth/user')
                }
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

                <div className="mb-4">
                    <label className="block text-white text-sm font-bold mb-2">Password</label>
                    <div className="flex items-center">
                        <input
                            type={showPassword ? "text" : "password"}
                            {...formik.getFieldProps("password")}
                            className="w-full px-3 py-2 bg-gray-200 rounded-sm text-black"
                            autoComplete="off"
                            placeholder="Password"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="ml-2 "
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
                            className="w-full px-3 py-2 bg-gray-200 rounded-sm text-black"
                            autoComplete="off"
                            placeholder="Confirm Password"
                        />
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

            </form>

        </BaseLoading>
    );
}

export default ResetPassword;
