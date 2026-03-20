using Microsoft.AspNetCore.Mvc;
using Mission11_Harris.Data;
using Mission11_Harris.Models;

namespace Mission11_Harris.Controllers;

[Route("api/[controller]")]
[ApiController]
public class BooksController : ControllerBase
{
    private readonly BookstoreContext _context;

    public BooksController(BookstoreContext context)
    {
        _context = context;
    }

    [HttpGet]
    public IActionResult GetBooks(int pageSize = 5, int pageNum = 1, string sortBy = "")
    {
        var query = _context.Books.AsQueryable();

        if (sortBy.Equals("title", StringComparison.OrdinalIgnoreCase))
        {
            query = query.OrderBy(b => b.Title);
        }

        var totalItems = _context.Books.Count();
        var books = query
            .Skip((pageNum - 1) * pageSize)
            .Take(pageSize)
            .ToList();

        var result = new
        {
            Books = books,
            TotalItems = totalItems,
            TotalPages = (int)Math.Ceiling((double)totalItems / pageSize),
            CurrentPage = pageNum,
            PageSize = pageSize
        };

        return Ok(result);
    }
}
