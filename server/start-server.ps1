# Start the server in the correct directory
Set-Location $PSScriptRoot
Write-Host "Starting TenantShield Server..." -ForegroundColor Green
node index.js
