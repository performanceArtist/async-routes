export type AppReduxState = {
  user: null | { username: string };
  todos: string[];
  login: Communication;
  checkAuth: Communication;
  fetchUserData: Communication;
};

export type Communication = {
  isRequesting: boolean;
  error?: string
};
