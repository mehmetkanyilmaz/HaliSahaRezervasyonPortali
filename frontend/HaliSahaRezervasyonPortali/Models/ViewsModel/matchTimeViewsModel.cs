using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HaliSahaRezervasyonPortali.Models.ViewsModel
{
    public class matchTimeViewsModel
    {
        public IEnumerable<matchTimeModel> matchTimes { get; set; }
        public IEnumerable<matchModel> match { get; set; }
    }
}