using backend_chemi_clean.Database;
using Microsoft.AspNetCore.Mvc;

namespace backend_chemi_clean.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DownloadController : ControllerBase
    {
        private readonly IProductRepository _productRepository;  
        
        public DownloadController(IProductRepository productRepository) {  
            _productRepository = productRepository;  
        }  

        [HttpGet]
        [Route("{id:int}")]
        public IActionResult GetProductFile([FromRoute] int id)
        {
            return Ok(_productRepository.GetProductDocument(id));
        }
    }
}