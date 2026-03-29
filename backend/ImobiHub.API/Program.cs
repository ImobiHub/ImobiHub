using MySqlConnector;

var builder = WebApplication.CreateBuilder(args);

// registrar o service
builder.Services.AddSingleton<UsersService>();

var app = builder.Build();

app.UseHttpsRedirection();

// rota GET /users
app.MapGet("/users", async (UsersService service) =>
{
    var users = await service.GetUsersAsync();
    return Results.Ok(users);
});

app.Run();