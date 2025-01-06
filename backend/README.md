# CV Chatbot Backend

Azure Functions-based backend for the CV Chatbot application. This service provides an API endpoint that processes chat queries using GPT-4 and returns relevant information from the CV data.

## Architecture

The backend consists of:
- Azure Function HTTP trigger endpoint for chat interactions
- CV data stored in structured text files
- OpenAI GPT-4 integration for natural language processing
- CORS support for frontend integration
- TypeScript-based codebase with strict typing

## Prerequisites

- Node.js (v18 or higher)
- npm (comes with Node.js)
- Azure Functions Core Tools (`npm install -g azure-functions-core-tools@4`)
- OpenAI API key
- Azure subscription (for deployment)

## Project Structure

```
backend/
├── cv-chatbot-backend/          # Main function code
│   ├── index.ts                # Main HTTP trigger function
│   ├── copyFiles.ts           # Build script for CV files
│   ├── function.json         # Function configuration
│   └── cv-files/            # CV data text files
│       ├── domains.txt     # Industry domains
│       ├── experience.txt  # Work experience
│       ├── linkedinData.txt # LinkedIn profile
│       ├── projects.txt    # Project details
│       └── skills.txt      # Technical skills
├── package.json              # Dependencies and scripts
├── tsconfig.json            # TypeScript configuration
└── host.json               # Azure Functions host configuration
```

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `local.settings.json`:
```json
{
  "IsEncrypted": false,
  "Values": {
    "AzureWebJobs.cv-chatbot-backend.Disabled": "false",
    "OPENAI_API_KEY": "your-api-key-here"
  }
}
```

3. Build the project:
```bash
npm run build
```

4. Start the Functions runtime:
```bash
npm start
```

## Development

### Available Scripts

- `npm run build`: Compiles TypeScript and copies CV files
- `npm start`: Starts the Functions runtime locally
- `npm run watch`: Watches for changes and rebuilds
- `npm test`: Runs tests (to be implemented)

### API Endpoints

#### Chat Endpoint

`POST /api/cv-chatbot-backend`

Request body:
```json
{
  "query": "What are David's programming skills?"
}
```

Response format:
```json
{
  "answer": "Based on David's CV, he is proficient in..."
}
```

Headers:
- `Content-Type: application/json`
- CORS headers for frontend integration

### CV Data Management

The CV data is organized into several text files:

- `domains.txt`: Industry domains and background
  - E-Commerce, Cyber Security, Finance, etc.

- `experience.txt`: Work experience
  - Chronological list of positions and responsibilities

- `linkedinData.txt`: LinkedIn profile data
  - Detailed professional experience and achievements

- `projects.txt`: Project details
  - Key projects and their descriptions

- `skills.txt`: Technical skills and competencies
  - Programming languages, technologies, and competencies

During build, these files are automatically copied to the distribution folder using `copyFiles.ts`.

### GPT-4 Integration

The backend uses GPT-4 to:
1. Process natural language queries
2. Generate context-aware responses
3. Maintain professional conversation boundaries
4. Focus on CV-related information

### Error Handling

The backend implements comprehensive error handling:

- Input validation
- API rate limiting
- Error logging
- Graceful fallbacks
- Structured error responses

## Deployment

### Local Development

1. Build the project:
```bash
npm run build
```

2. Start locally:
```bash
npm start
```

### Azure Deployment

1. Create Azure Function App:
```bash
az functionapp create --name your-app-name --storage-account your-storage --resource-group your-rg --consumption-plan-location westeurope
```

2. Deploy:
```bash
func azure functionapp publish your-app-name
```

### Environment Variables

Required environment variables:
- `OPENAI_API_KEY`: Your OpenAI API key

Optional configuration:
- `MAX_TOKENS`: Maximum tokens for GPT-4 response
- `TEMPERATURE`: GPT-4 temperature setting
- `ALLOWED_ORIGINS`: CORS allowed origins

## Security

### API Security

- Anonymous authentication for development
- CORS configuration for frontend
- Rate limiting implementation
- Input validation and sanitization

### Data Security

- CV data versioning
- Secure file handling
- No sensitive data exposure
- Regular security updates

## Monitoring

The backend includes:
- Application Insights integration
- Custom metrics tracking
- Error logging
- Performance monitoring

## Troubleshooting

Common issues and solutions:

1. CV files not found:
   - Run `npm run build`
   - Check `dist/cv-chatbot-backend/cv-files/`
   - Verify file permissions

2. OpenAI API errors:
   - Verify API key
   - Check rate limits
   - Monitor API status

3. CORS issues:
   - Update allowed origins
   - Check request headers
   - Verify frontend URL

4. Build errors:
   - Clear `dist` directory
   - Update TypeScript version
   - Check for syntax errors

## Performance Optimization

- Response caching
- Efficient file reading
- Optimized GPT-4 prompts
- Resource management

## Future Improvements

- Implement response caching
- Add unit tests
- Enhance error handling
- Implement API versioning
- Add authentication 