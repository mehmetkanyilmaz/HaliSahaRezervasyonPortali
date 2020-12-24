using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace HaliSahaRezervasyonPortali.Models
{
    public class matchTimeModel
    {
        [Display(Name = "ID")]
        [JsonProperty("_id")]
        public string _id { get; set; }

        [Display(Name = "Başlangıç Saati")]
        [JsonProperty("startTime")]
        public string startTime { get; set; }

        [Display(Name = "Bitiş Saati")]
        [JsonProperty("stopTime")]
        public string stopTime { get; set; }

        [Display(Name = "Maç Ücreti")]
        [JsonProperty("matchPrice")]
        public double matchPrice { get; set; }
        
        [Display(Name = "Servis Ücreti")]
        [JsonProperty("servicePrice")]
        public double servicePrice { get; set; }

        [Display(Name = "Durum")]
        [JsonProperty("status")]
        public Boolean status { get; set; }        
    }
}