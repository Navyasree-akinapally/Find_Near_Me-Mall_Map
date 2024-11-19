import React, { useEffect, useState } from 'react';
import BaseLoading from '../../../components/loader/config-loading';
import BasePage from '../../../components/common/basePage';
import FormBase from '../../../components/common/forms/baseFormNested';
import { dismissToast, successToast } from '../../../components/toastNotifications';
import { useFormikContext } from 'formik';
import { AddCategoryFormFieldDefinations } from '../../../containers/fielddefinations/categoryFormFieldDefinations';
import adminCategoryService from '../../../services/admin/category.service';
import TimeRangeSelector from '../../../components/globals/selectTimings';

const CreateCategories = () => {
    const [loading, setLoading] = useState(false)
    const [fieldDefinations, setFieldDefinations] = useState(null)
    const [initialValues, setInitialValues] = useState({
        title: ''
    })

    const AddNewParamButtons = () => {
        const { values, setStatus, setSubmitting } = useFormikContext()
        console.log(values);

        const handleSave = async (value) => {
            setLoading(true);
            try {
                const payload = {
                    title: value.title
                }
                console.log(value);
                let res = await adminCategoryService.createCategory(payload)
                dismissToast()

                if (res?.data) {
                    setStatus("")
                    successToast('category created successfully')
                }
            } catch (error) {
                setStatus(error.response.data.message)
            } finally {
                setLoading(false);
                setSubmitting(false);
            }
        }

        useEffect(() => {
            setTimeout(() => {
                setStatus("")
            }, 2000)
        }, [setStatus])

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

    useEffect(() => {
        setFieldDefinations(AddCategoryFormFieldDefinations)
    }, [])

    const formClassname = {
        parentContainer: 'w-full text-white',
        FieldContainer: 'mb-4'
    }
    return (
        <div className="p-4">
            <BaseLoading loading={loading}>
                <BasePage title={"Create Category"}>
                    <div className='mt-6'>
                        {fieldDefinations?.length > 0 && (
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

export default CreateCategories;
