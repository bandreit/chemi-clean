using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace backend_chemi_clean.Data
{
    [Keyless]
    public class tblProductFile
    {
        public int ProductID { get; set; }
        [Column("Blob", TypeName = "BLOB")]
        [MaxLength(8000)]
        public byte[] Blob { get; set; }
        public string Type { get; set; }
        public int ID { get; set; }
        public DateTime UpdateTimestamp { get; set; }
    }
}