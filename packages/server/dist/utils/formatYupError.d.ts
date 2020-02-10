import { ValidationError } from 'yup';
export declare const formatYupError: (err: ValidationError) => {
    path: string;
    message: string;
}[];
