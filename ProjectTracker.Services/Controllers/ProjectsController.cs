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
    
    public class ProjectsController : ODataController
    {
        private ProjectTrackerEntities db = new ProjectTrackerEntities();

        // GET: odata/Projects
        [EnableQuery]
        public IQueryable<Project> GetProjects()
        {
            IQueryable<Project> p = null;
            p = db.Projects;
            return p;
        }

        // GET: odata/Projects(5)
        [EnableQuery]
        public SingleResult<Project> GetProject([FromODataUri] int key)
        {
            return SingleResult.Create(db.Projects.Where(project => project.ProjectId == key));
        }

        // PUT: odata/Projects(5)
        [AcceptVerbs("PUT")]
        public IHttpActionResult Put([FromODataUri] int key, Project update)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (key != update.ProjectId)
            {
                return BadRequest();
            }
            db.Entry(update).State = EntityState.Modified;
            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProjectExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            return Updated(update);
        }

        // POST: odata/Projects
        [AcceptVerbs("POST")]
        public IHttpActionResult Post(Project project)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Projects.Add(project);
            db.SaveChanges();

            return Created(project);
        }

        // PATCH: odata/Projects(5)
        [AcceptVerbs("PATCH", "MERGE")]
        public IHttpActionResult Patch([FromODataUri] int key, Delta<Project> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Project project = db.Projects.Find(key);
            if (project == null)
            {
                return NotFound();
            }

            patch.Patch(project);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProjectExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(project);
        }

        // DELETE: odata/Projects(5)
        public IHttpActionResult Delete([FromODataUri] int key)
        {
            Project project = db.Projects.Find(key);
            if (project == null)
            {
                return NotFound();
            }

            db.Projects.Remove(project);
            db.SaveChanges();

            return StatusCode(HttpStatusCode.NoContent);
        }

        // GET: odata/Projects(5)/ProjectPhase
        [EnableQuery]
        public SingleResult<ProjectPhase> GetProjectPhase([FromODataUri] int key)
        {
            return SingleResult.Create(db.Projects.Where(m => m.ProjectId == key).Select(m => m.ProjectPhase));
        }

        // GET: odata/Projects(5)/ProjectStatu
        [EnableQuery]
        public SingleResult<ProjectStatus> GetProjectStatus([FromODataUri] int key)
        {
            return SingleResult.Create(db.Projects.Where(m => m.ProjectId == key).Select(m => m.ProjectStatus));
        }

        // GET: odata/Projects(5)/ProjectType
        [EnableQuery]
        public SingleResult<ProjectType> GetProjectType([FromODataUri] int key)
        {
            return SingleResult.Create(db.Projects.Where(m => m.ProjectId == key).Select(m => m.ProjectType));
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ProjectExists(int key)
        {
            return db.Projects.Count(e => e.ProjectId == key) > 0;
        }
    }
}
