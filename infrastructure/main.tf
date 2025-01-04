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

resource "azurerm_storage_account" "function" {
  name                     = var.storage_account_name
  resource_group_name      = azurerm_resource_group.static_web.name
  location                = azurerm_resource_group.static_web.location
  account_tier             = "Standard"
  account_replication_type = "LRS"
  tags                     = var.tags
}

resource "azurerm_service_plan" "function" {
  name                = var.app_service_plan_name
  resource_group_name = azurerm_resource_group.static_web.name
  location           = azurerm_resource_group.static_web.location
  os_type            = "Windows"
  sku_name           = "Y1"
  tags               = var.tags
}

resource "azurerm_application_insights" "function" {
  name                = var.application_insights_name
  resource_group_name = azurerm_resource_group.static_web.name
  location           = azurerm_resource_group.static_web.location
  application_type    = "web"
  tags               = var.tags
}

resource "azurerm_windows_function_app" "function" {
  name                       = var.function_app_name
  resource_group_name        = azurerm_resource_group.static_web.name
  location                  = azurerm_resource_group.static_web.location
  storage_account_name       = azurerm_storage_account.function.name
  storage_account_access_key = azurerm_storage_account.function.primary_access_key
  service_plan_id            = azurerm_service_plan.function.id

  site_config {
    application_stack {
      node_version = "~18"
    }
  }

  app_settings = {
    "WEBSITE_NODE_DEFAULT_VERSION" = "~18"
    "FUNCTIONS_WORKER_RUNTIME"     = "node"
    "APPINSIGHTS_INSTRUMENTATIONKEY" = azurerm_application_insights.function.instrumentation_key
  }

  tags = var.tags
} 
