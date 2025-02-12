using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Models;
using backend.Data;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LogsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public LogsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<logs>>> GetLogs([FromQuery] int? matricule)
        {
            if (matricule.HasValue)
            {
                var logsByMatricule = await _context.logs
                    .Where(l => l.matricule == matricule.Value)
                    .ToListAsync();

                if (!logsByMatricule.Any())
                {
                    return NotFound("Aucun log trouvé pour ce matricule.");
                }

                return Ok(logsByMatricule);
            }
            
            return await _context.logs.ToListAsync();
        }

        
        [HttpPost]
        public async Task<ActionResult<logs>> AddLog([FromBody] logs logEntry)
        {
            if (logEntry == null)
            {
                return BadRequest();
            }

            _context.logs.Add(logEntry);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetLogs), new { id = logEntry.logId }, logEntry);
        }
    }
}
