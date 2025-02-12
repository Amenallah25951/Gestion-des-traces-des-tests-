using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OfficeOpenXml;
using backend.Data;
using backend.Models;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TracesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TracesController(AppDbContext context)
        {
            _context = context;
        }

[HttpPost("upload")]
public async Task<IActionResult> UploadExcel(IFormFile file)
{
    if (file == null || file.Length == 0)
        return BadRequest("Aucun fichier n'a été téléchargé.");

    try
    {
        using (var stream = new MemoryStream())
        {
            await file.CopyToAsync(stream);

            using (var package = new ExcelPackage(stream))
            {
                var worksheet = package.Workbook.Worksheets[0];
                var rowCount = worksheet.Dimension.Rows;

                for (int row = 2; row <= rowCount; row++)
                {
                    var numserie = worksheet.Cells[row, 1].Text;
                    var operation = worksheet.Cells[row, 2].Text;
                    var trace = worksheet.Cells[row, 3].Text;
                    var dateDebut = DateTime.Parse(worksheet.Cells[row, 4].Text);
                    var dateFin = DateTime.Parse(worksheet.Cells[row, 5].Text);

                    // Recherche de la trace existante
                    var existingTrace = await _context.tabletraces
                        .FirstOrDefaultAsync(t => t.numserie == numserie && t.operation == operation);

                    if (existingTrace != null)
                    {
                        // Mise à jour des données
                        existingTrace.trace = trace;
                        existingTrace.date_debut = dateDebut;
                        existingTrace.date_fin = dateFin;
                        _context.tabletraces.Update(existingTrace);
                    }
                    else
                    {
                        // Si la trace n'existe pas, création d'une nouvelle entrée
                        var newTrace = new tabletraces
                        {
                            numserie = numserie,
                            operation = operation,
                            trace = trace,
                            date_debut = dateDebut,
                            date_fin = dateFin
                        };
                        _context.tabletraces.Add(newTrace);
                    }
                }

                // Enregistrer toutes les modifications
                await _context.SaveChangesAsync();
                return Ok(new { message = "Données enregistrées ou mises à jour avec succès." });
            }
        }
    }
    catch (Exception ex)
    {
        return StatusCode(500, new { message = "Erreur lors de l'enregistrement des données", error = ex.Message });
    }
}

        [HttpGet("getAllTraces")]
        public async Task<IActionResult> GetAllTraces()
        {
            var traces = await _context.tabletraces.ToListAsync();
            return Ok(traces);
        }

[HttpGet("search")]
public async Task<IActionResult> SearchTraces(
    [FromQuery] string? numserie, 
    [FromQuery] string? operation, 
    [FromQuery] DateTime? dateDebut, 
    [FromQuery] DateTime? dateFin)
{
    var query = _context.tabletraces.AsQueryable();

    if (!string.IsNullOrEmpty(numserie))
        query = query.Where(t => t.numserie.Contains(numserie));

    if (!string.IsNullOrEmpty(operation))
        query = query.Where(t => t.operation.Contains(operation));

    if (dateDebut.HasValue && dateFin.HasValue)
    {
        query = query.Where(t => t.date_debut == dateDebut && t.date_fin == dateFin);
    }
//    if (!dateDebut.HasValue)
//     {
//         query = query.Where(t => t.date_debut == dateDebut);
//     }
//     if (!dateFin.HasValue)
//     {
//         query = query.Where(t => t.date_fin == dateFin);
//     }

    var results = await query.ToListAsync();
    return Ok(results);
}
    }
}
