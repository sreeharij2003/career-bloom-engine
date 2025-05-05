
import { Request, Response } from 'express';
import { AIService } from '../services/ai.service';
import CareerPath from '../models/CareerPath.model';
import User from '../models/User.model';

export const generateCareerPath = async (req: Request, res: Response): Promise<void> => {
  try {
    const { query } = req.body;
    const userId = (req as any).user.id;
    
    if (!query) {
      res.status(400).json({ message: 'Query is required' });
      return;
    }

    // Get user for context
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    // Generate career path
    const careerPathData = await AIService.generateCareerPath(query, user);
    
    // Save to database
    const careerPath = await CareerPath.create({
      userId,
      title: careerPathData.title,
      query,
      steps: careerPathData.steps,
    });

    res.status(201).json(careerPath);
  } catch (error) {
    res.status(500).json({ 
      message: 'Server error generating career path', 
      error: error instanceof Error ? error.message : String(error) 
    });
  }
};

export const getUserCareerPaths = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user.id;
    
    const careerPaths = await CareerPath.find({ userId }).sort({ createdAt: -1 });
    
    res.status(200).json(careerPaths);
  } catch (error) {
    res.status(500).json({ 
      message: 'Server error fetching career paths', 
      error: error instanceof Error ? error.message : String(error) 
    });
  }
};

export const getCareerPathById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = (req as any).user.id;
    
    const careerPath = await CareerPath.findOne({ _id: id, userId });
    
    if (!careerPath) {
      res.status(404).json({ message: 'Career path not found' });
      return;
    }
    
    res.status(200).json(careerPath);
  } catch (error) {
    res.status(500).json({ 
      message: 'Server error fetching career path', 
      error: error instanceof Error ? error.message : String(error) 
    });
  }
};
