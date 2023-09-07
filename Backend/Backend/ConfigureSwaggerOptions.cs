﻿using Microsoft.Extensions.Options;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;

namespace Backend
{
    public class ConfigureSwaggerOptions : IConfigureOptions<SwaggerGenOptions>
    {
        public void Configure(SwaggerGenOptions options)
        {
            options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
            {
                Description = "JWT Authorization header using the Bearer Scheme\r\n\r\n" +
               "Enter 'Bearer'[space]and then you token in the text input below\r\n\r\n" +
               "Example:Bearer12345abcder\r\n" + "Name:Authorization\r\n" + "In header",
                Name = "Authorization",
                In = ParameterLocation.Header,
                Type
               = SecuritySchemeType.ApiKey,
                Scheme = "Bearer"
            });
            //******//
            options.AddSecurityRequirement(new OpenApiSecurityRequirement() {
            {
                new OpenApiSecurityScheme
                {
                    Reference=new OpenApiReference
                    {
                        Type=ReferenceType.SecurityScheme,
                        Id="Bearer"
                    },
                    Scheme="aouth2",
                    Name="Bearer",
                    In=ParameterLocation.Header
                },
                new List<string>()
            }

            });

        }
    }
}
