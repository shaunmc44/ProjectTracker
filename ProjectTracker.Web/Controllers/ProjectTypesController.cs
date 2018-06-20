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

namespace ProjectTracker.Web.Controllers
{
    public class ProjectTypesController : ODataController
    {
        private ProjectTrackerEntities db = new ProjectTrackerEntities();

        // GET: odata/ProjectTypes
        [EnableQuery]
        public IQueryable<ProjectType> GetProjectTypes()
        {
            return db.ProjectTypes;
        }

        // GET: odata/ProjectTypes(5)
        [EnableQuery]
        public SingleResult<ProjectType> GetProjectType([FromODataUri] int key)
        {
            return SingleResult.Create(db.ProjectTypes.Where(projectType => projectType.ProjectTypeId == key));
        }

        // PUT: odata/ProjectTypes(5)
        public IHttpActionResult Put([FromODataUri] int key, Delta<ProjectType> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            ProjectType projectType = db.ProjectTypes.Find(key);
            if (projectType == null)
            {
                return NotFound();
            }

            patch.Put(projectType);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProjectTypeExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(projectType);
        }

        // POST: odata/ProjectTypes
        public IHttpActionResult Post(ProjectType projectType)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.ProjectTypes.Add(projectType);
            db.SaveChanges();

            return Created(projectType);
        }

        // PATCH: odata/ProjectTypes(5)
        [AcceptVerbs("PATCH", "MERGE")]
        public IHttpActionResult Patch([FromODataUri] int key, Delta<ProjectType> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            ProjectType projectType = db.ProjectTypes.Find(key);
            if (projectType == null)
            {
                return NotFound();
            }

            patch.Patch(projectType);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProjectTypeExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(projectType);
        }

        // DELETE: odata/ProjectTypes(5)
        public IHttpActionResult Delete([FromODataUri] int key)
        {
            ProjectType projectType = db.ProjectTypes.Find(key);
            if (projectType == null)
            {
                return NotFound();
            }

            db.ProjectTypes.Remove(projectType);
            db.SaveChanges();

            return StatusCode(HttpStatusCode.NoContent);
        }

        // GET: odata/ProjectTypes(5)/Projects
        [EnableQuery]
        public IQueryable<Project> GetProjects([FromODataUri] int key)
        {
            return db.ProjectTypes.Where(m => m.ProjectTypeId == key).SelectMany(m => m.Projects);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ProjectTypeExists(int key)
        {
            return db.ProjectTypes.Count(e => e.ProjectTypeId == key) > 0;
        }
    }
}
