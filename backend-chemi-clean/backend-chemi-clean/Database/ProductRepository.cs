using System;
using System.Collections.Generic;
using System.Linq;
using backend_chemi_clean.Data;

namespace backend_chemi_clean.Database
{
    public class ProductRepository : IProductRepository
    {
        private readonly AppDbContext _appDbContext;

        public ProductRepository(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public IEnumerable<JoinedProduct> GetAllProducts(int page)
        {
            var products = (from product in _appDbContext.tblProduct
                join file in _appDbContext.TblProductFile
                    on product.ID equals file.ProductID
                select new
                {
                    id = product.ID,
                    productName = product.ProductName,
                    supplierName = product.SupplierName,
                    blob = file.Blob,
                    type = file.Type,
                    updateTimestamp = file.UpdateTimestamp
                }).ToList().Skip((page-1) * 20).Take(50);

            List<JoinedProduct> joinedProducts = new List<JoinedProduct>();

            foreach (var product in products)
            {
                joinedProducts.Add(new JoinedProduct()
                {
                    ID = product.id, ProductName = product.productName, SupplierName = product.supplierName,
                    Blob = product.blob, Type = product.type, UpdateTimestamp = product.updateTimestamp
                });
            }

            return joinedProducts;
        }

        public byte[] GetProductDocument(int id)
        {
            string url = _appDbContext.tblProduct.ToList().Find(product => product.ID == id).Url;
            byte[] result = null;
            using (var client = new System.Net.WebClient())
            {
                try
                {
                    result = client.DownloadData(url);
                }
                catch (Exception e)
                {
                }

                return result;
            }
        }

        public byte[] UploadDocument(int id)
        {
            Product product = _appDbContext.tblProduct.ToList().Find(product => product.ID == id);
            int productId = product.ID;
            string url = product.Url;
            tblProductFile productFile = new tblProductFile();
            productFile.ProductID = productId;
            using (var client = new System.Net.WebClient())
            {
                productFile.Blob = client.DownloadData(url);
                _appDbContext.TblProductFile.Add(productFile);
                _appDbContext.SaveChanges();
            }

            return productFile.Blob;
        }

        public int UploadAllDocuments()
        {
            using (var client = new System.Net.WebClient())
            {
                IList<Product> products = _appDbContext.tblProduct.ToList();

                foreach (var product in products)
                {
                    int productId = product.ID;
                    string url = product.Url;
                    tblProductFile productFile = new tblProductFile();
                    productFile.ProductID = productId;
                    try
                    {
                        productFile.Blob = client.DownloadData(url);
                        productFile.Type = client.ResponseHeaders["Content-Type"];
                        Console.Out.WriteLine(productFile.Type);
                    }
                    catch (Exception e)
                    {
                        productFile.Blob = null;
                    }

                    _appDbContext.TblProductFile.Add(productFile);
                    _appDbContext.SaveChanges();
                }

                return 1;
            }
        }
    }
}