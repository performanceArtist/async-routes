export type AppReduxState = {
  user: null | { username: string };
  login: Communication;
  checkAuth: Communication;
};

export type Communication = {
  isRequesting: boolean;
  error?: string
};
