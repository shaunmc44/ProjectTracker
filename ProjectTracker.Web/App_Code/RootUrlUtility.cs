using System;
using System.Configuration;
using System.Web;

namespace ProjectTracker.Web.Utilities
{
    /// <summary>
    /// Root URL Utility
    /// </summary>
    /// <remarks>
    /// This utility is used to resolve the root URL of the web application.
    /// The root URL of the application is placed in a JavaScript variable in
    /// the shared layout where it can then be used by all of the JavaScript
    /// data access classes as a means of creating an absolute URL for the
    /// controllers.  This was done because using relative paths in the data
    /// access classes had mixed results depending on the environment in which
    /// the scripts were being run.  This fixes that issue.
    /// </remarks>
    public static class RootUrlUtility
    {
        private static String _RootURL = null;

        /// <summary>
        /// Get Root URL
        /// </summary>
        /// <returns></returns>
        public static String GetRootURL()
        {
            //if (String.IsNullOrEmpty(_RootURL))
            //{
            /* Getting the current context of HTTP request. */
            var context = HttpContext.Current;
            if (context != null)
            {
                var scheme = ConfigurationManager.AppSettings["Scheme"];
                var port = String.Empty;
                if (context.Request.Url.Port != 80 && context.Request.Url.Port != 443)
                    port = ":" + context.Request.Url.Port.ToString();

                /* Formatting the fully qualified website url/name. */
                _RootURL = String.Format
                (
                    "{0}://{1}{2}{3}",
                    scheme,
                    context.Request.Url.Host,
                    port,
                    context.Request.ApplicationPath
                );
            }

            if (_RootURL.EndsWith("/")) _RootURL = _RootURL.Substring(0, _RootURL.Length - 1);
            //}

            return _RootURL;
        }
    }
}