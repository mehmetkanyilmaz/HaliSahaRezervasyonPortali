using Newtonsoft.Json;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HaliSahaRezervasyonPortali.Models.ViewsModel
{
    public class matchUserViewModel
    {
        [JsonProperty("_id")]
        public string _id { get; set; }

        [JsonProperty("service")]
        public bool service { get; set; }

        [JsonProperty("userId")]
        public userModel user { get; set; }

        [JsonProperty("matchDate")]
        public string matchDate { get; set; }

        [JsonProperty("matchStart")]
        public string matchStart { get; set; }

        [JsonProperty("matchStop")]
        public string matchStop { get; set; }

        [JsonProperty("stadiumId")]
        public stadiumModel stad { get; set; }

        [JsonProperty("note")]
        public string note { get; set; }

        [JsonProperty("totalPrice")]
        public double totalPrice { get; set; }
        public IEnumerator GetEnumerator()
        {
            return null;
        }
    }
    
}