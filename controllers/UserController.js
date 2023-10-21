import {validationResult} from "express-validator";
import bcrypt from "bcrypt";
import UserModule from "../models/User.js";
import jwt from "jsonwebtoken";


export const register = async (req, res) => {

    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array());
        }

        const requestPassword = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(requestPassword, salt);

        const doc = new UserModule({
            email: req.body.email,
            fullName: req.body.fullName,
            avatarUrl: req.body.avatarUrl,
            password: hash,
        });

        const user = await doc.save();

        const token = jwt.sign(
            {
                _id: user._id,
            },
            'secret123',
            {
                expiresIn: '30d'
            }
        );
        const {password, ...userData} = user._doc

        res.json({
            ...userData,
            token
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: "register to failed"
        });
    }
}

export const login = async (req, res) => {
    try {
        const user = await UserModule.findOne({email: req.body.email});

        if (!user) {
            return res.status(404).json({
                message: 'Users not found'
            });
        }

        const isValidPass = await bcrypt.compare(req.body.password, user._doc.password);

        if (!isValidPass) {
            return res.status(404).json({
                message: 'incorrect email or password',
            });
        }

        const token = jwt.sign(
            {
                _id: user._id,
            },
            'secret123',
            {
                expiresIn: '30d'
            }
        );
        const {password, ...userData} = user._doc

        res.json({
            ...userData,
            token
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: "login to failed"
        });
    }
}
