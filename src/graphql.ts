
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface AuthUserInput {
    email: string;
    password: string;
}

export interface Child {
    __typename?: 'Child';
    id: string;
    name: string;
    dateOfBirth?: Nullable<string>;
}

export interface Album {
    __typename?: 'Album';
    id: string;
    name: string;
    description?: Nullable<string>;
}

export interface Account {
    __typename?: 'Account';
    id: string;
    albums?: Nullable<Nullable<Album>[]>;
    children?: Nullable<Nullable<Child>[]>;
}

export interface User {
    __typename?: 'User';
    id: string;
    access_token?: Nullable<string>;
    email: string;
    account: Account;
}

export interface AuthUserToken {
    __typename?: 'AuthUserToken';
    authToken: string;
}

export interface IQuery {
    __typename?: 'IQuery';
    getUser(): Nullable<User> | Promise<Nullable<User>>;
}

export interface IMutation {
    __typename?: 'IMutation';
    registerUser(input?: Nullable<AuthUserInput>): Nullable<AuthUserToken> | Promise<Nullable<AuthUserToken>>;
    login(input?: Nullable<AuthUserInput>): Nullable<AuthUserToken> | Promise<Nullable<AuthUserToken>>;
}

type Nullable<T> = T | null;
