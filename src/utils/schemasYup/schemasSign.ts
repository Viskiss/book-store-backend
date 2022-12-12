import * as yup from 'yup';

const yupValidData = {
  fullName:
  yup.string().min(5, 'The fullName is too short(min 5)').trim(),

  password:
  yup.string().lowercase().min(5, 'The password is too short(min 5)').max(15, 'Too long password(max 15)')
    .required('Password required')
    .trim(),

  email:
  yup.string().lowercase().email().min(10, 'Min 10 length, Ex: 123@mail.ru')
    .max(30, 'Max 30 length, Ex: 123@mail.ru')
    .required('Email required')
    .trim(),

  dob:
  yup.string(),
};

export const singUpSchema = {
  body: {
    fullName: yupValidData.fullName,
    password: yupValidData.password,
    email: yupValidData.email,
    dob: yupValidData.dob,
  },
  query: {},
  params: {},
};

export const singInSchema = {
  body: {
    password: yupValidData.password,
    email: yupValidData.email,
  },
  query: {},
  params: {},
};
