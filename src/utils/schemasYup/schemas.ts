import * as yup from 'yup';

// export interface IUserData {
//   fullName: string;
//   passwor: string;
//   email: string;
//   dob: string | Date;
// }

const yupValid = {
  fullName:
  yup.string().min(5, 'The fullName is too short(min 5)').trim(),

  password:
  yup.string().min(5, 'The password is too short(min 5)').max(15, 'Too long password(max 15)')
    .required('Password required')
    .trim(),

  email:
  yup.string().email().min(10, 'Min 10 length, Ex: 123@mail.ru').max(30, 'Max 30 length, Ex: 123@mail.ru')
    .required('Email required')
    .trim(),

  dob:
  yup.string(),
};

const userSchemaUp = yup.object({
  body: yup.object({
    fullName: yupValid.fullName,
    password: yupValid.password,
    email: yupValid.email,
    dob: yupValid.dob,
  }),
});

const userSchemaUpdate = yup.object({
  body: yup.object({
    fullName: yupValid.fullName,
    email: yupValid.email,
    dob: yupValid.dob,
  }),
});

const userSchemaIn = yup.object({
  body: yup.object({
    password: yupValid.password,
    email: yupValid.email,
  }),
});

const userSchemaPass = yup.object({
  body: yup.object({
    password: yupValid.password,
  }),
});

export default {
  userSchemaIn,
  userSchemaUp,
  userSchemaUpdate,
  userSchemaPass,
};
