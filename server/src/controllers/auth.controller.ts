
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.model';

// Generate JWT token
const generateToken = (id: string): string => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'developmentsecret', {
    expiresIn: '30d',
  });
};

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, name } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }

    // Create user
    const user = await User.create({
      email,
      password,
      name,
    });

    // Send response with token
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id.toString()),
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Server error during registration', 
      error: error instanceof Error ? error.message : String(error) 
    });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({ message: 'Invalid email or password' });
      return;
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      res.status(401).json({ message: 'Invalid email or password' });
      return;
    }

    // Send response with token
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      title: user.title,
      token: generateToken(user._id.toString()),
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Server error during login', 
      error: error instanceof Error ? error.message : String(error) 
    });
  }
};

export const updateProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, title, skills, experience, education } = req.body;
    const userId = (req as any).user.id;

    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    // Update fields
    if (name) user.name = name;
    if (title) user.title = title;
    if (skills) user.skills = skills;
    if (experience) user.experience = experience;
    if (education) user.education = education;

    await user.save();

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      title: user.title,
      skills: user.skills,
      experience: user.experience,
      education: user.education,
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Server error during profile update', 
      error: error instanceof Error ? error.message : String(error) 
    });
  }
};

export const getProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user.id;
    
    const user = await User.findById(userId).select('-password');
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ 
      message: 'Server error fetching profile', 
      error: error instanceof Error ? error.message : String(error) 
    });
  }
};
