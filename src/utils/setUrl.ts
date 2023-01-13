import config from '../config';

export const addUrlAvatar = (avatarName: string) => {
  const avatarUrl = `${config.server.currentUrl}/avatars/${avatarName}`;
  return avatarUrl;
};

export const addUrlBook = (coverName: string) => {
  const avatarUrl = `${config.server.currentUrl}/bookCover/${coverName}`;
  return avatarUrl;
};
