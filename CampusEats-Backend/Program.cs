using CampusEats.Api.Services;
using CampusEats.Api.Data;
using Microsoft.EntityFrameworkCore;
using CampusEats.Api.Models;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;


var builder = WebApplication.CreateBuilder(args);

var platformPort = Environment.GetEnvironmentVariable("PORT");
if (!string.IsNullOrWhiteSpace(platformPort))
    builder.WebHost.UseUrls($"http://0.0.0.0:{platformPort}");

var frontendOrigin = builder.Configuration["Frontend:Origin"];
var allowedOrigins = builder.Environment.IsDevelopment()
    ? new[] { "http://localhost:5173", "http://localhost:4173" }
    : Array.Empty<string>();
if (!string.IsNullOrWhiteSpace(frontendOrigin))
    allowedOrigins = allowedOrigins.Append(frontendOrigin.TrimEnd('/')).ToArray();
builder.Services.AddCors(options => options.AddPolicy("Frontend", policy =>
    policy.WithOrigins(allowedOrigins).AllowAnyHeader().AllowAnyMethod()));

// Add services to the container.
builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.Http,
        Scheme = "bearer",
        BearerFormat = "JWT",
        Description = "Paste ONLY the token - no 'Bearer ' prefix."
    });
    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
{ new OpenApiSecurityScheme { Reference = new OpenApiReference
            { Type = ReferenceType.SecurityScheme, Id = "Bearer" } },
          Array.Empty<string>() }
    });
});


// was: builder.Services.AddSingleton<IMenuService, MenuService>(); 
builder.Services.AddScoped<IMenuService, MenuService>();   // one per request 

builder.Services.AddDbContext<AppDbContext>(opt =>
    opt.UseNpgsql(builder.Configuration
        .GetConnectionString("Default")));


var jwt = builder.Configuration.GetSection("Jwt");
if (string.IsNullOrWhiteSpace(jwt["Key"]) || Encoding.UTF8.GetByteCount(jwt["Key"]!) < 32)
    throw new InvalidOperationException("Configure Jwt__Key with at least 32 bytes.");
var key = Encoding.UTF8.GetBytes(jwt["Key"]!);

builder.Services
  .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
  .AddJwtBearer(opt => opt.TokenValidationParameters = new()
  {
      ValidateIssuer = true,
      ValidIssuer = jwt["Issuer"],
      ValidateAudience = true,
      ValidAudience = jwt["Audience"],
      ValidateIssuerSigningKey = true,
      IssuerSigningKey = new SymmetricSecurityKey(key),
      ValidateLifetime = true
  });
builder.Services.AddAuthorization();


var app = builder.Build();



using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.Migrate();
    if (!db.MenuItems.Any())
    {
        db.MenuItems.AddRange(
            new MenuItem { Name = "Kottu Roti", Price = 750m, Category = "Mains" },
            new MenuItem { Name = "Fried Rice", Price = 850m, Category = "Mains" },
            new MenuItem { Name = "Watalappan", Price = 350m, Category = "Dessert" });
        db.SaveChanges();
    }
}


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

if (app.Environment.IsDevelopment())
    app.UseHttpsRedirection();
app.UseCors("Frontend");

// app.UseAuthorization();

app.UseAuthentication();   // who are you?  (validates JWT) 
app.UseAuthorization();    // may you?      (checks roles) 

app.MapControllers();
app.MapGet("/health", () => Results.Ok(new { status = "ok" }));

app.Run();
