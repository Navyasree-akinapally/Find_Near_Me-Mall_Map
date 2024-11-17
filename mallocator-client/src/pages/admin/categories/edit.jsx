import React, { useEffect, useState } from 'react';
import BasePage from '../../../components/common/basePage';
import FormBase from '../../../components/common/forms/baseFormNested';
import { useFormikContext } from 'formik';
import BaseLoading from '../../../components/loader/config-loading';
import { successToast } from '../../../components/toastNotifications';
import { useParams } from 'react-router-dom';
import adminCategoryService from '../../../services/admin/category.service';
import { UpdateCategoryFormFieldDefinations } from '../../../containers/fielddefinations/categoryFormFieldDefinations';

const EditCategory = () => {
    const { categoryId } = useParams()
    const [fieldDefinations, setFieldDefinations] = useState([])
    const [loading, setLoading] = useState(false);
    const [initialValues, setInitialValues] = useState({
        title: '',
    });


    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const res = await adminCategoryService.getCategoryById(categoryId);
                if (res.data) {
                    setInitialValues(res.data)
                }
            } catch (e) {
                console.log(e);
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [categoryId])


    const AddNewParamButtons = () => {
        const { values, setStatus, setSubmitting } = useFormikContext()

        const handleSave = async (value) => {
            setLoading(true);
            try {
                const payload = {
                    title: value.title,
                }
                let res = await adminCategoryService.updateCategoryById(categoryId, payload)

                if (res?.data) {
                    successToast('Category updated successfully')
                }

            } catch (error) {
                setStatus(error?.response?.data?.message)
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
        setFieldDefinations(UpdateCategoryFormFieldDefinations)
    }, [])

    const formClassname = {
        parentContainer: 'w-full text-white',
        FieldContainer: 'mb-4'
    }
    return (
        <div className="p-4">
            <BaseLoading loading={loading}>
                <BasePage title={"Create Mall"}>
                    <div className='mt-6'>
                        {/* <CityForm /> */}
                        {fieldDefinations.length > 0 && (
                            <FormBase
                                fieldDefinitions={fieldDefinations}
                                initialValues={initialValues}
                                formClassname={formClassname}
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

export default EditCategory;
