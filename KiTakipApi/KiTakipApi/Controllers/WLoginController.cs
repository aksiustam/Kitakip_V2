using KiTakipApi.Data;
using KiTakipApi.Models;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using KiTakipApi.Models.Login;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using Azure.Core;

namespace KiTakipApi.Controllers
{
    public class WLoginController : Controller
    {
        private readonly DataContext _context;

        public WLoginController(DataContext context)
        {
            _context = context;
        }


        [HttpPost]
        public async  Task<IActionResult> WLogin(WAdminLogin login)
        {

            var admin = await _context.AdminUsers.FirstOrDefaultAsync(p => p.Email == login.Email);
            if (admin == null)
            {
                return NotFound();
            }

            if (!VerifyPasswordHash(login.Password, admin.PassHash, admin.PassSalt))
            {
                return BadRequest("Wrong password.");
            }

            List<Claim> claims = new List<Claim>()
            {
                new Claim(ClaimTypes.Sid, admin.Id.ToString()),
                new Claim(ClaimTypes.Name, "Admin"),
                new Claim(ClaimTypes.Email, admin.Email),
                new Claim(ClaimTypes.Role, "Admin"),
            
            };

            ClaimsIdentity claimsIdentity = new ClaimsIdentity(claims,
                CookieAuthenticationDefaults.AuthenticationScheme);

            AuthenticationProperties properties = new AuthenticationProperties()
            {
                AllowRefresh = true,
                IsPersistent = login.KeepLoggedIn
            };

            await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme,
                new ClaimsPrincipal(claimsIdentity), properties);

            return RedirectToAction("Index", "Home");
        }

        //Login 
        public ActionResult WLogin()
        {
            ClaimsPrincipal claimsUser = HttpContext.User;

            if (claimsUser.Identity.IsAuthenticated)
                return RedirectToAction("Index", "Home");
            
            return View();
        }
        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512(passwordSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                return computedHash.SequenceEqual(passwordHash);
            }
        }
    }
}
