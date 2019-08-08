using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AlertsApi.Models
{
    public class Location
    {
        public long id { get; set; }
        public string wkid { get; set; }
        public double x { get; set; }
        public double y { get; set; }
    }
}
