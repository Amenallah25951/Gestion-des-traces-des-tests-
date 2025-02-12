namespace backend.Models
{
    public class tabletraces
    {
        public int Id { get; set; }
        public string numserie	 { get; set; }
        public string operation { get; set; }
        public string trace { get; set; }
        public DateTime date_debut { get; set; }
        public DateTime date_fin { get; set; }
   
    }
}
