namespace backend.Models
{
public class User
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
    public int? Matricule { get; set; }
    public string Password { get; set; }
    public string Role { get; set; }
    public string Type { get; set; }
}

}