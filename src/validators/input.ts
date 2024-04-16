import Joi from "joi";

const userValidation = Joi.object({
    email: Joi.string()
        .email({ tlds: { allow: false } }) // Disallow top-level domains for flexibility
        .required()
        .messages({
            'string.base': 'Email must be a valid string',
            'string.empty': 'Email cannot be empty',
            'string.email': 'Email must be a valid email address',
            'any.required': 'Email is required'
        }),
    Password: Joi.string()
        .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()_+\\-=\\[\\]{};:\'"|,.<>\\/?]).{8,30}$'))
        .required()
        .messages({
            'string.base': 'Password must be a valid string',
            'string.empty': 'Password cannot be empty',
            'string.pattern.base': 'Password must contain at least one lowercase letter, one uppercase letter, one numeric digit, one special character, and be between 8 and 30 characters long',
            'any.required': 'Password is required'
        }),
        confirm: Joi.string()
        .valid(Joi.ref('Password')) // Ensure confirmPassword matches password
        .required()
        .messages({
          'any.only': 'Passwords do not match',
          'any.required': 'confirm Password'
        })  
});

export default userValidation;
