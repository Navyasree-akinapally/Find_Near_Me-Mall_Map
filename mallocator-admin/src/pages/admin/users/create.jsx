import React, { useEffect, useRef, useState } from 'react';
import BasePage from '../../../components/common/basePage';
import FormBase from '../../../components/common/forms/baseFormNested';
import { useFormikContext } from 'formik';
import BaseLoading from '../../../components/loader/config-loading';
import { successToast } from '../../../components/toastNotifications';
import { AddStoreFormFieldDefinations } from '../../../containers/fielddefinations/storeFormFieldDefinations';
import mallServices from '../../../services/mall.service';
import storeService from './../../../services/store.service';
import adminCategoryService from '../../../services/admin/category.service';
import { useNavigate } from 'react-router-dom';
import { AddMallAdminFormFieldDefinations } from '../../../containers/fielddefinations/userFormFieldDefinations';
import mallAdminServices from '../../../services/mallAdmin.service';

const CreateMallAdmin = () => {
    const [fieldDefinations, setFieldDefinations] = useState([])
    const [loading, setLoading] = useState(false);
    const [mallsData, setMallsData] = useState(null)
    const [categoryData, setCategoryData] = useState(null)
    const dropdownRef = useRef(null);
    const [selectedMall, setSelectedMall] = useState(null)
    const [selectedFloor, setSelectedFloor] = useState(null)
    const [selectedFloorOptions, setSelectedFloorOptions] = useState(null)



    const [initialValues, setInitialValues] = useState({
        username: '',
        email: '',
        password: '',
        confirm_password: ''
    });

    console.log(initialValues);


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
                const mallIds = value.mall.map((mall) => mall.value)
                const payload = {
                    username: value.username,
                    email: value.email,
                    password: value.password,
                    mallIds
                }
                let res = await mallAdminServices.createMallAdmin(payload)
                if (res?.data) {
                    setStatus('')
                    successToast('user created successfully')
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
                    Create
                </button>
            </div>
        )
    }
    console.log(selectedMall);
    useEffect(() => {
        setFieldDefinations(AddMallAdminFormFieldDefinations(mallsData))
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

export default CreateMallAdmin;
