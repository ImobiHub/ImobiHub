using MySqlConnector;

namespace Projeto.Data;

public class MySqlContext
{
    private readonly IConfiguration _config;

    public MySqlContext(IConfiguration config)
    {
        _config = config;
    }

    public MySqlConnection CreateConnection()
    {
        return new MySqlConnection(
            _config.GetConnectionString("DefaultConnection")
        );
    }
}