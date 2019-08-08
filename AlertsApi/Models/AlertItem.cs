using System;

namespace AlertsApi.Models
{
    public class AlertItem
    {
        public long Id { get; set; }
        public string System { get; set; }
        public string Group { get; set; }
        public string SourceId { get; set; }
        public string Level { get; set; }
        public string Message { get; set; }
        public string Detail { get; set; }
        public string TimeStamp { get; set; }
        public Location Location { get; set; }
    }
}
