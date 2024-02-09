using System.Collections.Generic;
namespace Microsoft.Graph.PowerShell.ResponseHeaders
{
    public class ResponseHeader
    {
        public List<ResponseHeaderProperties> ResponseHeaders { get; set; }

    }

    public class ResponseHeaderProperties
    {
        public string Date { get; set; }
        public string request_id { get; set; }
        public string client_request_id { get; set; }
        public string x_ms_ags_diagnostic { get; set; }
        public string Strict_Transport_Security { get; set; }
        public string Cache_Control { get; set; }
        public string Pragma { get; set; }
        public string OData_Version { get; set; }
        public string Vary { get; set; }
        public string Location { get; set; }
        public string x_ms_resource_unit { get; set; }
        public string Content_Type { get; set; }
        public string Content_Location { get; set; }
        public string Content_Length { get; set; }
    }
}
