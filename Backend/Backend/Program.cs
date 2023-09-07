using Backend;
using Backend.Data;
using Backend.DTO_Mapping;
using Backend.Repository;
using Backend.Repository.IRepository;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Swashbuckle.AspNetCore.SwaggerGen;
using System.Text;

var builder = WebApplication.CreateBuilder(args);
string cs = builder.Configuration.GetConnectionString("Constr");  //ConnectionString
builder.Services.AddDbContext<ApplicationDbContext>(options => options.UseSqlServer(cs));//ConnectionString
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IEncryptionRepository, EncryptionRepository>();
builder.Services.AddScoped<IEmailSender,EmailSender>();
builder.Services.AddAutoMapper(typeof(MappingProfile));

builder.Services.AddTransient<IConfigureOptions<SwaggerGenOptions>, ConfigureSwaggerOptions>();   //Authorize Token//
builder.Services.Configure<EmailSettings>(builder.Configuration.GetSection("EmailSettings"));  //Add EmailSettings//

// Add services to the container.

builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "MyPolicy", builder =>
    {
        builder.WithOrigins("http://localhost:3000/")
        .AllowAnyOrigin()
        .AllowAnyHeader()
        .AllowAnyMethod();
    });
});

//JWT CONFIGURATION //
var appSettingsSection = builder.Configuration.GetSection("AppSettings");//ClassName
builder.Services.Configure<AppSettings>(appSettingsSection);
var appSettings = appSettingsSection.Get<AppSettings>();
var Key = Encoding.ASCII.GetBytes(appSettings.Secret);
builder.Services.AddAuthentication(x =>
{
    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(x =>
{
    x.RequireHttpsMetadata = false;
    x.SaveToken = true;
    x.TokenValidationParameters = new TokenValidationParameters()
    {
        ValidateIssuerSigningKey = false,
        IssuerSigningKey = new SymmetricSecurityKey(Key),
        ValidateIssuer = false,
        ValidateAudience = false

    };
});


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("MyPolicy");   //Add Cors//

app.UseAuthentication();    //Add JWT Auntication//
app.UseAuthorization();

app.MapControllers();

app.Run();
