import React, { useEffect, useState } from 'react';
import BasePage from '../../../components/common/basePage';
import CityForm from './../../../components/forms/citryForm';
import FormBase from '../../../components/common/forms/baseFormNested';
import { AddCityParametersFieldDefinitionsArray } from '../../../containers/fielddefinations/cityFormFieldDefinations';
import locationService from '../../../services/location.service';
import { useFormikContext } from 'formik';
import BaseLoading from '../../../components/loader/config-loading';
import { successToast } from '../../../components/toastNotifications';
import { AddMallFormFieldDefinations } from '../../../containers/fielddefinations/mallFormFieldDefinations';
import mallServices from '../../../services/mall.service';
import AddFloorsForm from '../../../components/forms/addFloorForm';

const MallPage = () => {
    const [fieldDefinations, setFieldDefinations] = useState([])
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
        const { values, isValid, setStatus, setSubmitting } = useFormikContext()
        console.log(values);
        setSelectedState(values.state)

        const handleSave = async (value) => {
            // setLoading(true);
            try {
                const payload = {
                    title: value.title,
                    city: value.city,
                    state: value.state,
                    locations: value.locations
                }
                let res = await mallServices.createMall(payload, value.state)

                if (res?.data) {
                    successToast('Mall created successfully')
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
        setFieldDefinations(AddMallFormFieldDefinations(stateData, cityData))
    }, [stateData, cityData])

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

export default MallPage;
