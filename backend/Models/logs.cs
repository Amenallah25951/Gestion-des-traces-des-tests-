using System;
using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class logs
    {
        [Key] 
        public int logId { get; set; }
        public int matricule { get; set; }
        public string log { get; set; }
        public DateTime date { get; set; }
    }
}
