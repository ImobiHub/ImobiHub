using Projeto.DTOs;
using Projeto.Models;
using Projeto.Repositories;

namespace Projeto.Services;

public class ImovelService
{
    private readonly ImovelRepository _repository;

    public ImovelService(ImovelRepository repository)
    {
        _repository = repository;
    }

    public async Task<List<Imovel>> BuscarTodos()
    {
        return await _repository.BuscarTodos();
    }

    public async Task Criar(ImovelInputDTO input)
    {
        // futuras validações
        // verificar corretor
        // validar valor
        // etc

        await _repository.Criar(input);
    }
}