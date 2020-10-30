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
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly IProductRepository _productRepository;  
        
        public ProductsController(IProductRepository productRepository) {  
            _productRepository = productRepository;  
        }  

        [HttpGet]
        public IActionResult GetAllProducts()
        {
            return Ok(_productRepository.GetAllProducts());
        }
    }
}