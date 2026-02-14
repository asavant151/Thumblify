import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/User.js";

// Controller for User Registration

export const registerUser = async (req: Request, res: Response) => {
    try {
      const { name, email, password } = req.body;

    // find user by email
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Encrypt the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });
    
    await newUser.save();

    // setting user data in session
    req.session.isLoggedIn = true;
    req.session.userId = newUser._id;

    return res.json ({
        message: 'Account created successfully',
        user: {
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email
        }
    })
      
    } catch (error: any) {
        console.error('Registration error:', error);
        return res.status(500).json({ message: error.message });
    }
}


// Controller for User Login

export const loginUser = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

    // find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // setting user data in session
    req.session.isLoggedIn = true;
    req.session.userId = user._id;

    return res.json ({
        message: 'Login successful',
        user: {
            _id: user._id,
            name: user.name,
            email: user.email
        }
    })
      
    } catch (error: any) {
        console.error('Login error:', error);
        return res.status(500).json({ message: error.message });
    }
}

// Controller for User Logout

export const logoutUser = async (req: Request, res: Response) => {
        // Clear session data
        req.session.destroy((err) => {
            if (err) {
                console.error('Session destruction error:', err);
                return res.status(500).json({ message: err.message });
            }
        });
        return res.json({ message: 'Logout successful' });
    
}

// Controller For User Verification

export const verifyUser = async (req: Request, res: Response) => {
    try {
        const {userId} = req.session;

        const user = await User.findById(userId).select('-password');

        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        return res.json({ user })
        
    } catch (error: any) {
        console.error('Verification error:', error);
        return res.status(500).json({ message: error.message });
    }
}


