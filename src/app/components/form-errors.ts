const mensajesErr =  {
    username: 'Invalid username format',
    required: 'This field is required',
    requiredTrue: 'This field is required',
    email: 'Invalid email format',
    minlength: 'Minimum characters not reached',
    maxlength: 'Character limit reached',
    pattern: 'Invalid format. Must contain at least one uppercase letter and one number.',
    rutDv: 'Invalid check digit',
    rutFormat: 'Invalid RUT format XXXXXXXX-X',
    region: 'Region not selected',
    comuna: 'Commune not selected',
    tyc: 'You must accept the terms and conditions',
    password: 'Invalid Password',
    passwordConfirm: 'Passwords do not match',
}

type FormError = keyof typeof mensajesErr;

export {mensajesErr};
export type {FormError};