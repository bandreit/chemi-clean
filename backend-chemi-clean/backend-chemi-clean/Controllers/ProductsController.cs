using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend_chemi_clean.Database;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace backend_chemi_clean.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly IProductRepository _productRepository;  
        
        public ProductsController(IProductRepository productRepository) {  
            _productRepository = productRepository;  
        }  

        [HttpGet]
        public IActionResult GetAllProducts(int page)
        {
            return Ok(_productRepository.GetAllProducts(page));
        }
        
        [HttpPost]
        [Route("upload/{id:int}")]
        public IActionResult UploadDocument(int id)
        {
            return Ok(_productRepository.UploadDocument(id));
        }
        
        [HttpPost]
        [Route("upload-all")]
        public IActionResult UploadAllDocuments()
        {
            return Ok(_productRepository.UploadAllDocuments());
        }
    }
}