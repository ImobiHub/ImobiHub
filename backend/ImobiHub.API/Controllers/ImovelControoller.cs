using Microsoft.AspNetCore.Mvc;
using Projeto.DTOs;
using Projeto.Services;

namespace Projeto.Controllers;

[ApiController]
[Route("api/imoveis")]
public class ImovelController : ControllerBase
{
    private readonly ImovelService _service;

    public ImovelController(ImovelService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> BuscarTodos()
    {
        var lista = await _service.BuscarTodos();

        return Ok(lista);
    }

    [HttpPost]
    public async Task<IActionResult> Criar(ImovelInputDTO input)
    {
        await _service.Criar(input);

        return Ok(new
        {
            mensagem = "Imóvel cadastrado com sucesso!"
        });
    }
}