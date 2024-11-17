import React, { useEffect, useRef, useState } from 'react';
import BaseLoading from '../../../components/loader/config-loading';
import BasePage from '../../../components/common/basePage';
import { useParams } from 'react-router-dom';
import adminProductServices from '../../../services/admin/product.service';
import storeService from '../../../services/store.service';
import FormBase from '../../../components/common/forms/baseFormNested';
import { AddProductFormFieldDefinations } from './../../../containers/fielddefinations/productFormFieldDefinations';
import { useFormikContext } from 'formik';
import { successToast } from '../../../components/toastNotifications';

const EditProduct = () => {
    const { productId } = useParams()
    const [loading, setLoading] = useState(false)
    const [fieldDefinations, setFieldDefinations] = useState(null)
    const [prodcutsData, setProdcutsData] = useState(null)
    const [storeData, setStoreData] = useState(null)
    const dropdownRef = useRef(null);
    const [initialValues, setInitialValues] = useState({
        name: '',
        quanity: '',
        store: false,
        price: '',
        image: ''
    });


    useEffect(() => {
        const fetchData = async () => {
            try {
                let res = await adminProductServices.getProductById(productId)
                if (res.data) {
                    setInitialValues({
                        ...res.data,
                    })
                }
            } catch (e) {
                console.log(e);
            }
        }

        fetchData()
    }, [productId])
    useEffect(() => {
        const fetchData = async () => {
            try {
                let res = await storeService.getStores()

                if (res.data) {
                    setStoreData(res.data)
                }
            } catch (e) {
                console.log(e);
            }
        }

        fetchData()
    }, [])

    const formClassname = {
        parentContainer: 'w-full text-white',
        FieldContainer: 'mb-4'
    }

    const AddNewParamButtons = () => {
        const { values, setStatus, setSubmitting } = useFormikContext()
        console.log(values);
        // setInitialValues(values)
        const handleSave = async (value) => {
            setLoading(true);
            try {
                let res = await adminProductServices.updateProductById(productId, value)
                if (res?.data) {
                    setStatus('')
                    successToast('Product updated successfully')
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
        setFieldDefinations(AddProductFormFieldDefinations(storeData))
    }, [storeData])
    return (
        <div className="p-4">
            <BaseLoading loading={loading}>
                <BasePage title={"Edit Product"}>
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

export default EditProduct;
