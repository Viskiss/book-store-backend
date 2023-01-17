import {
  StatusCodes,
} from 'http-status-codes';
import type { HandlerGetGenresType } from 'src/types/books/getGenresTypes';

import db from '../../db/index';

const getGenres: HandlerGetGenresType = async (req, res, next) => {
  try {
    const allGenres = await db.genre.find();
    res.status(StatusCodes.OK).json({ genres: allGenres });
  } catch (error) {
    next(error);
  }
};

export default getGenres;
