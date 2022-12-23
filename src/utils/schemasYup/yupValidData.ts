import * as yup from 'yup';

export const yupValidData = {
  fullName: yup
    .string()
    .trim()
    .min(5, 'The fullName is too short(min 5)'),

  password: yup
    .string()
    .lowercase()
    .min(5, 'The password is too short(min 5)')
    .max(15, 'Too long password(max 15)')
    .trim()
    .required('Password required'),

  email: yup
    .string()
    .lowercase()
    .email('email must be a valid email')
    .min(10, 'Min 10 length, Ex: 123@mail.ru')
    .max(30, 'Max 30 length, Ex: 123@mail.ru')
    .trim(),

  dob: yup
    .string(),
};
