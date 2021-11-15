import { Dispatch } from 'react'

export interface GlobalStateInterface {
    isUserAuthenticated: boolean;
    loggedUser: User;
    persistenceType: string;
}

export type ActionType = {
    type: string;
    payload?: any;
};

export type ContextType = {
    globalState: GlobalStateInterface;
    dispatch: Dispatch<ActionType>;
};

export type JsonResponse = {
    status: number,
    message?: string,
    data?: any
}

export type User = {
    name: string,
    username: string,
    email: string,
    password: string,
    created_at: string,
    updated_at: string,
    deleted_at?: string
};