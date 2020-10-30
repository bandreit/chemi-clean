using System.Collections;
using System.Collections.Generic;
using backend_chemi_clean.Data;

namespace backend_chemi_clean.Database
{
    public interface IProductRepository
    {
        IEnumerable<JoinedProduct> GetAllProducts();
        byte[] GetProductDocument(int id);
        byte[] UploadDocument(int id);
        int UploadAllDocuments();
    }
}