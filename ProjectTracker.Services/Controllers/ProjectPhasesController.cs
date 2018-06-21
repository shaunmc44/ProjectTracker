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

    public class ProjectPhasesController : ODataController
    {
        private ProjectTrackerEntities db = new ProjectTrackerEntities();

        // GET: odata/ProjectPhases
        [EnableQuery]
        public IQueryable<ProjectPhase> GetProjectPhases()
        {
            return db.ProjectPhases;
        }

        // GET: odata/ProjectPhases(5)
        [EnableQuery]
        public SingleResult<ProjectPhase> GetProjectPhase([FromODataUri] int key)
        {
            return SingleResult.Create(db.ProjectPhases.Where(projectPhase => projectPhase.ProjectPhaseId == key));
        }

        // PUT: odata/ProjectPhases(5)
        public IHttpActionResult Put([FromODataUri] int key, Delta<ProjectPhase> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            ProjectPhase projectPhase = db.ProjectPhases.Find(key);
            if (projectPhase == null)
            {
                return NotFound();
            }

            patch.Put(projectPhase);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProjectPhaseExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(projectPhase);
        }

        // POST: odata/ProjectPhases
        public IHttpActionResult Post(ProjectPhase projectPhase)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.ProjectPhases.Add(projectPhase);
            db.SaveChanges();

            return Created(projectPhase);
        }

        // PATCH: odata/ProjectPhases(5)
        [AcceptVerbs("PATCH", "MERGE")]
        public IHttpActionResult Patch([FromODataUri] int key, Delta<ProjectPhase> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            ProjectPhase projectPhase = db.ProjectPhases.Find(key);
            if (projectPhase == null)
            {
                return NotFound();
            }

            patch.Patch(projectPhase);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProjectPhaseExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(projectPhase);
        }

        // DELETE: odata/ProjectPhases(5)
        public IHttpActionResult Delete([FromODataUri] int key)
        {
            ProjectPhase projectPhase = db.ProjectPhases.Find(key);
            if (projectPhase == null)
            {
                return NotFound();
            }

            db.ProjectPhases.Remove(projectPhase);
            db.SaveChanges();

            return StatusCode(HttpStatusCode.NoContent);
        }

        // GET: odata/ProjectPhases(5)/Projects
        [EnableQuery]
        public IQueryable<Project> GetProjects([FromODataUri] int key)
        {
            return db.ProjectPhases.Where(m => m.ProjectPhaseId == key).SelectMany(m => m.Projects);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ProjectPhaseExists(int key)
        {
            return db.ProjectPhases.Count(e => e.ProjectPhaseId == key) > 0;
        }
    }
}
