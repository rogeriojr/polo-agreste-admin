import base64url from 'base64url';

const getJwtIdentity = jwt => {
  const jwtSplited = jwt.split('.');
  const jwtInfo = JSON.parse(base64url.decode(jwtSplited[1]));
  return jwtInfo.identity;
};

export { getJwtIdentity };
