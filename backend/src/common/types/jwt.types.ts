export type JwtPayloadT = {
  sub : string; // el subject, a quien identifica el toke, gralmente equivale al id del user
  email : string;
  role : string;
  iat : number;
  exp : number;
}


export type tokensT = {
  access_token: string;
  refresh_token: string;
}