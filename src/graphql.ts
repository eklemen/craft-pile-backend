
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class CreateAlbumInput {
    name: string;
    description?: Nullable<string>;
    childId: string;
}

export class GetAlbumsForChildInput {
    childId: string;
}

export class CreateChildInput {
    name: string;
    dateOfBirth?: Nullable<string>;
}

export class DeleteChildInput {
    id: string;
}

export class GetPhotosForAlbumInput {
    albumId: string;
}

export class DeletePhotosInput {
    photoIds: string[];
}

export class AssignPhotosToAlbumInput {
    photoIds: string[];
    albumId: string;
}

export class AssignPhotosToAnotherChildInput {
    photoIds: string[];
    childId: string;
}

export class AuthUserInput {
    email: string;
    password: string;
}

export class Album {
    __typename?: 'Album';
    id: string;
    name: string;
    description?: Nullable<string>;
    photos: Nullable<Photo>[];
}

export abstract class IQuery {
    __typename?: 'IQuery';

    abstract getAlbumsForChild(input?: Nullable<GetAlbumsForChildInput>): Nullable<Album>[] | Promise<Nullable<Album>[]>;

    abstract getChildren(): Nullable<Child>[] | Promise<Nullable<Child>[]>;

    abstract getPhotosForAlbum(input?: Nullable<GetPhotosForAlbumInput>): Nullable<Photo[]> | Promise<Nullable<Photo[]>>;

    abstract getPilePhotos(): Nullable<PilePhotos[]> | Promise<Nullable<PilePhotos[]>>;

    abstract getUser(): Nullable<User> | Promise<Nullable<User>>;
}

export abstract class IMutation {
    __typename?: 'IMutation';

    abstract createAlbum(input?: Nullable<CreateAlbumInput>): Nullable<Album>[] | Promise<Nullable<Album>[]>;

    abstract createChild(input: CreateChildInput): Nullable<Nullable<Child>[]> | Promise<Nullable<Nullable<Child>[]>>;

    abstract deleteChild(input: DeleteChildInput): Nullable<Nullable<Child>[]> | Promise<Nullable<Nullable<Child>[]>>;

    abstract deletePhotos(input?: Nullable<DeletePhotosInput>): string[] | Promise<string[]>;

    abstract assignPhotosToAlbum(input?: Nullable<AssignPhotosToAlbumInput>): string[] | Promise<string[]>;

    abstract assignPhotosToAnotherChild(input?: Nullable<AssignPhotosToAnotherChildInput>): string[] | Promise<string[]>;

    abstract registerUser(input?: Nullable<AuthUserInput>): Nullable<AuthUserToken> | Promise<Nullable<AuthUserToken>>;

    abstract login(input?: Nullable<AuthUserInput>): Nullable<AuthUserToken> | Promise<Nullable<AuthUserToken>>;
}

export class Child {
    __typename?: 'Child';
    id: string;
    name: string;
    dateOfBirth?: Nullable<string>;
    albums: Nullable<Album>[];
}

export class Photo {
    __typename?: 'Photo';
    id: string;
    bucketName: string;
    objectKey: string;
    thumbnailKey: string;
    presignedUrl?: Nullable<string>;
    description?: Nullable<string>;
    dateOfPhoto?: Nullable<string>;
}

export class PilePhotos {
    __typename?: 'PilePhotos';
    photos: Nullable<Photo>[];
    id: string;
    name: string;
}

export class User {
    __typename?: 'User';
    id: string;
    access_token?: Nullable<string>;
    email: string;
    account: Account;
    children: Child[];
}

export class Account {
    __typename?: 'Account';
    id: string;
    children?: Nullable<Nullable<Child>[]>;
}

export class AuthUserToken {
    __typename?: 'AuthUserToken';
    authToken: string;
}

type Nullable<T> = T | null;
