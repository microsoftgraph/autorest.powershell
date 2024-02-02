using System.Net.Http;
using System.Collections.Generic;
using Microsoft.Graph.PowerShell.ResponseHeaders;

namespace Microsoft.Graph.PowerShell.ResponseHeader.Helper
{
    public static class ResponseHeaderHelper
    {

        public static ResponseHeader ToResponseHeader(HttpResponseMessage response)

        {
            var responseHeaders = response.Headers.GetEnumerator();
            ResponseHeaderProperties props = new ResponseHeaderProperties();
            var headers = new List<ResponseHeaderProperties>();
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

            return new ResponseHeader { ResponseHeaders = headers };
        }
    }
}