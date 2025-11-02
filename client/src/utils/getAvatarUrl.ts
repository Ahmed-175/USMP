const url = import.meta.env.VITE_API_URL;

const getAvatarUrl = (filename: string | undefined): string => {
  return `${url}/avatar/${filename}`;
};

export default getAvatarUrl;