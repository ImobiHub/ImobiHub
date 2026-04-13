using MySqlConnector;

var builder = WebApplication.CreateBuilder(args);

var app = builder.Build();

app.UseHttpsRedirection();

// ROTA PRINCIPAL
app.MapGet("/api/imoveis", async (IConfiguration config) =>
{
    var lista = new List<object>();

    var connectionString = config.GetConnectionString("DefaultConnection");

    using var conn = new MySqlConnection(connectionString);
    await conn.OpenAsync();

    var query = @"
        SELECT 
            imoveis.id_imovel, 
            imoveis.fk_corretor, 
            imoveis.descricao_imovel, 
            imoveis.localizacao_imovel, 
            imoveis.valor_imovel, 
            imoveis.img_imovel, 
            corretores.nome_corretor 
        FROM imoveis
        JOIN corretores 
            ON imoveis.fk_corretor = corretores.id_corretor;
    ";

    using var cmd = new MySqlCommand(query, conn);
    using var reader = await cmd.ExecuteReaderAsync();

    while (await reader.ReadAsync())
    {
        lista.Add(new
        {
            id = reader["id_imovel"],
            corretorId = reader["fk_corretor"],
            descricao = reader["descricao_imovel"],
            localizacao = reader["localizacao_imovel"],
            valor = reader["valor_imovel"],
            imagem = reader["img_imovel"],
            nomeCorretor = reader["nome_corretor"]
        });
    }

    return Results.Ok(lista);
});

app.Run();