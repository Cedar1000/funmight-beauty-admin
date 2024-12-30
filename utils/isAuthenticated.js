const isAuthenticated = (req) => {
  const { cookie } = req.headers;

  const result = { props: {} };

  if (!cookie) return redirect(result);

  const jwt = cookie.split(' ').find((el) => el.includes('token'));

  console.log('jwt', jwt);

  if (!jwt) return redirect(result);

  const [_, token] = jwt.split('=');

  if (!jwt) return redirect(result);

  if (!token) return redirect(result);

  return result;
};

const redirect = (result) => {
  result.redirect = { permanent: false, destination: '/login' };
  return result;
};

export default isAuthenticated;
