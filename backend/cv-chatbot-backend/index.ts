import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import axios from 'axios';

const CV_TEXT = `
David is a software engineer with X years of experience. 
He has worked on projects using Y, Z technologies. 
David is proficient in A, B, and C, and is currently based in Germany.
`;

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  const userQuery = req.body?.query || "";

  // Combine CV and user question into one prompt
  const prompt = `
    You are an AI assistant knowledgeable about David's career. 
    Here is David's CV: 
    "${CV_TEXT}"
    The user asked: "${userQuery}"
    Please provide a helpful and professional answer.
  `;

  // Call OpenAI or Azure OpenAI Chat Completion
  const response = await axios.post(
    "https://api.openai.com/v1/chat/completions",
    {
      model: "gpt-3.5-turbo",
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

  context.res = { body: { answer } };
};

export default httpTrigger;
