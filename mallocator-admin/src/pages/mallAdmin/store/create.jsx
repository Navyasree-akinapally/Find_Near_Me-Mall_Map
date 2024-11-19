import React, { useEffect, useRef, useState } from 'react';
import BasePage from '../../../components/common/basePage';
import FormBase from '../../../components/common/forms/baseFormNested';
import { useFormikContext } from 'formik';
import BaseLoading from '../../../components/loader/config-loading';
import { successToast } from '../../../components/toastNotifications';
import { AddStoreFormFieldDefinations } from '../../../containers/fielddefinations/storeFormFieldDefinations';
import { useNavigate } from 'react-router-dom';
import mallAdminServices from './../../../services/mallAdmin.service';
import mallServices from './../../../services/mallAdmin/mall.service';
import adminCategoryService from './../../../services/mallAdmin/category.service';
import storeService from './../../../services/mallAdmin/store.service';

const CreateStore = () => {
    const [fieldDefinations, setFieldDefinations] = useState([])
    const [loading, setLoading] = useState(false);
    const [mallsData, setMallsData] = useState(null)
    const [categoryData, setCategoryData] = useState(null)
    const dropdownRef = useRef(null);
    const [selectedMall, setSelectedMall] = useState(null)
    const [selectedFloor, setSelectedFloor] = useState(null)
    const [selectedFloorOptions, setSelectedFloorOptions] = useState(null)
    const handleSelectFloor = (value) => {
        setSelectedFloor(value)
    }
    const navigate = useNavigate()

    useEffect(() => {
        const storeNumbers = selectedMall?.available_floors?.find(floor => floor.floor === selectedFloor)?.store_numbers
        console.log(storeNumbers);
        setSelectedFloorOptions(storeNumbers)
    }, [selectedFloor, selectedMall?.available_floors])


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
        timing: {
            startTime: '',
            endTime: ''
        }
    });

    console.log(initialValues);

    useEffect(() => {
        if (initialValues.mall && mallsData) {
            console.log(mallsData);
            setSelectedMall(mallsData?.find(mall => mall._id === initialValues.mall))
        }
    }, [initialValues.mall, mallsData])


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


    const AddNewParamButtons = () => {
        const { values, setStatus, setSubmitting } = useFormikContext()
        console.log(values);
        setInitialValues(values)
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
                    image_url: value.image_url
                }
                let res = await storeService.createStore(payload)
                if (res?.data) {
                    setStatus('')
                    successToast('Store created successfully')
                    // navigate('/store/list')
                    window.location.reload()
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
                    Add
                </button>
            </div>
        )
    }
    console.log(selectedMall);
    useEffect(() => {
        setFieldDefinations(AddStoreFormFieldDefinations(mallsData, categoryData, selectedMall, handleSelectFloor, selectedFloorOptions))
    }, [mallsData, categoryData, selectedMall, selectedFloorOptions])
    const formClassname = {
        parentContainer: 'w-full text-white',
        FieldContainer: 'mb-4'
    }
    return (
        <div className="p-4">
            <BaseLoading loading={loading}>
                <BasePage title={"Create Store"}>
                    <div className='mt-6'>
                        {/* <CityForm /> */}
                        {fieldDefinations.length > 0 && (
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

export default CreateStore;
