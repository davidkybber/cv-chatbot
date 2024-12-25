variable "resource_group_name" {
  type        = string
  description = "Name of the resource group"
}

variable "location" {
  type        = string
  description = "Azure region where resources will be created"
}

variable "static_web_name" {
  type        = string
  description = "Name of the Static Web App instance"
}

variable "sku_tier" {
  type        = string
  description = "SKU tier for the Static Web App (Free or Standard)"
  default     = "Free"
}

variable "sku_size" {
  type        = string
  description = "SKU size for the Static Web App (Free or Standard)"
  default     = "Free"
}

variable "tags" {
  type        = map(string)
  description = "Tags to apply to all resources"
  default     = {}
} 
