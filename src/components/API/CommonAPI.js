import { apiText } from './utilService';

export const getResponse = async (url, data) => {
  const res = await apiText
    .get(url, data)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });

  return res;
};

export const postResponse = async (url, data) => {
  const res = await apiText
    .post(url, data)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
  return res;
};

export const putResponse = async (url, data) => {
  const res = await apiText
    .put(url, data)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });

  return res;
};

export const deleteResponse = async (url) => {
  const res = await apiText.delete(url).then((res) => {
    return res;
  });

  return res;
};
