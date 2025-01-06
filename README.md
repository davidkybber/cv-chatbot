# CV Chatbot

An interactive chatbot application that helps users interact with CV/resume information. The chatbot uses GPT-4 to provide intelligent responses about professional experience, skills, and career information. The application consists of an Angular frontend for user interaction, an Azure Functions backend powered by GPT-4, and infrastructure managed through Terraform.

## Project Structure

```
.
├── frontend-cv-chatbot/    # Angular frontend application
│   ├── src/               # Source files
│   │   ├── app/          # Application components
│   │   │   ├── components/  # UI components
│   │   │   └── services/   # Angular services
│   │   └── assets/       # Static assets
│   └── package.json      # Frontend dependencies
├── backend/              # Azure Functions backend (TypeScript)
│   ├── cv-chatbot-backend/  # Main function code
│   │   ├── cv-files/    # CV data files
│   │   └── index.ts     # Main function endpoint
│   └── package.json     # Backend dependencies
└── infrastructure/       # Terraform infrastructure code
```

## Features

- 🤖 Interactive chat interface for CV exploration
- 🧠 GPT-4 powered responses for natural conversation
- 📱 Responsive design that works on all devices
- ☁️ Scalable Azure Functions backend
- 🔒 Secure API integration
- 🚀 Infrastructure as Code with Terraform

## Prerequisites

- Node.js (v18 or higher)
- npm (comes with Node.js)
- Azure Functions Core Tools (`npm install -g azure-functions-core-tools@4`)
- Azure CLI (`az`) for deployment
- Terraform (v1.0 or higher)
- OpenAI API key
- Azure subscription

## Quick Start

1. Clone the repository:
```bash
git clone https://github.com/yourusername/cv-chatbot.git
cd cv-chatbot
```

2. Set up the frontend:
```bash
cd frontend-cv-chatbot
npm install
npm start
```

3. Set up the backend:
```bash
cd backend
npm install
# Create local.settings.json with your OpenAI API key
npm run build
npm start
```

4. Deploy infrastructure:
```bash
cd infrastructure
terraform init
terraform apply
```

## Environment Setup

### Frontend Configuration

Create `frontend-cv-chatbot/src/environments/environment.ts`:
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:7071/api'
};
```

### Backend Configuration

Create `backend/local.settings.json`:
```json
{
  "IsEncrypted": false,
  "Values": {
    "AzureWebJobs.cv-chatbot-backend.Disabled": "false",
    "OPENAI_API_KEY": "your-api-key-here"
  }
}
```

## Development

### Frontend Development

The frontend is built with Angular 19.0.1 and provides a modern chat interface:

```bash
cd frontend-cv-chatbot
npm start         # Start dev server
npm run build     # Build for production
npm test         # Run tests
npm run lint     # Lint code
```

Access the application at `http://localhost:4200`

### Backend Development

The backend uses Azure Functions with TypeScript:

```bash
cd backend
npm run build    # Build TypeScript
npm start       # Start Functions runtime
npm run watch   # Watch for changes
```

Access the API at `http://localhost:7071`

### Infrastructure Development

Infrastructure is managed with Terraform:

```bash
cd infrastructure
terraform init   # Initialize
terraform plan  # Preview changes
terraform apply # Apply changes
```

## Architecture

```
┌────────────┐     ┌────────────┐     ┌────────────┐
│   Angular  │ --> │   Azure    │ --> │   OpenAI   │
│  Frontend  │     │ Functions  │     │   GPT-4    │
└────────────┘     └────────────┘     └────────────┘
```

## Security Considerations

- Frontend uses HTTPS for secure communication
- Backend implements CORS protection
- API keys stored securely in Azure Key Vault
- Regular dependency updates
- Input validation and sanitization

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Angular team for the fantastic framework
- Azure Functions for serverless capabilities
- OpenAI for GPT-4 API
- HashiCorp for Terraform