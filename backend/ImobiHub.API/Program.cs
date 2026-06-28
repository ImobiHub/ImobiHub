using MySqlConnector;

var builder = WebApplication.CreateBuilder(args);

// 1. CONFIGURAR O CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:5173")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

app.UseCors("AllowFrontend");
app.UseHttpsRedirection();


// ==========================================
// ROTAS DA API
// ==========================================

// ROTA DE LISTAR IMÓVEIS
app.MapGet("/api/imoveis", async (IConfiguration config) =>
{
    var connectionString = config.GetConnectionString("DefaultConnection");
    using var conn = new MySqlConnection(connectionString);
    await conn.OpenAsync();

    var query = @"
        SELECT 
            id_imovel, 
            descricao_imovel, 
            localizacao_imovel, 
            valor_imovel, 
            img_imovel, 
            qtd_quartos,
            qtd_vagas,
            qtd_banheiros,
            tipo_negocio
        FROM imoveis;";

    using var cmd = new MySqlCommand(query, conn);
    using var reader = await cmd.ExecuteReaderAsync();

    var lista = new List<object>();

    while (await reader.ReadAsync())
    {
        lista.Add(new
        {
            id = reader["id_imovel"],
            descricao = reader["descricao_imovel"],
            localizacao = reader["localizacao_imovel"],
            valor = reader["valor_imovel"],
            imagem = reader["img_imovel"]?.ToString(),
            quartos = reader["qtd_quartos"],
            vagas = reader["qtd_vagas"],
            banheiros = reader["qtd_banheiros"],
            tipoNegocio = reader["tipo_negocio"]?.ToString()
        });
    }

    return Results.Ok(lista);
});

// ROTA DE CADASTRO (ÚNICA E CORRETA)
app.MapPost("/api/cadastro", async (UsuarioNovo model, IConfiguration config) =>
{
    var connectionString = config.GetConnectionString("DefaultConnection");
    using var conn = new MySqlConnection(connectionString);
    await conn.OpenAsync();

    var query = @"INSERT INTO usuarios (nome_usuario, email_usuario, senha_usuario, telefono_usuario, perfil) 
                  VALUES (@nome, @email, @senha, @tel, @perfil)";

    using var cmd = new MySqlCommand(query, conn);
    cmd.Parameters.AddWithValue("@nome", model.Nome);
    cmd.Parameters.AddWithValue("@email", model.Email);
    cmd.Parameters.AddWithValue("@senha", model.Senha);
    cmd.Parameters.AddWithValue("@tel", model.Telefone);
    cmd.Parameters.AddWithValue("@perfil", string.IsNullOrEmpty(model.Perfil) ? "cliente" : model.Perfil);

    await cmd.ExecuteNonQueryAsync();
    return Results.Ok(new { mensagem = "Usuário cadastrado com sucesso!" });
});

// ROTA DE LOGIN
app.MapPost("/api/login", async (LoginModel model, IConfiguration config) =>
{
    var connectionString = config.GetConnectionString("DefaultConnection");
    using var conn = new MySqlConnection(connectionString);
    await conn.OpenAsync();

    var query = "SELECT id_usuario, nome_usuario, perfil FROM usuarios WHERE email_usuario = @email AND senha_usuario = @senha";

    using var cmd = new MySqlCommand(query, conn);
    cmd.Parameters.AddWithValue("@email", model.Email);
    cmd.Parameters.AddWithValue("@senha", model.Senha);

    using var reader = await cmd.ExecuteReaderAsync();

    if (await reader.ReadAsync())
    {
        return Results.Ok(new
        {
            id = reader["id_usuario"],
            nome = reader["nome_usuario"],
            perfil = reader["perfil"]?.ToString(),
            mensagem = "Login realizado!"
        });
    }

    return Results.Unauthorized();
});

// Este comando final é obrigatório para a API rodar
app.Run();


// ==========================================
// ÁREA DE DEFINIÇÕES (O "PORÃO" DO CÓDIGO)
// ==========================================

public class Imovel
{
    public int Id { get; set; }
    public string Descricao { get; set; }
    public string Localizacao { get; set; }
    public decimal Valor { get; set; }
    public string Imagem { get; set; }
    public int QtdQuartos { get; set; }
    public int QtdVagas { get; set; }
    public int QtdBanheiros { get; set; }
    public string TipoNegocio { get; set; }
    public bool Mobiliado { get; set; }
}

public record UsuarioNovo(string Nome, string Email, string Senha, string Telefone, string Perfil);
public record LoginModel(string Email, string Senha);