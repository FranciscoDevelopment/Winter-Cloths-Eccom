export type JwtPayloadT = {
  sub : string; // id del usuario
  email : string;
  role : string;
  iat : number;
  exp : number;
}


export type tokensT = {
  access_token: string;
  refresh_token: string;
}