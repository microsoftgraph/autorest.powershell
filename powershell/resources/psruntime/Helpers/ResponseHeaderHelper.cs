using System.Net.Http;
using System.Collections.Generic;

namespace Microsoft.Graph.PowerShell.ResponseHeader.Helper
{
    public static class ResponseHeaderHelper
    {

        public static Microsoft.Graph.PowerShell.ResponseHeaders.ResponseHeader ToResponseHeader(HttpResponseMessage response)

        {
            var responseHeaders = response.Headers.GetEnumerator();
            var props = new Microsoft.Graph.PowerShell.ResponseHeaders.ResponseHeaderProperties();
            var headers = new List<Microsoft.Graph.PowerShell.ResponseHeaders.ResponseHeaderProperties>();
            while (responseHeaders.MoveNext())
            {
                var header = responseHeaders.Current;
                var propName = header.Key.Replace("-", "_");
                var propValue = string.Join(",", header.Value);
                if (props.GetType().GetProperty(propName) != null)
                {
                    props.GetType().GetProperty(propName).SetValue(props, propValue);

                }
            }

            headers.Add(props);

            return new Microsoft.Graph.PowerShell.ResponseHeaders.ResponseHeader { ResponseHeaders = headers };
        }
    }
}