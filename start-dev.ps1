# Start both server and client in development mode
Write-Host "Starting TenantShield Development Environment..." -ForegroundColor Cyan

# Start the server in a new window
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\server' ; npm run dev"

# Wait a moment for server to start
Start-Sleep -Seconds 3

# Start the client in a new window
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\client' ; npm run dev"

Write-Host "Server and Client started in separate windows" -ForegroundColor Green
