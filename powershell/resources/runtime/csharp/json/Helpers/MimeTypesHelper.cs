using System;
using System.Collections.Generic;
namespace Microsoft.Graph.PowerShell.MimeTypes.Helpers
{
    /// <summary>
    /// Helps with Mime Types
    /// </summary>
    public static class MimeTypesHelper
    {
        /// <summary>
        /// Returns the content type based on the given file extension.
        /// <see cref="https://www.iana.org/assignments/media-types/media-types.xhtml"/>
        /// </summary>
        public static string GetContentType(string fileExtension)
        {
            var mimeTypes = new Dictionary<String, String>
            {
                {".bmp", "image/bmp"},
                {".gif", "image/gif"},
                {".jpeg", "image/jpeg"},
                {".jpg", "image/jpeg"},
                {".png", "image/png"},
                {".tif", "image/tiff"},
                {".tiff", "image/tiff"},
                {".doc", "application/msword"},
                {".docx", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"},
                {".pdf", "application/pdf"},
                {".ppt", "application/vnd.ms-powerpoint"},
                {".pptx", "application/vnd.openxmlformats-officedocument.presentationml.presentation"},
                {".xlsx", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"},
                {".xls", "application/vnd.ms-excel"},
                {".ico", "image/vnd.microsoft.icon"}
                {".csv", "text/csv"},
                {".xml", "text/xml"},
                {".txt", "text/plain"},
                {".zip", "application/zip"},
                {".rar", "application/x-rar-compressed"},
                {".7z", "application/x-7z-compressed"},
                {".gz", "application/gzip"},
                {".tar", "application/x-tar"},
                {".webp", "image/webp"},
                {".svg", "image/svg+xml"},
                {".json", "application/json"},
                {".html", "text/html"},
                {".htm", "text/html"},
                {".css", "text/css"},
                {".js", "application/javascript"}
            };

            // if the file type is not recognized, return default"application/octet-stream"
            return mimeTypes.ContainsKey(fileExtension) ? mimeTypes[fileExtension] : "application/octet-stream";
        }
    }
}