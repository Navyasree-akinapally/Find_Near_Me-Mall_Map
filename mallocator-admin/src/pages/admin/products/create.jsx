import React, { useEffect, useRef, useState } from 'react';
import BaseLoading from '../../../components/loader/config-loading';
import BasePage from '../../../components/common/basePage';
import FormBase from '../../../components/common/forms/baseFormNested';
import { successToast } from '../../../components/toastNotifications';
import adminProductServices from '../../../services/admin/product.service';
import { useFormikContext } from 'formik';
import storeService from '../../../services/store.service';
import { AddProductFormFieldDefinations } from '../../../containers/fielddefinations/productFormFieldDefinations';

const CreateProduct = () => {
    const [fieldDefinations, setFieldDefinations] = useState([])
    const [loading, setLoading] = useState(false);
    const [storeData, setStoreData] = useState(null)
    const dropdownRef = useRef(null);
    const [initialValues, setInitialValues] = useState({
        name: '',
        store: '',
        price: 0,
        quantity: 0
    });
    const formClassname = {
        parentContainer: 'w-full text-white',
        FieldContainer: 'mb-4'
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const res = await storeService.getStores();
                // console.log(res.data);
                if (res.data) {
                    setStoreData(res.data)
                }
            } catch (e) {
                console.log(e);
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    const AddNewParamButtons = () => {
        const { values, isValid, setStatus, setSubmitting } = useFormikContext()
        console.log(values);

        const handleSave = async (value) => {
            setLoading(true);
            try {
                let res = await adminProductServices.createProduct(value)

                if (res?.data) {
                    successToast('Product created successfully')
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

    useEffect(() => {
        setFieldDefinations(AddProductFormFieldDefinations(storeData))
    }, [storeData])
    return (
        <div className="p-4">
            <BaseLoading loading={loading}>
                <BasePage title={"Create Product"}>
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

export default CreateProduct;
