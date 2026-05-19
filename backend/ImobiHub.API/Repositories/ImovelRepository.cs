using MySqlConnector;
using Projeto.Data;
using Projeto.DTOs;
using Projeto.Models;

namespace Projeto.Repositories;

public class ImovelRepository
{
    private readonly MySqlContext _context;

    public ImovelRepository(MySqlContext context)
    {
        _context = context;
    }

    public async Task<List<Imovel>> BuscarTodos()
    {
        var lista = new List<Imovel>();

        using var conn = _context.CreateConnection();

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
            lista.Add(new Imovel
            {
                Id = Convert.ToInt32(reader["id_imovel"]),
                CorretorId = Convert.ToInt32(reader["fk_corretor"]),
                Descricao = reader["descricao_imovel"].ToString(),
                Localizacao = reader["localizacao_imovel"].ToString(),
                Valor = Convert.ToDecimal(reader["valor_imovel"]),
                Imagem = reader["img_imovel"].ToString(),
                NomeCorretor = reader["nome_corretor"].ToString()
            });
        }

        return lista;
    }

    public async Task Criar(ImovelInputDTO input)
    {
        using var conn = _context.CreateConnection();

        await conn.OpenAsync();

        var query = @"
            INSERT INTO imoveis 
            (fk_corretor, descricao_imovel, localizacao_imovel, valor_imovel, img_imovel)
            VALUES 
            (@fk_corretor, @descricao, @localizacao, @valor, @imagem);
        ";

        using var cmd = new MySqlCommand(query, conn);

        cmd.Parameters.AddWithValue("@fk_corretor", input.FkCorretor);
        cmd.Parameters.AddWithValue("@descricao", input.Descricao);
        cmd.Parameters.AddWithValue("@localizacao", input.Localizacao);
        cmd.Parameters.AddWithValue("@valor", input.Valor);
        cmd.Parameters.AddWithValue("@imagem", input.Imagem);

        await cmd.ExecuteNonQueryAsync();
    }
}