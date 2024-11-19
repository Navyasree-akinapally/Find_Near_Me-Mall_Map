import { useEffect, useState } from "react";
import BaseLoading from "../../../components/loader/config-loading";
import { stateFormFieldDefinations } from './../../../containers/fielddefinations/stateFormFieldDefinations';
import BasePage from "../../../components/common/basePage";
import FormBase from "../../../components/common/forms/baseFormNested";
import { successToast } from "../../../components/toastNotifications";
import locationService from "../../../services/location.service";
import { useFormikContext } from "formik";

const StateCreatePage = ({ onStateCreated }) => {
    const [fieldDefinations, setFieldDefinations] = useState([]);
    const [loading, setLoading] = useState(false);
    const initialValues = { state: '' };

    const AddNewParamButtons = () => {
        const { values, setStatus, setSubmitting } = useFormikContext();

        const handleSave = async (value) => {
            setLoading(true);
            try {
                const payload = { name: value.state };
                const res = await locationService.createState(payload);

                if (res?.data) {
                    successToast('State created successfully');
                    onStateCreated(res.data); // Send new state to parent component
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

    useEffect(() => {
        setFieldDefinations(stateFormFieldDefinations);
    }, []);

    return (
        <div className="p-4">
            <BaseLoading loading={loading}>
                <BasePage title={"Create State"}>
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

export default StateCreatePage;
