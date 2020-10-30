using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace backend_chemi_clean.Data
{
    [Keyless]
    public class Product
    {
        public int ID { get; set; }
        [Required] public string ProductName { get; set; }

        public string SupplierName { get; set; }

        [Required] public string Url { get; set; }

        [StringLength(50, ErrorMessage = "Username is too long.")]
        public string UserName { get; set; }

        [StringLength(50, ErrorMessage = "Password is too long.")]
        public string Password { get; set; }
    }
}