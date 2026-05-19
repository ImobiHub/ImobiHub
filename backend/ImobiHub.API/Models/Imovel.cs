namespace Projeto.Models;

public class Imovel
{
    public int Id { get; set; }
    public int CorretorId { get; set; }
    public string Descricao { get; set; }
    public string Localizacao { get; set; }
    public decimal Valor { get; set; }
    public string Imagem { get; set; }
    public string NomeCorretor { get; set; }
}