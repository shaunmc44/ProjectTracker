using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.ModelBinding;
using System.Web.Http.OData;
using System.Web.Http.OData.Routing;
using ProjectTracker.Model;
using System.Web.Http.Cors;

namespace ProjectTracker.Services.Controllers
{
    
    public class ProjectStatusesController : ODataController
    {
        private ProjectTrackerEntities db = new ProjectTrackerEntities();

        // GET: odata/ProjectStatuses
        [EnableQuery]
        public IQueryable<ProjectStatus> GetProjectStatuses()
        {
            return db.ProjectStatuses;
        }

        // GET: odata/ProjectStatuses(5)
        [EnableQuery]
        public SingleResult<ProjectStatus> GetProjectStatus([FromODataUri] int key)
        {
            return SingleResult.Create(db.ProjectStatuses.Where(projectStatus => projectStatus.ProjectStatusId == key));
        }

        // PUT: odata/ProjectStatuses(5)
        public IHttpActionResult Put([FromODataUri] int key, Delta<ProjectStatus> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            ProjectStatus projectStatus = db.ProjectStatuses.Find(key);
            if (projectStatus == null)
            {
                return NotFound();
            }

            patch.Put(projectStatus);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProjectStatusExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(projectStatus);
        }

        // POST: odata/ProjectStatuses
        public IHttpActionResult Post(ProjectStatus projectStatus)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.ProjectStatuses.Add(projectStatus);
            db.SaveChanges();

            return Created(projectStatus);
        }

        // PATCH: odata/ProjectStatuses(5)
        [AcceptVerbs("PATCH", "MERGE")]
        public IHttpActionResult Patch([FromODataUri] int key, Delta<ProjectStatus> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            ProjectStatus projectStatus = db.ProjectStatuses.Find(key);
            if (projectStatus == null)
            {
                return NotFound();
            }

            patch.Patch(projectStatus);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProjectStatusExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(projectStatus);
        }

        // DELETE: odata/ProjectStatuses(5)
        public IHttpActionResult Delete([FromODataUri] int key)
        {
            ProjectStatus projectStatus = db.ProjectStatuses.Find(key);
            if (projectStatus == null)
            {
                return NotFound();
            }

            db.ProjectStatuses.Remove(projectStatus);
            db.SaveChanges();

            return StatusCode(HttpStatusCode.NoContent);
        }

        // GET: odata/ProjectStatuses(5)/Projects
        [EnableQuery]
        public IQueryable<Project> GetProjects([FromODataUri] int key)
        {
            return db.ProjectStatuses.Where(m => m.ProjectStatusId == key).SelectMany(m => m.Projects);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ProjectStatusExists(int key)
        {
            return db.ProjectStatuses.Count(e => e.ProjectStatusId == key) > 0;
        }
    }
}
