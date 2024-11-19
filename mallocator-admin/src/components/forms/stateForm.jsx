import React, { useEffect, useState } from 'react';
import BaseLoading from '../loader/config-loading';
import { useFormik } from 'formik';
import mallServices from '../../services/mall.service';
import locationService from '../../services/location.service';
import { successToast } from '../toastNotifications';

const StateForm = () => {
    const [loading, setLoading] = useState(false);
    const [initialValues, setInitialValues] = useState({
        name: '',
    });
    const [isButtonClicked, setIsButtonClicked] = useState(false);


    const formik = useFormik({
        initialValues,
        enableReinitialize: true,
        onSubmit: async (values, { setStatus, setSubmitting, setFieldValue }) => {
            setLoading(true);
            try {
                let res = await locationService.createState(values)

                if (res.data) {
                    successToast('state created successfully')
                }
            } catch (error) {
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
                onSubmit={e => {
                    e.preventDefault();
                    formik.handleSubmit();
                }}
                noValidate
                id="kt_create_mall_form"
            >

                {formik.status && (
                    <div className="mb-4 text-red-600 font-bold">
                        <div>{formik.status}</div>
                    </div>
                )}

                <div className="mb-4">
                    <label className="block text-white text-sm font-bold mb-2">State</label>
                    <div className="flex items-center ">
                        <input
                            placeholder="Enter State"
                            type={"text"}
                            {...formik.getFieldProps("name")}
                            className="w-full px-3 py-2  bg-gray-200 text-black rounded-sm"
                            autoComplete="off"
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
                            "Submit"
                        )}
                    </button>
                </div>
            </form>
        </BaseLoading>
    );
}

export default StateForm;
