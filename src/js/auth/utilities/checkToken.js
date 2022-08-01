import jwtDecode from 'jwt-decode';

export default (token, {
  onRefresh,
  onLogout,
  onValid,
}) => {
  // Set up the lifecycle
  const jwt = jwtDecode(token);
  const now = +new Date();
  const refresh = jwt.refresh * 1000;
  const exp = jwt.exp * 1000;

  if (now > refresh && now < exp) {
    // Token needs to be refreshed, but hasn't expired yet
    if (onRefresh) onRefresh(jwt.trialStatus);
  } else if (now > exp) {
    // token has expired
    if (onLogout) onLogout();
  } else {
    if (onValid) onValid(jwt.trialStatus);
  }
};
