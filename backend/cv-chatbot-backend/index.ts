import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import axios from 'axios';
import * as fs from 'fs';
import * as path from 'path';

// Function to read all .txt files from a directory
async function loadCVTexts(): Promise<string> {
    try {
        // Try multiple possible locations for the cv-files directory
        const possiblePaths = [
            path.join(__dirname, 'cv-files'),
            path.join(process.cwd(), 'cv-files'),
            path.join(process.cwd(), 'dist', 'cv-chatbot-backend', 'cv-files')
        ];

        let cvPath = '';
        for (const p of possiblePaths) {
            if (fs.existsSync(p)) {
                cvPath = p;
                break;
            }
        }

        if (!cvPath) {
            throw new Error(`CV files directory not found. Tried paths: ${possiblePaths.join(', ')}`);
        }

        console.log('Using CV files from:', cvPath);
        const files = fs.readdirSync(cvPath);
        const txtFiles = files.filter(file => file.endsWith('.txt'));
        
        let combinedText = '';
        for (const file of txtFiles) {
            const filePath = path.join(cvPath, file);
            const content = fs.readFileSync(filePath, 'utf8');
            combinedText += `=== ${file} ===\n${content}\n\n`;
        }
        return combinedText.trim();
    } catch (error) {
        console.error('Error reading CV files:', error);
        console.error('Current directory:', __dirname);
        console.error('Working directory:', process.cwd());
        throw error;
    }
}

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Origin": "*", // In production, replace with your frontend URL
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With"
  };

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    context.res = {
      status: 204,
      headers
    };
    return;
  }

  context.res = {
    headers
  };

  try {
    // Read CV texts from the cv-files directory
    const CV_TEXT = await loadCVTexts();
    
    const userQuery = req.body?.query || "";

    const prompt = `
      You are an AI assistant representing David's professional career. Your role is to:
      - Only answer questions directly related to David's professional experience, skills, and career
      - Maintain a consistently positive and professional tone
      - Decline to answer personal questions or questions not related to the CV
      - If unsure about any detail, err on the side of caution and provide a general professional response
      - Never make assumptions or speculate about information not present in the CV
      - Never disclose sensitive information like contact details or personal information
      
      Here is David's CV information: 
      "${CV_TEXT}"
      
      The user asked: "${userQuery}"
      
      Please provide a helpful and professional answer within these guidelines. If the question is not related to David's professional background, politely redirect the conversation to his professional achievements and skills.
    `;

    // Call OpenAI or Azure OpenAI Chat Completion
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4",
        messages: [
          { role: "system", content: prompt },
          { role: "user", content: userQuery },
        ],
      },
      {
        headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` },
      }
    );

    const answer = response.data.choices[0].message.content;
    context.res.body = { answer };
  } catch (err: any) {
    context.res.status = 500;
    context.res.body = { 
      error: "An error occurred while processing your request",
      details: err.message 
    };
  }
};

export default httpTrigger;
