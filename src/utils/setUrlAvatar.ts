import config from '../config';

export const addUrl = (avatarName: string) => {
  const avatarUrl = `${config.server.currentUrl}/avatars/${avatarName}`;
  return avatarUrl;
};
