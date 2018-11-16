import * as AuthActions from './auth.actions';

export interface State {
    token: string;
    authenitcated: boolean;
}

const initialState: State = {
    token: null,
    authenitcated: false
}

export function authReducer(state = initialState, action: AuthActions.AuthActions) {
    switch (action.type) {
        case (AuthActions.SIGNUP):
        case (AuthActions.SIGNIN):
        return {
            ...state,
            authenitcated: true
        };

        case (AuthActions.LOGOUT):
        return {
            ...state,
            token: null,
            authenitcated: false 
        };

        case (AuthActions.SET_TOKEN):
        return {
            ...state,
            token: action.payload
        };

        default:
        return state;
    }
}