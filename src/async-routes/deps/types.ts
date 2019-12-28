export type Communication = {
  isRequesting: boolean;
  error?: string
};

export type Action<P> = {
  type: string;
  payload?: P;
};
