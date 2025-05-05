
import OpenAI from 'openai';
import { IUser } from '../models/User.model';

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface CareerPathStep {
  year: number;
  title: string;
  description: string;
  skills: string[];
}

export interface CareerPathResponse {
  title: string;
  steps: CareerPathStep[];
}

export class AIService {
  
  /**
   * Generate a career path based on a user query and profile
   */
  static async generateCareerPath(query: string, user?: IUser): Promise<CareerPathResponse> {
    try {
      // Create a context-rich prompt
      const userContext = user ? `
        User profile:
        - Current title: ${user.title || 'Not specified'}
        - Skills: ${user.skills?.join(', ') || 'Not specified'}
        - Experience: ${user.experience || 'Not specified'}
      ` : '';
      
      const systemPrompt = `
        You are a career advisor with expertise in professional development paths.
        Create a detailed 5-year career development roadmap based on the query.
        Your response should be in JSON format with this structure:
        {
          "title": "A concise title for the career path",
          "steps": [
            {
              "year": 1,
              "title": "Role/position title for this year",
              "description": "Detailed advice about what to focus on during this year",
              "skills": ["skill1", "skill2", "skill3"]
            },
            // Years 2-5 with the same structure
          ]
        }
        Make the advice specific, actionable, and industry-relevant.
      `;

      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `${userContext}\nQuery: ${query}` }
        ],
        response_format: { type: "json_object" },
        temperature: 0.7,
      });

      const content = response.choices[0]?.message.content;
      
      if (!content) {
        throw new Error('Failed to generate career path: No content in the response');
      }

      return JSON.parse(content) as CareerPathResponse;
    } catch (error) {
      console.error('Error generating career path:', error);
      throw new Error(`Failed to generate career path: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
}
