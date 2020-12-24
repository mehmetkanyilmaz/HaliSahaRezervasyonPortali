using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace HaliSahaRezervasyonPortali.Models
{
    public class stadiumModel
    {
        [Display(Name = "Stad Id")]
        [JsonProperty("_id")]
        public string _id { get; set; }

        [Display(Name = "Stad Adı")]
        [JsonProperty("stadiumName")]
        public string stadiumName { get; set; }

        [Display(Name = "Stad Durum")]
        [JsonProperty("stadStatus")]
        public Boolean stadStatus { get; set; }
    }
}