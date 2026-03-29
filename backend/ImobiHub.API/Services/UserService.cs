using MySqlConnector;

public class UsersService
{
    private readonly IConfiguration _config;

    public UsersService(IConfiguration config)
    {
        _config = config;
    }

    public async Task<List<User>> GetUsersAsync()
    {
        var users = new List<User>();

        var connString = _config.GetConnectionString("DefaultConnection");

        using var conn = new MySqlConnection(connString);
        await conn.OpenAsync();

        using var cmd = new MySqlCommand("SELECT id, name, email FROM users", conn);
        using var reader = await cmd.ExecuteReaderAsync();

        while (await reader.ReadAsync())
        {
            users.Add(new User
            {
                Id = reader.GetInt32("id"),
                Name = reader.GetString("name"),
                Email = reader.GetString("email")
            });
        }

        return users;
    }
}

public class User
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
}