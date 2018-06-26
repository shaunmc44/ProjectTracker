using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Web.Http.OData.Builder;
using System.Web.Http.OData.Extensions;
using ProjectTracker.Model;

namespace ProjectTracker.Services
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            config.EnableCors();

            ODataConventionModelBuilder builder = new ODataConventionModelBuilder();
            builder.EntitySet<Project>("Projects");
            builder.EntitySet<ProjectPhase>("ProjectPhases"); 
            builder.EntitySet<ProjectStatus>("ProjectStatuses"); 
            builder.EntitySet<ProjectType>("ProjectTypes");
            config.Routes.MapODataServiceRoute("odata", "odata", builder.GetEdmModel());
        }
    }
}
