# CampusEats.Api

ASP.NET Core Web API for SE3090 Lab Practical 03 (CampusEats Menu API).

## How to run

1. Install the .NET 8 SDK if you don't have it: https://dotnet.microsoft.com/download/dotnet/8.0
2. Open a terminal in this folder (the one containing `CampusEats.Api.csproj`).
3. Restore and run:
   ```
   dotnet restore
   dotnet run
   ```
4. Open the printed URL and add `/swagger`, e.g. `https://localhost:7259/swagger`.
5. If prompted about the HTTPS certificate: `dotnet dev-certs https --trust`

## Project structure

```
CampusEats.Api/
├── Program.cs
├── appsettings.json
├── CampusEats.Api.csproj
├── Controllers/
│   └── MenuController.cs
├── Services/
│   ├── IMenuService.cs
│   └── MenuService.cs
├── Models/
│   └── MenuItem.cs
└── Dtos/
    ├── CreateMenuItemDto.cs
    └── MenuItemDto.cs
```

## Endpoints

| Method | Path            | Success | Purpose        |
|--------|-----------------|---------|-----------------|
| GET    | /api/menu       | 200     | List all dishes |
| GET    | /api/menu/{id}  | 200/404 | Get one dish    |
| POST   | /api/menu       | 201     | Create a dish   |
| PUT    | /api/menu/{id}  | 204/404 | Replace a dish  |
| DELETE | /api/menu/{id}  | 204/404 | Delete a dish   |

Note: `bin/` and `obj/` are not included — they are regenerated automatically
the first time you run `dotnet restore` / `dotnet build` / `dotnet run`.
