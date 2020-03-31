using Microsoft.AspNetCore.Identity;
using System;

namespace DatingApp.API.Dtos
{
    public class UserForListDto : IdentityUser<int>
    {
        public string Gender { get; set; }
        public int Age { get; set; }
        public string KnownAs { get; set; }
        public DateTime Created { get; set; }
        public DateTime LastActive { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public string PhotoUrl { get; set; }
    }
}