terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 4.14.0"
    }
  }
  backend "azurerm" {
    resource_group_name  = "terraform-state-rg"
    storage_account_name = "tfstatedavidcbinfra"
    container_name      = "tfstate-cv-chatbot"
    key                 = "terraform.tfstate"
  }
}

provider "azurerm" {
  features {}
}

resource "azurerm_resource_group" "static_web" {
  name     = var.resource_group_name
  location = var.location
}

resource "azurerm_static_web_app" "web" {
  name                = var.static_web_name
  resource_group_name = azurerm_resource_group.static_web.name
  location           = azurerm_resource_group.static_web.location
  sku_tier           = var.sku_tier
  sku_size           = var.sku_size

  tags = var.tags
} 
