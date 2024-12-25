output "static_web_id" {
  value       = azurerm_static_web_app.web.id
  description = "ID of the Static Web App"
}

output "default_host_name" {
  value       = azurerm_static_web_app.web.default_host_name
  description = "Default hostname of the Static Web App"
}

output "api_key" {
  value       = azurerm_static_web_app.web.api_key
  description = "API key of the Static Web App"
  sensitive   = true
} 