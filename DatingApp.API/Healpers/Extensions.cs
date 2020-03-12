using System;
using Microsoft.AspNetCore.Http;

namespace DatingApp.API.Healpers
{
    public static class Extensions
    {
       public static void AddApplicationError(this HttpResponse response, string message)
       {
           response.Headers.Add("Appication-Error", message);
           response.Headers.Add("Access-Control-Expose-Headers", "Application-Error");
           response.Headers.Add("Access-control-Allow-origin","*");
       } 

       public static int CalculateAge(this DateTime theDateTime)
       {
           var age = DateTime.Today.Year - theDateTime.Year;
           if (theDateTime.AddYears(age) > DateTime.Today)
           {
               age--;
           }

           return age;
       }
    }
}