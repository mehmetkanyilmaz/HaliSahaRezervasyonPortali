using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace HaliSahaRezervasyonPortali.Models
{
    public class userModel
    {
        [JsonProperty("_id")]
        [Display(Name = "Kullanıcı Id")]
        public string _id { get; set; }

        [JsonProperty("nameAndSurname")]
        [Display(Name = "Kullanıcı Adı ve Soyadı")]
        [Required(ErrorMessage ="Boş bırakılamaz")]
        public string nameAndSurname { get; set; }

        [JsonProperty("mailAdress")]
        [Display(Name = "Mail Adresi")]
        [DataType(DataType.EmailAddress, ErrorMessage = "Uygun formatta değil")]
        [Required(ErrorMessage = "Boş bırakılamaz")]
        public string mailAdress { get; set; }

        [JsonProperty("password")]
        [Display(Name = "Şifre")]
        [MinLength(6, ErrorMessage = "En az 6 haneli olmalı")]
        [Required(ErrorMessage = "Boş bırakılamaz")]
        public string password { get; set; }

        [JsonProperty("phoneNumber")]
        [Display(Name = "Telefon")]
        [MinLength(10, ErrorMessage = "10 haneli olmalı")]
        [MaxLength(10, ErrorMessage = "10 haneli olmalı")]
        [Required(ErrorMessage = "Boş bırakılamaz")]
        public string phoneNumber { get; set; }

        [JsonProperty("role")]
        [Display(Name = "Rol")]
        public string role { get; set; }
    }
}