namespace Projeto.DTOs;

public class ImovelInputDTO
{
    public int FkCorretor { get; set; }
    public string Descricao { get; set; }
    public string Localizacao { get; set; }
    public decimal Valor { get; set; }
    public string Imagem { get; set; }
}