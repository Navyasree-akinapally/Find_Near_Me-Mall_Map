import React, { useEffect, useState } from 'react';
import BasePage from '../../../components/common/basePage';
import CityForm from './../../../components/forms/citryForm';
import FormBase from '../../../components/common/forms/baseFormNested';
import { AddCityParametersFieldDefinitionsArray } from '../../../containers/fielddefinations/cityFormFieldDefinations';
import locationService from '../../../services/location.service';
import { useFormikContext } from 'formik';
import BaseLoading from '../../../components/loader/config-loading';
import { successToast } from '../../../components/toastNotifications';

const CityCreatePage = ({ states }) => {
    const [fieldDefinations, setFieldDefinations] = useState([]);
    const [loading, setLoading] = useState(false);
    const initialValues = { city: '', state: '' };
    const [stateData, setStateData] = useState([])

    useEffect(() => {
        // Update field definitions to include state options
        setFieldDefinations(AddCityParametersFieldDefinitionsArray(stateData));
    }, [stateData]); // Re-run when states change

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
        const { values, setStatus, setSubmitting } = useFormikContext();

        const handleSave = async (value) => {
            setLoading(true);
            try {
                const payload = { name: value.city };
                const res = await locationService.createCity(payload, value.state);

                if (res?.data) {
                    successToast('City created successfully');
                }
            } catch (error) {
                setStatus(error.response.data.message);
            } finally {
                setLoading(false);
                setSubmitting(false);
            }
        };

        return (
            <div className="text-center text-slate-900 pt-4">
                <button
                    onClick={() => handleSave(values)}
                    className="bg-slate-400 w-full py-2 font-semibold rounded-sm cursor-pointer"
                >
                    Add
                </button>
            </div>
        );
    };

    return (
        <div className="p-4">
            <BaseLoading loading={loading}>
                <BasePage title={"Create City"}>
                    <div className="mt-6">
                        {fieldDefinations.length > 0 && (
                            <FormBase
                                fieldDefinitions={fieldDefinations}
                                initialValues={initialValues}
                                formClassname={{
                                    parentContainer: 'w-full text-white',
                                    FieldContainer: 'mb-4',
                                }}
                            >
                                <AddNewParamButtons />
                            </FormBase>
                        )}
                    </div>
                </BasePage>
            </BaseLoading>
        </div>
    );
};

export default CityCreatePage;
