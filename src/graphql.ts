
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface User {
    __typename?: 'User';
    id: string;
    name: string;
    email: string;
}

export interface IQuery {
    __typename?: 'IQuery';
    getUser(id: string): Nullable<User> | Promise<Nullable<User>>;
}

type Nullable<T> = T | null;
