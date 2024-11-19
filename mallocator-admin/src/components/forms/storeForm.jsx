import React, { useEffect, useState } from 'react';
import BaseLoading from '../loader/config-loading';
import { useFormik } from 'formik';
import storeService from '../../services/store.service';
import mallServices from '../../services/mall.service';
import { successToast } from '../toastNotifications';

const StoreForm = () => {
    const [loading, setLoading] = useState(false);
    const [mallsData, setMallsData] = useState(null)
    const [initialValues, setInitialValues] = useState({
        name: '',
        description: '',
        isOpen: false,
        timing: '',
        phone: '',
        email: '',
        category: '',
        media: {
            website_url: null,
            facebook: null,
            instagram: null,
            twitter: null,
        },
        mall: ''
    });
    const [isButtonClicked, setIsButtonClicked] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                let res = await mallServices.getMalls()
                if (res.data) {
                    setMallsData(res.data)
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
                console.log(values);
                let res = await storeService.createStore(values)
                if (res.data) {
                    successToast('store created successfully')
                }
            } catch (error) {
                console.log(error);
                setStatus(error?.response?.data?.message)
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

                <div className='grid grid-cols-2 gap-6'>
                    <div className="mb-4">
                        <label className="block text-white text-sm font-bold mb-2">Name</label>
                        <input
                            placeholder="Enter name for the mall"
                            {...formik.getFieldProps("name")}
                            className="w-full px-3 py-2 bg-gray-200 text-black  outline-none rounded-sm"
                            type="name"
                            name="name"
                            autoComplete="off"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-white text-sm font-bold mb-2">Description</label>
                        <div className="flex items-center ">
                            <input
                                placeholder="Enter Description"
                                type={"text"}
                                {...formik.getFieldProps("description")}
                                className="w-full px-3 py-2  bg-gray-200 text-black rounded-sm"
                                autoComplete="off"
                            />
                        </div>
                    </div>
                </div>

                <div className='flex flex-col gap-2'>
                    <label htmlFor="" className='font-bold'></label>
                    <div className='grid grid-cols-2 gap-6'>
                        <div className="mb-4">
                            <label className="block text-white text-sm font-bold mb-2">Category</label>
                            <div className="flex items-center ">
                                <input
                                    placeholder="Enter Category"
                                    type={"text"}
                                    {...formik.getFieldProps("category")}
                                    className="w-full px-3 py-2  bg-gray-200 text-black rounded-sm"
                                    autoComplete="off"
                                />
                            </div>
                        </div>
                        <div className="mb-4">
                            <div className="flex flex-col ">
                                <label className="block text-white text-sm font-bold mb-2">Select Mall</label>
                                <select
                                    name="mall"
                                    id="mall"
                                    className="w-full px-3 py-2  bg-gray-200 text-black rounded-sm"
                                    {...formik.getFieldProps("mall")}
                                >
                                    <option value="" label="Select a mall" />
                                    {mallsData?.length > 0 && mallsData.map((mall) => (
                                        <option key={mall._id} value={mall._id} className='flex justify-between'>
                                            <div className='font-bold'>{mall.title}</div>{" "}
                                            <span className='text-slate-200 text-sm'>{mall.city.name}, {mall.state.name}</span>
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mb-4">
                    <label className="block text-white text-sm font-bold mb-2">Timing</label>
                    <div className="flex items-center ">
                        <input
                            placeholder="Enter Timing"
                            type={"text"}
                            {...formik.getFieldProps("timing")}
                            className="w-full px-3 py-2  bg-gray-200 text-black rounded-sm"
                            autoComplete="off"
                        />
                    </div>
                </div>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="" className='font-bold'>Contact Info</label>
                    <div className='grid grid-cols-2 gap-6'>
                        <div className="mb-4">
                            <label className="block text-white text-sm font-bold mb-2">Phone</label>
                            <div className="flex items-center ">
                                <input
                                    placeholder="Enter Phone"
                                    type={"text"}
                                    {...formik.getFieldProps("phone")}
                                    className="w-full px-3 py-2  bg-gray-200 text-black rounded-sm"
                                    autoComplete="off"
                                />
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="block text-white text-sm font-bold mb-2">Email</label>
                            <div className="flex items-center ">
                                <input
                                    placeholder="Enter Email"
                                    type={"text"}
                                    {...formik.getFieldProps("email")}
                                    className="w-full px-3 py-2  bg-gray-200 text-black rounded-sm"
                                    autoComplete="off"
                                />
                            </div>
                        </div>
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
        </BaseLoading >
    );
}

export default StoreForm;
