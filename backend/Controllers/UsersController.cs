using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AuthController(AppDbContext context)
        {
            _context = context;
        }
[HttpPut("updateprofile")]
public async Task<IActionResult> UpdateProfile([FromQuery] int userId, [FromBody] User updatedUser)
{
    var currentUser = await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);
    if (currentUser == null)
        return Unauthorized("Utilisateur non trouvé.");
    currentUser.Name = updatedUser.Name ?? currentUser.Name;
    currentUser.Email = updatedUser.Email ?? currentUser.Email;
    currentUser.Password = !string.IsNullOrEmpty(updatedUser.Password) ? updatedUser.Password : currentUser.Password;
    _context.Users.Update(currentUser);
    await _context.SaveChangesAsync();
    return Ok(new { Message = "Profil mis à jour avec succès.", User = currentUser });
}


        [HttpPost("signin")]
        public async Task<IActionResult> SignIn([FromBody] LoginRequest loginRequest)
        {
            if (loginRequest == null || loginRequest.Matricule <= 0 || string.IsNullOrEmpty(loginRequest.Password))
                return BadRequest("Les champs matricule et mot de passe sont requis.");

            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Matricule == loginRequest.Matricule && u.Password == loginRequest.Password);

            if (user == null)
                return Unauthorized("Matricule ou mot de passe incorrect.");

            return Ok(new
            {
                Message = "Connexion réussie.",
                Name=user.Name,
                Matricule=user.Matricule,
                UserId = user.Id,
                Type = user.Type
            });
        }

        [HttpPost("signup")]
        public async Task<IActionResult> SignUp([FromBody] User user)
        {
            if (user == null || string.IsNullOrEmpty(user.Email) || string.IsNullOrEmpty(user.Password))
                return BadRequest("Les champs email et mot de passe sont requis.");

            if (user.Matricule <= 0)
                return BadRequest("Le matricule ne peut pas être inférieur ou égal à 0.");

            user.Type = "testeur";

            var existingUserByEmail = await _context.Users.FirstOrDefaultAsync(u => u.Email == user.Email);
            if (existingUserByEmail != null)
                return Conflict("Un utilisateur avec cet email existe déjà.");

            var existingUserByMatricule = await _context.Users.FirstOrDefaultAsync(u => u.Matricule == user.Matricule);
            if (existingUserByMatricule != null)
                return Conflict("Un utilisateur avec ce matricule existe déjà.");

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                Message = "Inscription réussie.",
                UserId = user.Id
            });
        }

        [HttpGet("users")]
        public async Task<IActionResult> GetAllUsers([FromQuery] int userId)
        {
            var currentUser = await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);
            if (currentUser == null)
                return Unauthorized("Utilisateur non trouvé.");

            var users = await _context.Users.ToListAsync();
            return Ok(users);
        }

        [HttpDelete("deleteuser/{id}")]
        public async Task<IActionResult> DeleteUser(int id, [FromQuery] int userId)
        {
            var currentUser = await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);
            if (currentUser == null)
                return Unauthorized("Utilisateur non trouvé.");

            var userToDelete = await _context.Users.FirstOrDefaultAsync(u => u.Id == id);
            if (userToDelete == null)
                return NotFound("Utilisateur non trouvé.");

            _context.Users.Remove(userToDelete);
            await _context.SaveChangesAsync();

            return Ok(new { Message = "Utilisateur supprimé avec succès." });
        }

        [HttpPut("edituser/{id}")]
        public async Task<IActionResult> EditUser(int id,[FromBody] User updatedUser)
        {


            var userToEdit = await _context.Users.FirstOrDefaultAsync(u => u.Id == id);
            if (userToEdit == null)
                return NotFound("Utilisateur non trouvé.");

            // Mettre à jour les champs nécessaires
            userToEdit.Name = updatedUser.Name ?? userToEdit.Name;
            userToEdit.Email = updatedUser.Email ?? userToEdit.Email;
            userToEdit.Matricule = updatedUser.Matricule ?? userToEdit.Matricule;
           userToEdit.Role = updatedUser.Role ?? userToEdit.Role;
            userToEdit.Type = updatedUser.Type ?? userToEdit.Type;

            _context.Users.Update(userToEdit);
            await _context.SaveChangesAsync();

            return Ok(new { Message = "Utilisateur modifié avec succès.", User = userToEdit });
        }
    }

    public class LoginRequest
    {
        public int Matricule { get; set; }
        public string Password { get; set; }
    }
}
