import type { NextFunction, Request, Response } from 'express';
import type * as yup from 'yup';

const revise =
  (schema: yup.AnySchema) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate({
        body: req.body,
        params: req.params,
        query: req.query,
        // email: req.body.email,
        // password: req.body.password,
        // fullName: req.body.fullName,
        // dob: req.body.dob,
      });
      return next();
    } catch (error) {
      res.status(501).send(error.message);
    }
  };

// const validateUpdate =
//   (schema: yup.AnySchema) => async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       await schema.validate({
//         body: req.body,
//         email: req.body.email,
//         fullName: req.body.fullName,
//         dob: req.body.dob,
//       });
//       return next();
//     } catch (error) {
//       res.status(501).send(error.message);
//     }
//   };

// const validateSingIn =
//   (schema: yup.AnySchema) => async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       await schema.validate({
//         body: req.body,
//         email: req.body.email,
//         password: req.body.password,
//       });
//       return next();
//     } catch (error) {
//       res.status(501).send(error.message);
//     }
//   };

// const validatePass =
//   (schema: yup.AnySchema) => async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       await schema.validate({
//         body: req.body,
//         password: req.body.password,
//       });
//       return next();
//     } catch (error) {
//       res.status(501).send(error.message);
//     }
//   };

export default {
  revise,
  // validateSingIn,
  // validateUpdate,
  // validatePass,
};
