using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace HaliSahaRezervasyonPortali.Models
{
    public class matchModel
    {
        [JsonProperty("_id")]
        public string _id { get; set; }

        [JsonProperty("userId")]
        public string userId { get; set; }

        [JsonProperty("matchDate")]
        public string matchDate { get; set; }

        [JsonProperty("matchStart")]
        public string matchStart { get; set; }

        [JsonProperty("matchStop")]
        public string matchStop { get; set; }

        [JsonProperty("stadiumId")]
        public string stadiumId { get; set; }

        [JsonProperty("service")]
        public bool service { get; set; }

        [JsonProperty("note")]
        public string note { get; set; }

        [JsonProperty("totalPrice")]
        public double totalPrice { get; set; }
    }
}