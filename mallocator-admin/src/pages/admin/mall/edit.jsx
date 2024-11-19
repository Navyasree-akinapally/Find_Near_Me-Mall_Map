import React, { useEffect, useState } from 'react';
import BasePage from '../../../components/common/basePage';
import FormBase from '../../../components/common/forms/baseFormNested';
import locationService from '../../../services/location.service';
import { useFormikContext } from 'formik';
import BaseLoading from '../../../components/loader/config-loading';
import { successToast } from '../../../components/toastNotifications';
import { AddMallFormFieldDefinations, UpdateMallFormFieldDefinations } from '../../../containers/fielddefinations/mallFormFieldDefinations';
import mallServices from '../../../services/mall.service';
import { useParams } from 'react-router-dom';

const CreateMall = () => {
    const { mallId } = useParams()
    const [fieldDefinations, setFieldDefinations] = useState([])
    const [loading, setLoading] = useState(false);
    const [selectedState, setSelectedState] = useState('')
    const [stateData, setStateData] = useState(null)
    const [cityData, setCityData] = useState(null)
    const [initialValues, setInitialValues] = useState({
        title: '',
        state: '',
        city: '',
        _id: '',
        available_floors: [
            {
                floor: '',
                store_numbers: ['']
            }
        ]
    });

    console.log(initialValues);

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

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const res = await mallServices.getMallById(mallId);
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
    }, [mallId])

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const res = await locationService.getState();
                // console.log(res.data);
                if (res.data) {
                    setStateData(res.data)
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
        const { values, setStatus, setSubmitting } = useFormikContext()
        // console.log(values);
        setSelectedState(values.state)

        console.log(values);


        const handleSave = async (value) => {
            const updatedAvailableFloors = JSON.stringify(initialValues.available_floors) !== JSON.stringify(value.available_floors)
                ? value.available_floors
                : null;  // If changed, send updated value; otherwise, send null

            console.log(value);
            setLoading(true);
            try {
                const payload = {
                    title: value.title,
                    city: value.city,
                    state: value.state,
                    locations: updatedAvailableFloors,
                    location_url: value.location_url
                }
                let res = await mallServices.updateMallById(mallId, payload)

                if (res?.data) {
                    successToast('Mall updated successfully')
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
    console.log(initialValues.available_floors);
    useEffect(() => {
        setFieldDefinations(UpdateMallFormFieldDefinations(stateData, cityData, initialValues.available_floors))
    }, [stateData, cityData, initialValues.available_floors])

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

export default CreateMall;
