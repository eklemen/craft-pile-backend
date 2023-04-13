export interface Ctx {
  [key: string | number | symbol]: any;
  req: ContextReq;
}
export interface ContextReq {
  [key: string]: any;
  user: {
    id: string;
    email: string;
    accountId: string;
  };
}
