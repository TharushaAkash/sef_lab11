# CampusEats — Lab 11 deployment

Repository: https://github.com/TharushaAkash/sef_lab11

## Local check

The frontend now reads `VITE_API_URL` and calls the API menu endpoints. It no longer reads menu.json.

1. In the ignored `CampusEats-Backend/appsettings.Development.json`, configure `ConnectionStrings:Default` with your actual Neon details:
   `Host=<host>;Database=<database>;Username=<role>;Password=<password>;SSL Mode=Require`.
2. Keep a development `Jwt:Key` of at least 32 bytes in that same ignored file.
3. From CampusEats-Backend run `dotnet run --launch-profile https`.
4. From CampusEats-Frontend run `npm run dev`.
5. Open https://localhost:7259/api/menu, then http://localhost:5173. Verify menu and dish details.

Existing EF migrations run on backend startup and seed three menu items only when the menu is empty. The order form remains the earlier lab's browser-only demo; there is no order API in the supplied backend.

## Netlify

Import the GitHub repository. The root netlify.toml sets the frontend base directory, npm run build, dist output, and SPA rewrites for direct dish URLs.

Add `VITE_API_URL` as a build environment variable. Initially it can be a placeholder HTTPS API URL. Deploy to obtain the Netlify site origin, then replace VITE_API_URL with the real Render URL and rebuild.

## Render and Neon

On Neon, open your project and its Connect dialog. Select the desired branch, database, and role. Use those values in an Npgsql semicolon-delimited connection string, rather than a postgresql:// URI.

On Render, create a Blueprint from the repository. render.yaml selects a free Docker web service, the backend root directory, and /health. Supply:

| Variable | Value |
| --- | --- |
| ConnectionStrings__Default | Actual Neon connection string, with SSL Mode=Require |
| Frontend__Origin | Exact HTTPS Netlify origin, without a trailing slash |
| Jwt__Key | Generated automatically by the Blueprint |
| Jwt__Issuer | CampusEats |
| Jwt__Audience | CampusEatsUsers |
| ASPNETCORE_ENVIRONMENT | Production |

For manual Render service creation choose Docker, root directory CampusEats-Backend, Dockerfile ./Dockerfile, and the same environment variables. Generate your own random JWT secret of at least 32 bytes in that case.

The app binds Render's PORT when supplied, otherwise the Docker image uses port 8080. Render provides public HTTPS; the app uses HTTP inside the container. Swagger is available only in Development; test /api/menu in production.

After deployment, put the Render HTTPS origin in Netlify's VITE_API_URL and rebuild. Test /health, /api/menu, menu rendering, dish details, and a direct /dish/1 reload. In browser Network confirm API requests return 200 and the CORS origin matches Netlify.

## Evidence for the Word submission

Capture GitHub repository URL, successful build/deploy dashboards, masked environment settings, Neon database dashboard, frontend menu, direct API response, and Render runtime/Netlify build logs. Record the deployed commit and build time. Do not claim cloud deployment or end-to-end success before these checks pass.

Include student name, IT number, Lab 11, GitHub/frontend/backend URLs, Tasks 01–06 explanations, platform justification, a 4–5 sentence reflection based on actual results, and Quick Test answers. Save as ITXXXXXXXX_Lab11.docx.

Quick Test: Q1 b; Q2 c; Q3 c; Q4 b; Q5 a. Q6: configuration differs between environments and secrets stay outside source control. Q7: npm run build outputs dist. Q8: verify the backend CORS allow-list includes the exact frontend origin and VITE_API_URL targets the correct HTTPS backend, then redeploy affected services.

Reference documentation: [Netlify configuration](https://docs.netlify.com/build/configure-builds/file-based-configuration/), [Render Blueprints](https://render.com/docs/blueprint-spec), [Render Docker](https://render.com/docs/docker).
