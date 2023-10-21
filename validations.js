import {body} from 'express-validator';

export const registerValidation = [
    body('email', 'Error format email').isEmail(),
    body('password', 'Password must min 8 size word').isLength({min: 8}),
    body('fullName', 'FullName must min 3 size word').isLength({min: 3}),
    body('avatarUrl', 'Error url').optional().isURL(),
];
export const loginValidation = [
    body('email', 'Error format email').isEmail(),
    body('password', 'Password must min 8 size word').isLength({min: 8}),
];

export const postCreateValidation = [
    body('title', 'insert title post').isLength({min: 3}).isString(),
    body('text', 'insert text post').isLength({min: 3}).isString,
    body('tags', 'Error format tags').optional().isArray,
    body('imageUrl', 'Error url').optional().isString(),
];

