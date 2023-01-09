import { yupValidData } from './yupValidData';

export const singUpSchema = {
  body: {
    password: yupValidData.password,
    email: yupValidData.email.required('Email required'),
  },
};

export const singInSchema = {
  body: {
    password: yupValidData.password,
    email: yupValidData.email.required('Email required'),
  },
};
