using Projeto.Data;
using Projeto.Repositories;
using Projeto.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy =>
        {
            policy
                .AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader();
        });
});

builder.Services.AddScoped<MySqlContext>();

builder.Services.AddScoped<ImovelRepository>();

builder.Services.AddScoped<ImovelService>();

var app = builder.Build();

app.UseCors("AllowFrontend");

app.UseHttpsRedirection();

app.MapControllers();

app.Run();