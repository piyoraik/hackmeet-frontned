export interface TokenType {
  access_token: string;
  expires_in: number;
  token_type: string;
}

export interface Auth0UserType {
  user_id: string;
  email: string;
  email_verified: false;
  username: string;
  phone_number: string;
  phone_verified: false;
  created_at: string;
  updated_at: string;
  identities: [
    {
      connection: string;
      user_id: string;
      provider: string
      isSocial: false;
    }
  ];
  app_metadata: {};
  user_metadata: {};
  picture: string;
  name: string;
  nickname: string;
  multifactor: [string];
  last_ip: string;
  last_login: string;
  logins_count: number;
  blocked: false;
  given_name: string;
  family_name: string;
}