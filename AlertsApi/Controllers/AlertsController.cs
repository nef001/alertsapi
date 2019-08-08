using AlertsApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

using System;

namespace AlertsApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AlertsController : ControllerBase
    {
        private readonly AlertDbContext _dbContext;

        public AlertsController(AlertDbContext dbContext)
        {
            _dbContext = dbContext;

            if (_dbContext.AlertItems.Count() == 0)
            {
                //Adds an item to the database if the database is empty. 
                //This code is in the constructor, so it runs every time there's a new HTTP request. 
                //If you delete all items, the constructor creates it again the next time an API method is called.
                // So it may look like the deletion didn't work when it actually did work.

                // Create a new item if collection is empty,
                // which means you can't delete all items.
                _dbContext.AlertItems.Add(new AlertItem
                {
                    System = "Internal",
                    Group = "Tests",
                    SourceId = "a000",
                    Level = "Ignore",
                    Message = "Don't Panic",
                    Detail = "This is a test alert. No action required.",
                    TimeStamp = DateTime.Now.ToString(),
                    Location = new Location { wkid = "4326", x = 115.860458, y = -31.950527 },
                }); ;
                _dbContext.SaveChanges();
            }
        }

        // GET: api/Alert
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AlertItem>>> GetAlertItems()
        {
            return await _dbContext.AlertItems.ToListAsync();
        }

        // GET: api/Alert/5
        [HttpGet("{id}")]
        public async Task<ActionResult<AlertItem>> GetAlertItem(long id)
        {
            var alertItem = await _dbContext.AlertItems.FindAsync(id);

            if (alertItem == null)
            {
                return NotFound();
            }

            return alertItem;
        }

        // POST: api/Alert
        [HttpPost]
        public async Task<ActionResult<AlertItem>> PostAlertItem(AlertItem item)
        {
            _dbContext.AlertItems.Add(item);
            await _dbContext.SaveChangesAsync();

            return CreatedAtAction(nameof(GetAlertItem), new { id = item.Id }, item);
        }

        // PUT: api/Alert/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAlertItem(long id, AlertItem item)
        {
            if (id != item.Id)
            {
                return BadRequest();
            }

            _dbContext.Entry(item).State = EntityState.Modified;
            await _dbContext.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/Alert/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAlertItem(long id)
        {
            var todoItem = await _dbContext.AlertItems.FindAsync(id);

            if (todoItem == null)
            {
                return NotFound();
            }

            _dbContext.AlertItems.Remove(todoItem);
            await _dbContext.SaveChangesAsync();

            return NoContent();
        }
    }
}
