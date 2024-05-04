import jwt from 'jsonwebtoken';
export const setKeyInStorage = () => {
  const userKey = jwt.sign('userAuthKey', process.env.SECRET_KEY as string, {
    expiresIn: '24h',
  });
  console.log(userKey);
  /*if (!localStorage.getItem('userAuth')) {
    const userKey = jwt.sign('userAuthKey', process.env.SECRET_KEY as string, {
      expiresIn: '24h',
    });

    localStorage.setItem('userAuth', userKey);
  }*/
};

export const clearStorage = () => {
  localStorage.removeItem('userAuth');
};

export const getKeyInStorage = () => {
  return localStorage.getItem('userAuth');
};
