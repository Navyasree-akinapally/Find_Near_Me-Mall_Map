import React, { useEffect, useState } from 'react';
import BaseLoading from '../loader/config-loading';
import { useFormik } from 'formik';
import mallServices from '../../services/mall.service';
import locationService from '../../services/location.service';
import { toast } from 'react-toastify';
import { successToast } from '../toastNotifications';

const MallForm = () => {
    const [loading, setLoading] = useState(false);
    const [selectedState, setSelectedState] = useState('')
    const [stateData, setStateData] = useState(null)
    const [cityData, setCityData] = useState(null)
    const [initialValues, setInitialValues] = useState({
        title: '',
        state: '',
        city: ''
    });
    const [isButtonClicked, setIsButtonClicked] = useState(false);

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

    console.log(stateData);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await locationService.getCity(selectedState);
                if (res.data) {
                    setCityData(res.data)
                }
            } catch (e) {
                console.log(e);
            }
        }

        fetchData()
    }, [selectedState])

    const formik = useFormik({
        initialValues,
        enableReinitialize: true,
        onSubmit: async (values, { setStatus, setSubmitting, setFieldValue }) => {
            setLoading(true);
            try {
                const payload = {
                    city: values.city,
                    state: values.state,
                    title: values.title
                }
                let res = await mallServices.createMall(payload)

                if (res.data) {
                    successToast('Mall Created Successfully')
                }
            } catch (error) {
                console.log(error);
                setStatus(error.response.data.message)
            } finally {
                setLoading(false);
                setSubmitting(false);
            }
        },
    });

    useEffect(() => {
        if (formik.values.state) {
            setSelectedState(formik.values.state)
        }
    }, [formik.values])

    console.log(selectedState);
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
                    <label className="block text-white text-sm font-bold mb-2">Title</label>
                    <input
                        placeholder="Enter title for the mall"
                        {...formik.getFieldProps("title")}
                        className="w-full px-3 py-2 bg-gray-200 text-black  outline-none rounded-sm"
                        type="title"
                        name="title"
                        autoComplete="off"
                    />
                </div>

                <div className="mb-4">
                    <div className="flex flex-col ">
                        <label className="block text-white text-sm font-bold mb-2">Select State</label>
                        <select
                            name="state"
                            id="state"
                            className="w-full px-3 py-2  bg-gray-200 text-black rounded-sm"
                            // onChange={(e) => setSelectedState(e.target.value)}
                            {...formik.getFieldProps("state")}
                        >
                            <option value="" label="Select a State" />
                            {stateData?.length > 0 && stateData.map((state) => (
                                <option key={state._id} value={state._id} className='flex justify-between'>
                                    <div className='font-bold'>{state.name}</div>{" "}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="mb-4">
                    <div className="flex flex-col ">
                        <label className="block text-white text-sm font-bold mb-2">Select City</label>
                        <select
                            name="city"
                            id="city"
                            className="w-full px-3 py-2  bg-gray-200 text-black rounded-sm"
                            {...formik.getFieldProps("city")}
                        >
                            <option value="" label="Select a City" />
                            {cityData?.length > 0 && cityData.map((city) => (
                                <option key={city._id} value={city._id} className='flex justify-between'>
                                    <div className='font-bold'>{city.name}</div>{" "}
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

export default MallForm;
