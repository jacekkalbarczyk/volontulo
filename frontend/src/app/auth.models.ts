export interface LoginRequestModel {
    username: string;
    password: string;
}

export interface RegisterRequestModel {
    email: string;
    password: string;
    terms_acceptance: boolean;
}

export interface AccountActivationRequestModel {
    uuid: string;
}