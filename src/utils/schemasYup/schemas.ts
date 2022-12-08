import * as yup from 'yup';

type ValuesType = {
  fullName?: string;
  password?: string;
  email?: string;
  dob?: string | Date;
};

type ValuesUpdateType = {
  fullName: string;
  email: string;
  dob: string;
};

type ValuesInType = {
  password: string;
  email: string;
};

type ValuesPassType = {
  password: string;
};

const yupValid = {
  fullName: yup.string().min(5, 'The fullName is too short(min 5)'),
  password: yup.string().min(5, 'The password is too short(min 5)').max(15, 'Too long password(max 15)').required('Password required'),
  email: yup.string().email().min(10, 'Min 10 length, Ex: 123@mail.ru').max(30, 'Max 30 length, Ex: 123@mail.ru')
    .required('Email required'),
  dob: yup.string(),
};

const userSchemaUp = yup.object<Record<keyof ValuesType, yup.AnySchema>>({
  fullName: yupValid.fullName,
  password: yupValid.password,
  email: yupValid.email,
  dob: yupValid.dob,
});

const userSchemaUpdate = yup.object<Record<keyof ValuesUpdateType, yup.AnySchema>>({
  fullName: yupValid.fullName,
  email: yupValid.email,
  dob: yupValid.dob,
});

const userSchemaIn = yup.object<Record<keyof ValuesInType, yup.AnySchema>>({
  password: yupValid.password,
  email: yupValid.email,
});

const userSchemaPass = yup.object<Record<keyof ValuesPassType, yup.AnySchema>>({
  password: yupValid.password,
});

export default {
  userSchemaUp,
  userSchemaIn,
  userSchemaUpdate,
  userSchemaPass,
};
