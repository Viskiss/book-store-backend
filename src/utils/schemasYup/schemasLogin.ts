import { yupValidData } from './yupValidData';

export const singUpSchema = {
  body: {
    fullName: yupValidData.fullName,
    password: yupValidData.password,
    email: yupValidData.email.required(),
    dob: yupValidData.dob,
  },
};

export const singInSchema = {
  body: {
    password: yupValidData.password,
    email: yupValidData.email,
  },
};
