import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcryptjs';

import { RequestWithBody } from '../../models/interfaces';
import User from '../../models/User';

const getLogin = (req: Request, res: Response) => {
    res.send('GET Login Route');
};

const postLogin = async (req: RequestWithBody, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    console.log('req body:', req.body);

    const user = await User.findOne({ email });
    const userToReturn = getUserToReturn(user);
    return res.status(200).json({ message: 'Login successful!', user: userToReturn });
};

const getRegister = (req: Request, res: Response) => {
    res.send('GET Register Route');
};

const postRegister = async (req: RequestWithBody, res: Response) => {
    const { email, name, password } = req.body;
    let errors = [];

    // check required fields
    if (!name || !email || !password) {
        errors.push({ message: 'Register form has missing fields' });
    }

    // password at least 6 chars
    if (password && password.length < 6) {
        errors.push({ message: 'Password should be at least 6 characters' });
    }

    if (errors.length > 0 || !password) {
        return res.status(400).json(errors);
    }

    // check existing user with this email (email should be unique)
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        errors.push({ message: 'This email is already registered.' });
        return res.status(400).json(errors);
    }

    // encrypt password
    // generate salt with 10
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    // validation passed
    const newUser = new User({ email, name, password: hashedPassword });
    console.log('new user:', newUser);
    await newUser.save();

    // not sure how to display flash on the client side
    req.flash('success_msg', 'You are now registered');

    const userToReturn = getUserToReturn(newUser);
    res.json({ success: true, message: 'Register successful!', user: userToReturn });
};

const getUserToReturn = (user: any) => {
    // no password
    const userToReturn = {
        _id: user._id,
        name: user.name,
        email: user.email,
        date: user.date,
    };
    return userToReturn;
};

const controller = {
    getLogin,
    postLogin,
    getRegister,
    postRegister,
};

export default controller;
