using System;

namespace backend_chemi_clean.Data
{
    public class JoinedProduct
    {
        public int ID { get; set; } 
        public string ProductName { get; set; }
        public string SupplierName { get; set; }
        public byte[] Blob { get; set; }
        public string Type { get; set; }
        public DateTime UpdateTimestamp { get; set; }
    }
}