const checkCookieExists = (cookieName: string): boolean => {
  return document.cookie
    .split(";")
    .some((item) => item.trim().startsWith(`${cookieName}=`));
};
