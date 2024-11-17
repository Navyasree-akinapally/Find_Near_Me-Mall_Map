import * as Yup from 'yup';
import { regex } from '../../../constants/regex';

function createValidationSchema(fieldDefinitions: any) {
  const validationSchema = Yup.object().shape(
    fieldDefinitions.reduce((acc: any, fieldGroup: any) => {
      fieldGroup.fields?.forEach((field: any) => {
        let validation;
        switch (field.type) {
          case 'text':
          case 'username':
            validation = Yup.string()
              .matches(
                /^[a-zA-Z]{3}/,
                'First 3 characters must be letters'
              )
              .matches(
                /^[a-zA-Z0-9 @_-]*$/,
                'Only letters, numbers, underscores, and hyphens allowed'
              );
            break;
          case 'id':
            validation = Yup.string().min(3)
              .matches(regex.id, 'Enter Valid ID')
            break;
          case 'number':
            validation = Yup.number()
              .typeError(`${field.name} must be a number`)
              .min(0, `${field.name} must be greater than or equal to 0`);
            break;
          case 'email':
            validation = Yup.string()
              .matches(regex.email, 'Enter valid email address')
            break;
          case 'date':
            validation = Yup.date()
              .min(new Date(), `${field.label} must be in the future`);
            break;
          case 'checkbox':
          case 'radio':
            if (fieldGroup.name === 'rolepermissions' || fieldGroup.name === 'saveoptions') {
              validation = Yup.array()
                .min(1, `At least one ${field.name} must be selected`)
                .nullable();
            } else {
              validation = Yup.string()
                .oneOf(
                  field.options?.map((option: any) => option.value),
                  `${field.label} is required`
                )
            }
            break;
          case 'select':
            validation = Yup.string()
              .notOneOf(['null', 'none', "", 'select'], `Choose a valid option`)
            break;
          case 'title':
            validation = Yup.string()
              .matches(regex.title, `${field.name} can only contain letters, numbers, and spaces`)
            break;
          case 'url':
            validation = Yup.string().url('Enter a Valid Url')
            break;
          case 'latitude':
            validation = Yup.string()
              .matches(regex.latitude, 'Invalid Latitude. Enter a valid latitude value');
            break;
          case 'longitude':
            validation = Yup.string()
              .matches(regex.longitude, 'Invalid Longitude. Enter a valid longitude value');
            break;

          default:
            validation = Yup.mixed()
            break;
        }
        if (field.name === 'confirmpassword') {
          validation = Yup.string()
            .oneOf([Yup.ref('password')], 'Password is not matching')
        }
        if (fieldGroup.name === 'duration') {
          if (field.name === 'day') {
            validation = Yup.number()
              .positive('Day must be a positive number')
              .integer('Day must be an integer')
              .min(0, 'Day must be greater than or equal to 0')
              .required(`${field.name} is required`)
          } else if (field.name === 'hours') {
            validation = Yup.number()
              .min(0, `${field.label} must be greater than or equal 0`)
              .required(`${field.name} is required`);
          } else if (field.name === 'minutes') {
            validation = Yup.number()
              .min(1, `${field.label} must be greater than 0`)
              .required(`${field.name} is required`);
          } else {
            validation = Yup.number()
              .min(0, `${field.label} must be greater than or equal to 0`)
              .required(`${field.name} is required`)
          }
        }

        acc[field.name] = validation;
      });

      return acc;
    }, {})
  );
  return validationSchema;
}

export default createValidationSchema;
