resource_group_name = "cv-chatbot-rg"
location           = "westus2"
static_web_name    = "frontend-cv-chatbot"
tags = {
  Environment = "Production"
  Project     = "CV-Chatbot"
}
storage_account_name      = "stcvchatbotfunc"
app_service_plan_name     = "asp-cv-chatbot"
application_insights_name = "ai-cv-chatbot"
function_app_name        = "func-cv-chatbot" 