import {
  StatusCodes,
} from 'http-status-codes';
import db from '../db/index';
import CustomError from './customErrors/customErrors';
import errorsMessages from '../utils/customErrors/errors';

export const findDubleUpdate = async (emailOld: string, emailNew: string) => {
  const user = await db.user.findOne({ where: { email: emailOld } });

  if (emailOld === emailNew) {
    return emailOld;
  }

  user.email = emailNew;
};

export const findDubleSingUp = async (email: string) => {
  const user = await db.user.findOne({ where: { email } });

  if (user) {
    throw new CustomError(
      StatusCodes.METHOD_NOT_ALLOWED,
      errorsMessages.DUBLE_EMAIL,
    );
  }

  return email;
};

// export function Newdifference(origObj: object, newObj: object) {
//   function changes(newObj: object, origObj: object) {
//     let arrayIndexCounter = 0;
//     return transform(newObj, (result, value, key) => {
//       if (value && !isObject(value) && !isEqual(JSON.stringify(value),

//         JSON.stringify(origObj[key]))) {
//         const resultKey = isArray(origObj) ? arrayIndexCounter++ : key;
//         result[resultKey] = (isObject(value) &&
//         isObject(origObj[key])) ? changes(value, origObj[key]) : value;
//       }
//     });
//   }
//   return changes(newObj, origObj);
// }

// try {
//   await yupSchema.validate(req, { abortEarly: false });
// } catch (error) {
//   const errorArr: Array<{key: string; path: string; message: string}> =
//   [{ key: error.name, path: error.path, message: error.message }];
//   errorsMessages.ERRORS_YUP = errorArr.toString();
//   throw new CustomError(
//     StatusCodes.CONFLICT,
//     errorsMessages.ERRORS_YUP,
//   );
// }
