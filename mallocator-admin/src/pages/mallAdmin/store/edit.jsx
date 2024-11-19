import React, { useEffect, useRef, useState } from 'react';
import BasePage from '../../../components/common/basePage';
import BaseLoading from '../../../components/loader/config-loading';
import FormBase from '../../../components/common/forms/baseFormNested';
import { successToast } from '../../../components/toastNotifications';
import { useFormikContext } from 'formik';
import { updateStoreFormFieldDefinations } from '../../../containers/fielddefinations/storeFormFieldDefinations';
import { useParams } from 'react-router-dom';
import storeService from '../../../services/mallAdmin/store.service';
import mallServices from '../../../services/mallAdmin/mall.service';
import adminCategoryService from '../../../services/mallAdmin/category.service';

const EditStore = () => {
    const { storeId } = useParams()
    const [loading, setLoading] = useState(false)
    const [fieldDefinations, setFieldDefinations] = useState(null)
    const [mallsData, setMallsData] = useState(null)
    const [categoryData, setCategoryData] = useState(null)
    const dropdownRef = useRef(null);
    const [initialValues, setInitialValues] = useState({
        name: '',
        description: '',
        isOpen: false,
        phone: '',
        email: '',
        category: '',
        media: {
            website_url: null,
            facebook: null,
            instagram: null,
            twitter: null,
        },
        mall: '',
        start_time: '',
        timing: {
            startTime: '',
            endTime: ''
        },
        locations: [
            {
                floor: '',
                store_numbers: [
                    {
                        store_number: ''
                    }
                ]
            }
        ]
    });
    const [selectedMall, setSelectedMall] = useState(null)
    const [selectedFloor, setSelectedFloor] = useState(null)
    const [selectedFloorOptions, setSelectedFloorOptions] = useState(null)

    const handleSelectFloor = (value) => {
        setSelectedFloor(value)
    }
    console.log(selectedFloorOptions);

    useEffect(() => {
        const storeNumbers = selectedMall?.available_floors?.find(floor => floor.floor === selectedFloor)?.store_numbers
        setSelectedFloorOptions(storeNumbers)
    }, [selectedFloor, selectedMall])

    useEffect(() => {
        if (mallsData) {
            console.log(mallsData);
            setSelectedMall(mallsData?.find(mall => mall._id === initialValues.mall))
        }
    }, [initialValues, mallsData])


    useEffect(() => {
        const fetchData = async () => {
            try {
                let res = await mallServices.getMalls()
                let catRes = await adminCategoryService.getCategories()
                if (res.data) {
                    setMallsData(res.data)
                }
                if (catRes.data) {
                    setCategoryData(catRes.data)
                }
            } catch (e) {
                console.log(e);
            }
        }

        fetchData()
    }, [])

    console.log(initialValues);

    useEffect(() => {
        const fetchData = async () => {
            try {
                let res = await storeService.getStoreById(storeId)
                if (res.data) {
                    setInitialValues({
                        timing: {
                            startTime: res.data.start_time,
                            endTime: res.data.end_time
                        },
                        ...res.data,
                    })
                }
            } catch (e) {
                console.log(e);
            }
        }

        fetchData()
    }, [storeId])

    console.log(selectedFloor);
    const AddNewParamButtons = () => {
        const { values, setStatus, setSubmitting } = useFormikContext()
        console.log(values);
        // setInitialValues(values)
        setSelectedMall(mallsData?.find(mall => mall._id === values.mall))
        const handleSave = async (value) => {
            setLoading(true);
            try {
                const payload = {
                    name: value.name,
                    description: value.description,
                    category: value.category,
                    end_time: value.timing.endTime,
                    start_time: value.timing.startTime,
                    website_url: value.websiteUrl,
                    facebook: value.facebook,
                    instagram: value.instagram,
                    twitter: value.twitter,
                    isOpen: value.isOpen === 'true' ? true : false,
                    phone: value.phone,
                    email: value.email,
                    mall: value.mall,
                    established_date: value.established_date,
                    floor: value.floor,
                    store_number: value.store_number,
                    image_url: value.image_url,
                    media: {
                        website_url: value.website_url,
                        maps_url: value.maps_url
                    }
                }
                let res = await storeService.updateStoreById(storeId, payload)
                if (res?.data) {
                    setStatus('')
                    successToast('Store updated successfully')
                }
            } catch (error) {
                setStatus(error.response.data.message)
            } finally {
                setLoading(false);
                setSubmitting(false);
            }
        }

        return (
            <div className='text-center text-slate-900 pt-4'>
                <button
                    onClick={() => handleSave(values)}
                    className='bg-slate-400 w-full py-2 font-semibold rounded-sm cursor-pointer'
                >
                    Edit
                </button>
            </div>
        )
    }

    useEffect(() => {
        setFieldDefinations(updateStoreFormFieldDefinations(mallsData, categoryData, selectedMall, handleSelectFloor, selectedFloorOptions, initialValues))
    }, [mallsData, categoryData, selectedMall, selectedFloorOptions, initialValues])

    const formClassname = {
        parentContainer: 'w-full text-white',
        FieldContainer: 'mb-4'
    }
    return (
        <div className="p-4">
            <BaseLoading loading={loading}>
                <BasePage title={"Edit Store"}>
                    <div className='mt-6'>
                        {/* <CityForm /> */}
                        {fieldDefinations?.length > 0 && (
                            <FormBase
                                fieldDefinitions={fieldDefinations}
                                initialValues={initialValues}
                                formClassname={formClassname}
                                dropdownRef={dropdownRef}
                            >
                                <AddNewParamButtons />
                            </FormBase>
                        )}
                    </div>
                </BasePage>
            </BaseLoading>
        </div>
    );
}

export default EditStore;
