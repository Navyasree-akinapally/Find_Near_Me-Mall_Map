import { useRef, useState } from "react";
import { Formik, Form, Field } from "formik";
import './BaseFormNestedStyles.css'
import clsx from "clsx";
import * as Yup from 'yup'; // Import Yup
import TimeSelector from "../../globals/selectTimings/timeSelector";
import TimeRangeSelector from "../../globals/selectTimings";
import SearchableSelect from "../../globals/search";
import BaseDatePicker from "../../globals/date-picker";
import AddFloorsForm from "../../forms/addFloorForm";
import { Switch } from "@headlessui/react";

const FormBase = ({
    fieldDefinitions,
    initialValues,
    isReadOnly,
    children,
    customCheckboxHandleChange,
    customSelectHandleChange,
    NoValidationFields = [],
    formClassname,
    dropdownRef
}) => {

    // const filteredFieldDefinitions = fieldDefinitions.map(fieldGroup => {
    //     const filteredFields = fieldGroup.fields.filter(field => !NoValidationFields.includes(field?.name));
    //     return { ...fieldGroup, fields: filteredFields };
    // });

    // const validationSchema = createValidationSchema(filteredFieldDefinitions);
    const [Password, setPassword] = useState(false);
    const [ConfirmPassword, setConfirmPassword] = useState(false);
    const InputBackground = "rgb(232,240,254)";


    // Define validation schema
    const validationSchema = Yup.object().shape({
        title: Yup.string().required('Title is required'),
        city: Yup.string().required('City Name is required'),
        state: Yup.string().required('State is required'),
    });

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={() => { }}
            enableReinitialize={true}
            validateOnMount={true}
        >
            {({
                values,
                errors,
                handleChange,
                handleBlur,
                touched,
                setFieldValue,
                validateForm,
                status
            }) => {
                return (
                    <Form className={formClassname?.parentContainer} style={{ padding: "1rem", margin: "1rem", marginTop: "10px" }}>
                        <div className={formClassname?.FieldContainer} ref={dropdownRef}>
                            {fieldDefinitions.map((fieldGroup, groupIndex) => (
                                <div className={fieldGroup.fieldsParentContainerClass} key={groupIndex}>
                                    {fieldGroup.fieldGroupTitle &&
                                        <div className={fieldGroup.fieldGroupTitleClass}>{fieldGroup.fieldGroupTitle}</div>
                                    }
                                    <div className={` ${fieldGroup.fieldsContainerClass}`}>
                                        {fieldGroup.label && (
                                            <label
                                                className={"block text-black text-sm font-bold mb-2"}
                                                htmlFor={fieldGroup.name}
                                            >
                                                {fieldGroup.label}
                                            </label>
                                        )}
                                        {status && (
                                            <div className="mb-4 text-red-600 font-bold">
                                                <div>{status}</div>
                                            </div>
                                        )}
                                        <div key={groupIndex} className={fieldGroup.outerClass}>
                                            {fieldGroup.fields.map((field, fieldIndex) => (
                                                <div key={fieldIndex}>
                                                    {/* {field?.title && (
                                                        <div className={"block text-black text-sm font-bold mb-2"}>{field.title}</div>
                                                    )} */}
                                                    {field?.label && (
                                                        <label className="block text-black text-sm font-bold mb-2"
                                                            htmlFor={field?.name}
                                                        >
                                                            {field?.label}
                                                        </label>
                                                    )}
                                                    <div className={``}>
                                                        {
                                                            (
                                                                field?.loading ? (
                                                                    <div className="spinner-container text-center">
                                                                        <span className="spinner-border text-primary mx-1 my-1"></span>
                                                                    </div>
                                                                ) : field?.type === "checkbox" ? (
                                                                    field?.options?.map(
                                                                        (option, optionIndex) => (
                                                                            <div key={optionIndex} className={field.classes.radioCheckboxContainer}>
                                                                                {field.labelFirst && <label
                                                                                    htmlFor={`${field?.name}-${option.value}`}
                                                                                    className={field.classes.label}
                                                                                >
                                                                                    {option.label}
                                                                                </label>}
                                                                                <Field
                                                                                    type={field?.type}
                                                                                    name={field?.name}
                                                                                    id={`${field?.name}-${option.value}`}
                                                                                    value={option.value}
                                                                                    checked={Array.isArray(values[field?.name])
                                                                                        ? values[field?.name].includes(option.value)
                                                                                        : values[field?.name] === option.value
                                                                                    }
                                                                                    onChange={(event) => customCheckboxHandleChange
                                                                                        ? customCheckboxHandleChange(event, setFieldValue, values)
                                                                                        : handleChange(event)}
                                                                                    onBlur={handleBlur}
                                                                                    className={field.classes.input}
                                                                                    placeholder={field?.placeholder}
                                                                                    readOnly={isReadOnly}
                                                                                    disabled={isReadOnly || field?.readonly}
                                                                                />
                                                                                {!field.labelFirst && <label
                                                                                    htmlFor={`${field?.name}-${option.value}`}
                                                                                    className={field.classes.label}
                                                                                >
                                                                                    {option.label}
                                                                                </label>}
                                                                            </div>
                                                                        ))
                                                                ) : field?.type === "select" ? (
                                                                    <div>
                                                                        <select
                                                                            name={field?.name}
                                                                            id={field?.name}
                                                                            onChange={(event) => {
                                                                                if (field.onChange) {
                                                                                    field.onChange(event)
                                                                                    handleChange(event)
                                                                                } else {
                                                                                    handleChange(event)
                                                                                }
                                                                            }}
                                                                            onBlur={handleBlur}
                                                                            value={values[field?.name]}
                                                                            required
                                                                            disabled={isReadOnly || field?.readonly}
                                                                            className="w-full px-3 py-2  bg-gray-200 text-black rounded-sm outline-none placeholder:text-black"
                                                                        >
                                                                            {field.options &&
                                                                                field.options.length &&
                                                                                field.options.map(
                                                                                    (option, optionIndex) => (
                                                                                        <option
                                                                                            value={option.value}
                                                                                            key={optionIndex}
                                                                                        >
                                                                                            {" "}
                                                                                            {option.label}{" "}
                                                                                            {option.locationData && (
                                                                                                <>
                                                                                                    <span className="text-sm">{option.locationData.state}, {option.locationData.city}</span>
                                                                                                </>
                                                                                            )}
                                                                                        </option>
                                                                                    )
                                                                                )}
                                                                        </select>
                                                                    </div>
                                                                ) : field?.type === "datepicker" ? (
                                                                    <div>
                                                                        <BaseDatePicker
                                                                            customClassName={field.classes}
                                                                            fieldName={field?.name}
                                                                            initialValues={initialValues}
                                                                        />
                                                                    </div>
                                                                ) : field?.type === "switch" ? (
                                                                    <div>
                                                                        <Switch
                                                                            checked={values[field?.name] === undefined ? '' : values[field?.name]}
                                                                            onChange={handleChange}
                                                                            className={`group relative flex h-10 w-16 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none p-2 bg-[#B9B4C7]`}
                                                                        >
                                                                            <span
                                                                                aria-hidden="true"
                                                                                className={`pointer-events-none inline-block rounded-full ring-0 shadow-lg transition duration-200 ease-in-out size-6 bg-[#352F44] `}
                                                                            />
                                                                        </Switch>
                                                                    </div>
                                                                )
                                                                    : field?.type === "searchable-select" ? (
                                                                        <div>
                                                                            <SearchableSelect
                                                                                options={field.options}
                                                                                value={values[field?.name]}
                                                                                onChange={(val) => setFieldValue(field?.name, val)}
                                                                                name={field?.name}
                                                                                placeholder={field?.placeholder}
                                                                                dropdownRef={dropdownRef}
                                                                            />
                                                                        </div>
                                                                    ) : field?.type === "textarea" ? (
                                                                        <Field
                                                                            as={'textarea'}
                                                                            name={field?.name}
                                                                            id={field?.name}
                                                                            value={values[field?.name] === undefined ? '' : values[field?.name]}
                                                                            onChange={handleChange}
                                                                            onBlur={handleBlur}
                                                                            className={field.classes.input}
                                                                            placeholder={field?.placeholder}
                                                                            readOnly={isReadOnly}
                                                                            disabled={isReadOnly || field?.readonly}
                                                                        />
                                                                    ) : field?.type === "disable" ? (
                                                                        <input
                                                                            type="text"
                                                                            name={field?.name}
                                                                            id={field?.name}
                                                                            value={field.value}
                                                                            placeholder={field?.placeholder}
                                                                            disabled={true}
                                                                            className={"w-full px-3 py-2  bg-gray-400 text-black rounded-sm outline-none placeholder:text-black cursor-not-allowed"}
                                                                        />
                                                                    ) : field?.type === "image" ? (
                                                                        <div className="">
                                                                            <input
                                                                                type="text"
                                                                                name={field?.name}
                                                                                id={field?.name}
                                                                                value={values[field?.name] === undefined ? '' : values[field?.name]}
                                                                                placeholder={field?.placeholder}
                                                                                onChange={handleChange}
                                                                                className={"w-full px-3 py-2  bg-gray-200 text-black rounded-sm outline-none placeholder:text-black"}
                                                                            />
                                                                            {/* <img src={values[field?.name] === undefined ? '' : values[field?.name]} alt={field.value} className="w-8 h-8" /> */}
                                                                        </div>
                                                                    ) :
                                                                        field?.type === "password" ? (
                                                                            <div className={field.classes.container}>
                                                                                <div className="input-group">
                                                                                    <Field
                                                                                        style={{ backgroundColor: InputBackground }}
                                                                                        type={Password ? "text" : "password"}
                                                                                        name={field?.name}
                                                                                        id={field?.name}
                                                                                        value={values[field?.name] === undefined ? '' : values[field?.name]}
                                                                                        onChange={handleChange}
                                                                                        onBlur={handleBlur}
                                                                                        className={`${field.classes.input} border-end-0`}
                                                                                        readOnly={isReadOnly}
                                                                                        disabled={isReadOnly || field?.readonly}
                                                                                    />
                                                                                    <span
                                                                                        className="input-group-text ms-n3 border-0 rounded-end"
                                                                                        onClick={() => setPassword(!Password)}
                                                                                        style={{ cursor: 'pointer', backgroundColor: InputBackground }}
                                                                                    >
                                                                                        <i className={clsx("bi", Password ? "bi-eye-slash" : "bi-eye")}></i>
                                                                                    </span>
                                                                                </div>
                                                                            </div>
                                                                        ) : field?.type === "confirmPassword" ? (
                                                                            <div className={field.classes.container}>
                                                                                <div className="input-group">
                                                                                    <Field
                                                                                        style={{ backgroundColor: InputBackground }}
                                                                                        type={ConfirmPassword ? "text" : "password"}
                                                                                        name={field?.name}
                                                                                        id={field?.name}
                                                                                        value={values[field?.name] === undefined ? '' : values[field?.name]}
                                                                                        onChange={handleChange}
                                                                                        onBlur={handleBlur}
                                                                                        className={`${field.classes.input} border-end-0`}
                                                                                        readOnly={isReadOnly}
                                                                                        disabled={isReadOnly || field?.readonly}
                                                                                    />
                                                                                    <span
                                                                                        className="input-group-text ms-n3 border-0 rounded-end"
                                                                                        onClick={() => setConfirmPassword(!ConfirmPassword)}
                                                                                        style={{ cursor: 'pointer', backgroundColor: "rgb(232, 240, 254)" }}
                                                                                    >
                                                                                        <i className={clsx("bi", ConfirmPassword ? "bi-eye-slash" : "bi-eye")}></i>
                                                                                    </span>
                                                                                </div>
                                                                            </div>
                                                                        ) : field?.type === "timeselector" ? (
                                                                            <TimeRangeSelector
                                                                                name={field?.name}
                                                                                value={values[field?.name]}
                                                                                onChange={(val) =>
                                                                                    setFieldValue(field?.name, val)
                                                                                }
                                                                            />
                                                                        ) : field?.type === "mall-locations" ? (
                                                                            <AddFloorsForm
                                                                                name={field?.name}
                                                                                floorsData={field?.floorsData}
                                                                                value={values[field?.name]}
                                                                                onChange={(val) =>
                                                                                    setFieldValue(field?.name, val)
                                                                                }
                                                                            />
                                                                        ) : (
                                                                            <div className="">
                                                                                <Field
                                                                                    type={field?.type}
                                                                                    name={field?.name}
                                                                                    id={field?.name}
                                                                                    value={values[field?.name] === undefined ? '' : values[field?.name]}
                                                                                    onChange={handleChange}
                                                                                    onBlur={handleBlur}
                                                                                    placeholder={field?.placeholder}
                                                                                    readOnly={isReadOnly}
                                                                                    disabled={isReadOnly || field?.readonly}
                                                                                    className={"w-full px-3 py-2  bg-gray-200 text-black rounded-sm outline-none placeholder:text-black"}
                                                                                />
                                                                            </div>
                                                                        )
                                                            )
                                                        }
                                                        <div className={`mb-4 text-red-600 font-bold ${NoValidationFields.includes(field?.name) ? '' : 'h-20px'} ${field?.name === 'parentforeignsource' ? 'h-20px' : ''}`}>
                                                            {touched[field?.name] && errors[field?.name] && !field.loading && (
                                                                <>{errors[field?.name]}</>
                                                            )}
                                                            {field?.CustomErrorMessage && <>{' '}{field?.CustomErrorMessage}</>}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className={formClassname?.ChildrenContainer}>
                            {children}
                        </div>
                    </Form>
                )
            }
            }
        </Formik >
    );
};
export default FormBase;
