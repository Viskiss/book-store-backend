import {
  StatusCodes,
} from 'http-status-codes';

import type { HandlerGetGenresType } from 'src/types';
import CustomError from '../../../utils/customErrors/customErrors';

import errorsMessages from '../../../utils/customErrors/errors';

import db from '../../../db';

const getGenres: HandlerGetGenresType = async (req, res, next) => {
  try {
    const allGenres = await db.genre.find();
    if (!allGenres) {
      throw new CustomError(
        StatusCodes.NOT_IMPLEMENTED,
        errorsMessages.GENRES_NOT_AVAILABLE,
      );
    }

    res.status(StatusCodes.OK).json({ genres: allGenres });
  } catch (error) {
    next(error);
  }
};

export default getGenres;
