import * as yup from 'yup';
import { yupValidData } from './yupValidData';

const paramsId = yup.number().integer().min(1);
const requiredParamsId = paramsId.required();
const sharedValidation = {
  paramsId, requiredParamsId,
};

export const updateUserSchema = {
  body: {
    fullName: yupValidData.fullName,
    email: yupValidData.email,
    dob: yupValidData.dob,
  },
  params: { userId: sharedValidation.requiredParamsId },
};

export const passwordSchema = {
  body: {
    password: yupValidData.password,
    newPassword: yupValidData.newPassword,
  },
  params: { userId: sharedValidation.requiredParamsId },
};

export const deleteUserSchema = {
  params: { userId: sharedValidation.requiredParamsId },
};
