export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type Channel = {
  __typename?: "Channel";
  id: Scalars["ID"];
  name: Scalars["String"];
  user: User;
  workspace: Workspace;
};

export type CreateRecruitsDto = {
  content: Scalars["String"];
  features: Array<Scalars["ID"]>;
  frameworks: Array<Scalars["ID"]>;
  languages: Array<Scalars["ID"]>;
  peoples: Scalars["Int"];
  thumbnail: Scalars["String"];
  title: Scalars["String"];
};

export type CreateUserDto = {
  description?: InputMaybe<Scalars["String"]>;
  nickname?: InputMaybe<Scalars["String"]>;
  picture?: InputMaybe<Scalars["String"]>;
  userId: Scalars["String"];
};

export type Feature = {
  __typename?: "Feature";
  color: Scalars["String"];
  icon: Scalars["String"];
  id: Scalars["ID"];
  name: Scalars["String"];
};

export type FrameWork = {
  __typename?: "FrameWork";
  color: Scalars["String"];
  icon: Scalars["String"];
  id: Scalars["ID"];
  name: Scalars["String"];
  users: User;
};

export type InputJoinDto = {
  workspace: Scalars["ID"];
};

export type Join = {
  __typename?: "Join";
  id: Scalars["ID"];
  user?: Maybe<User>;
  workspace?: Maybe<Workspace>;
};

export type Language = {
  __typename?: "Language";
  color: Scalars["String"];
  icon: Scalars["String"];
  id: Scalars["ID"];
  name: Scalars["String"];
  recruits: Array<Recruit>;
  users: User;
};

export type Mutation = {
  __typename?: "Mutation";
  createJoin: Join;
  createRecruit: Recruit;
  createUser: User;
  deleteRecruit: Recruit;
  updateUser: User;
};

export type MutationCreateJoinArgs = {
  createJoin: InputJoinDto;
};

export type MutationCreateRecruitArgs = {
  createRecruit: CreateRecruitsDto;
};

export type MutationCreateUserArgs = {
  createUser: CreateUserDto;
};

export type MutationDeleteRecruitArgs = {
  id: Scalars["String"];
};

export type MutationUpdateUserArgs = {
  updateUser: UpdateUserDto;
};

export type Query = {
  __typename?: "Query";
  features: Array<Feature>;
  findOneIdRecruit: Recruit;
  findUserId: User;
  findUserPrimaryId: User;
  frameworks: Array<FrameWork>;
  joins: Array<Join>;
  languages: Array<Language>;
  recruits: Array<Recruit>;
  searchRecruit?: Maybe<Array<Recruit>>;
  users: Array<User>;
};

export type QueryFindOneIdRecruitArgs = {
  id: Scalars["String"];
};

export type QueryFindUserIdArgs = {
  userId: Scalars["String"];
};

export type QueryFindUserPrimaryIdArgs = {
  id: Scalars["String"];
};

export type QuerySearchRecruitArgs = {
  searchRecruit: SearchRecruitsDto;
};

export type Recruit = {
  __typename?: "Recruit";
  content: Scalars["String"];
  createdAt: Scalars["DateTime"];
  deletedAt: Scalars["DateTime"];
  features: Array<Feature>;
  frameworks: Array<FrameWork>;
  id: Scalars["ID"];
  languages: Array<Language>;
  peoples: Scalars["Int"];
  thumbnail: Scalars["String"];
  title: Scalars["String"];
  updatedAt: Scalars["DateTime"];
  user: User;
  workspace: Workspace;
};

export type SearchRecruitsDto = {
  features?: InputMaybe<Array<Scalars["String"]>>;
  frameworks?: InputMaybe<Array<Scalars["String"]>>;
  languages?: InputMaybe<Array<Scalars["String"]>>;
  title?: InputMaybe<Scalars["String"]>;
};

export type UpdateUserDto = {
  description?: InputMaybe<Scalars["String"]>;
  nickname?: InputMaybe<Scalars["String"]>;
  picture?: InputMaybe<Scalars["String"]>;
};

export type User = {
  __typename?: "User";
  channels: Array<Channel>;
  createdAt: Scalars["DateTime"];
  deletedAt?: Maybe<Scalars["DateTime"]>;
  framework: FrameWork;
  id: Scalars["ID"];
  joins: Array<Join>;
  language: Language;
  nickname?: Maybe<Scalars["String"]>;
  picture?: Maybe<Scalars["String"]>;
  recruits: Array<Recruit>;
  updatedAt: Scalars["DateTime"];
  userId: Scalars["String"];
};

export type Workspace = {
  __typename?: "Workspace";
  channels: Array<Channel>;
  id: Scalars["ID"];
  joins?: Maybe<Array<Join>>;
  recruit: Recruit;
};

export type AllFeatureQueryVariables = Exact<{ [key: string]: never }>;

export type AllFeatureQuery = {
  __typename?: "Query";
  features: Array<{
    __typename?: "Feature";
    id: string;
    name: string;
    icon: string;
    color: string;
  }>;
};

export type AllFrameworkQueryVariables = Exact<{ [key: string]: never }>;

export type AllFrameworkQuery = {
  __typename?: "Query";
  frameworks: Array<{
    __typename?: "FrameWork";
    id: string;
    name: string;
    icon: string;
    color: string;
  }>;
};

export type CreateJoinMutationVariables = Exact<{
  param: InputJoinDto;
}>;

export type CreateJoinMutation = {
  __typename?: "Mutation";
  createJoin: {
    __typename?: "Join";
    id: string;
    workspace?: {
      __typename?: "Workspace";
      id: string;
      joins?: Array<{
        __typename?: "Join";
        id: string;
        user?: {
          __typename?: "User";
          id: string;
          nickname?: string | null;
          picture?: string | null;
        } | null;
      }> | null;
    } | null;
  };
};

export type AllLanguageQueryVariables = Exact<{ [key: string]: never }>;

export type AllLanguageQuery = {
  __typename?: "Query";
  languages: Array<{
    __typename?: "Language";
    id: string;
    name: string;
    icon: string;
    color: string;
  }>;
};

export type AllRecruitQueryVariables = Exact<{ [key: string]: never }>;

export type AllRecruitQuery = {
  __typename?: "Query";
  recruits: Array<{
    __typename?: "Recruit";
    id: string;
    title: string;
    thumbnail: string;
    content: string;
    user: {
      __typename?: "User";
      id: string;
      nickname?: string | null;
      picture?: string | null;
    };
    workspace: {
      __typename?: "Workspace";
      id: string;
      joins?: Array<{
        __typename?: "Join";
        id: string;
        user?: {
          __typename?: "User";
          id: string;
          nickname?: string | null;
          picture?: string | null;
        } | null;
      }> | null;
    };
  }>;
};

export type CreateRecruitMutationVariables = Exact<{
  param: CreateRecruitsDto;
}>;

export type CreateRecruitMutation = {
  __typename?: "Mutation";
  createRecruit: { __typename?: "Recruit"; id: string };
};

export type FindoneRecruitQueryVariables = Exact<{
  id: Scalars["String"];
}>;

export type FindoneRecruitQuery = {
  __typename?: "Query";
  findOneIdRecruit: {
    __typename?: "Recruit";
    id: string;
    title: string;
    thumbnail: string;
    content: string;
    peoples: number;
    languages: Array<{
      __typename?: "Language";
      id: string;
      name: string;
      icon: string;
      color: string;
    }>;
    frameworks: Array<{
      __typename?: "FrameWork";
      id: string;
      name: string;
      icon: string;
      color: string;
    }>;
    features: Array<{
      __typename?: "Feature";
      id: string;
      name: string;
      icon: string;
      color: string;
    }>;
    user: {
      __typename?: "User";
      id: string;
      nickname?: string | null;
      picture?: string | null;
      userId: string;
    };
    workspace: {
      __typename?: "Workspace";
      id: string;
      joins?: Array<{
        __typename?: "Join";
        id: string;
        user?: {
          __typename?: "User";
          id: string;
          nickname?: string | null;
          picture?: string | null;
        } | null;
      }> | null;
    };
  };
};

export type SearchRecruitQueryVariables = Exact<{
  params: SearchRecruitsDto;
}>;

export type SearchRecruitQuery = {
  __typename?: "Query";
  searchRecruit?: Array<{
    __typename?: "Recruit";
    id: string;
    title: string;
    thumbnail: string;
    content: string;
    peoples: number;
    languages: Array<{
      __typename?: "Language";
      id: string;
      name: string;
      icon: string;
      color: string;
    }>;
    frameworks: Array<{
      __typename?: "FrameWork";
      id: string;
      name: string;
      icon: string;
      color: string;
    }>;
    features: Array<{
      __typename?: "Feature";
      id: string;
      name: string;
      icon: string;
      color: string;
    }>;
    user: {
      __typename?: "User";
      id: string;
      nickname?: string | null;
      picture?: string | null;
    };
    workspace: {
      __typename?: "Workspace";
      id: string;
      joins?: Array<{
        __typename?: "Join";
        id: string;
        user?: {
          __typename?: "User";
          id: string;
          nickname?: string | null;
        } | null;
      }> | null;
    };
  }> | null;
};
