using System;
using System.Collections.Generic;
using System.Linq;
using backend_chemi_clean.Data;

namespace backend_chemi_clean.Database
{
    public class ProductRepository : IProductRepository
    {
        private readonly AppDbContext _appDbContext;  
        
        public ProductRepository(AppDbContext appDbContext) {  
            _appDbContext = appDbContext;  
        } 
        
        public IEnumerable<Product> GetAllProducts()
        {
            return _appDbContext.tblProduct.ToList();  
        }

        public byte[] GetProductDocument(int id)
        {
            string url = _appDbContext.tblProduct.ToList().Find(product => product.ID == id).Url;
            using (var client = new System.Net.WebClient())
            {
                return client.DownloadData(url);
            }
        }
    }
}