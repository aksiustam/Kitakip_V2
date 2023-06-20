using AutoMapper;
using Azure.Core;
using KiTakipApi.Dto;
using KiTakipApi.Dto.Web;
using KiTakipApi.Interfaces;
using KiTakipApi.Models;
using KiTakipApi.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;

namespace KiTakipApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        private readonly IConfiguration _configuration;
        public UserController(IConfiguration configuration, IUserRepository userRepository, IMapper mapper)
        {
            _configuration = configuration;
            _userRepository = userRepository;
            _mapper = mapper;
        }

        [HttpPost("Login")]
        public IActionResult Login(LoginDto request)
        {

            if(request == null && request.Email == "")
            {
                request.Email = HttpContext.Request.Form["email"];
                request.Pass = HttpContext.Request.Form["pass"];
            }

            
            var user = _userRepository.GetUserByEmail(request.Email);

            if (user == null)
            {
                return BadRequest("User not found.");
            }

            if (!VerifyPasswordHash(request.Pass, user.PassHash, user.PassSalt))
            {
                return BadRequest("Wrong password.");
            }

            var mapeduser = _mapper.Map<UserDto>(user);
            string token = CreateToken(mapeduser);

            var refreshToken = GenerateRefreshToken();
            SetRefreshToken(refreshToken , user);

            var userToken = new UserTokenDto
            { 
                Id = user.Id,
                Name = user.Name,
                Email = user.Email,
                Token = token
            };
            
            return Ok(userToken);
        }


        [HttpGet]
        [Authorize(Roles = "Admin")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<User>))]
        public IActionResult GetUsers()
        {
            var users = _mapper.Map<List<UserDto>>(_userRepository.GetUsers());

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(users);
        }


        [HttpGet("{userId}")]
        [Authorize(Roles = "Admin")]
        [ProducesResponseType(200, Type = typeof(User))]
        [ProducesResponseType(400)]
        public IActionResult GetUser(int userId)
        {
            if (!_userRepository.UserExists(userId))
                return NotFound();

            var user = _mapper.Map<UserDto>(_userRepository.GetUser(userId));

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(user);
        }

        [HttpPost]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public IActionResult CreateUser([FromBody] UserDto createUser)
        {
            
            if (createUser == null)
                return BadRequest(ModelState);

            var exist = _userRepository.GetUsers()
                .Where(p => p.Email.Trim().ToUpper() == createUser.Email.TrimEnd().ToUpper())
                .FirstOrDefault();

            if (exist != null)
            {
                return BadRequest("User already exists.");
            }

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var userMap = _mapper.Map<User>(createUser);

            CreatePasswordHash(createUser.Pass, out byte[] passwordHash, out byte[] passwordSalt);
            
            userMap.PassHash = passwordHash;
            userMap.PassSalt = passwordSalt;

            if (!_userRepository.CreateUser(userMap))
            {
                ModelState.AddModelError("", "Something went wrong while saving");
                return StatusCode(500, ModelState);
            }

            return Ok("Successfully created");
        }



        [HttpPut("{userId}")]
        [Authorize]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public IActionResult UpdateUser(int userId, [FromBody] UserDto updatedUser)
        {
            if (updatedUser == null)
                return BadRequest(ModelState);

            if (userId != updatedUser.Id)
                return BadRequest(ModelState);

            if (!_userRepository.UserExists(userId))
                return NotFound();

            if (!ModelState.IsValid)
                return BadRequest();

            var userMap = _mapper.Map<User>(updatedUser);

            if (!_userRepository.UpdateUser(userMap))
            {
                ModelState.AddModelError("", "Something went wrong updating Book");
                return StatusCode(500, ModelState);
            }

            return NoContent();
        }

        [HttpDelete("{userId}")]
        [Authorize(Roles = "Admin")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public IActionResult DeleteUser(int userId)
        {
            if (!_userRepository.UserExists(userId))
            {
                return NotFound();
            }

            var userToDelete = _userRepository.GetUser(userId);

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (!_userRepository.DeleteUser(userToDelete))
            {
                ModelState.AddModelError("", "Something went wrong deleting category");
            }

            return NoContent();
        }


        private void SetRefreshToken(RefreshTokenDto newRefreshToken,User user)
        {
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Expires = newRefreshToken.Expires
            };
            Response.Cookies.Append("refreshToken", newRefreshToken.Token, cookieOptions);

            
            user.RefreshToken = newRefreshToken.Token;
            user.TokenCreated = newRefreshToken.Created;
            user.TokenExpires = newRefreshToken.Expires;
            _userRepository.UpdateUser(user);
        }

        private RefreshTokenDto GenerateRefreshToken()
        {
            var refreshToken = new RefreshTokenDto
            {
                Token = Convert.ToBase64String(RandomNumberGenerator.GetBytes(64)),
                Expires = DateTime.Now.AddDays(7),
                Created = DateTime.Now
            };

            return refreshToken;
        }

        private string CreateToken(UserDto user)
        {
            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.Sid, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.Name),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Role, "User")
            };

            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(
                _configuration.GetSection("AppSettings:Token").Value));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddDays(7),
                signingCredentials: creds);

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return jwt;
        }
        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
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
