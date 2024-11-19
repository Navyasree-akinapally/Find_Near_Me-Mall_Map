import React, { useEffect, useState } from 'react';
import BaseLoading from '../loader/config-loading';
import { useFormik } from 'formik';
import mallServices from '../../services/mall.service';
import locationService from '../../services/location.service';
import { toast } from 'react-toastify';
import { successToast } from '../toastNotifications';

const CityForm = () => {
    const [loading, setLoading] = useState(false);
    const [initialValues, setInitialValues] = useState({
        name: '',
        stateId: ''
    });
    const [isButtonClicked, setIsButtonClicked] = useState(false);
    const [stateData, setStateData] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await locationService.getState();
                if (res.data) {
                    setStateData(res.data)
                }
            } catch (e) {
                console.log(e);
            }
        }

        fetchData()
    }, [])

    const formik = useFormik({
        initialValues,
        enableReinitialize: true,
        onSubmit: async (values, { setStatus, setSubmitting, setFieldValue }) => {
            setLoading(true);
            try {
                const payload = {
                    name: values.name
                }
                let res = await locationService.createCity(payload, values.stateId)

                if (res?.data) {
                    successToast('City created successfully')
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
                    <label className="block text-white text-sm font-bold mb-2">City Name</label>
                    <div className="flex items-center ">
                        <input
                            placeholder="Add city name"
                            type={"text"}
                            {...formik.getFieldProps("name")}
                            className="w-full px-3 py-2  bg-gray-200 text-black rounded-sm"
                            autoComplete="off"
                        />
                    </div>
                </div>

                <div className="mb-4">
                    <div className="flex flex-col ">
                        <label className="block text-white text-sm font-bold mb-2">Select State</label>
                        <select
                            name="stateId"
                            id="stateId"
                            className="w-full px-3 py-2  bg-gray-200 text-black rounded-sm"
                            {...formik.getFieldProps("stateId")}
                        >
                            <option value="" label="Select State" />
                            {stateData?.length > 0 && stateData.map((state) => (
                                <option key={state._id} value={state._id} className='flex justify-between'>
                                    <div className='font-bold'>{state.name}</div>{" "}
                                </option>
                            ))}
                        </select>
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

export default CityForm;
