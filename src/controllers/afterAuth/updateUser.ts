import type { HandlerUpdateUserType } from 'src/utils/types/authTypes/updateUserTypes';
import { findDubleEmail } from '../../utils/findDuble';

import db from '../../db/index';

const updateUser: HandlerUpdateUserType = async (req, res, next) => {
  try {
    const { email, fullName, dob } = req.body;
    const id = +req.params.userId;

    if (id === req.user.id) {
      const userToUpdate = await db.user.findOneBy({ id: req.user.id });

      if (userToUpdate.email !== email) {
        const emailUser = await findDubleEmail(email);
        userToUpdate.email = emailUser || userToUpdate.email;
      }

      userToUpdate.fullName = fullName || userToUpdate.fullName;
      userToUpdate.dob = dob || userToUpdate.dob;

      await db.user.save(userToUpdate);
      res.json({ user: userToUpdate });
    }
  } catch (error) {
    next(error);
  }
};

export default updateUser;
