using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;

namespace APIGitHub.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult searchGitHub(string name)
        {
            using(var client = new WebClient())
            {
                client.Headers["User-Agent"] = "Nice job agin";
                string mainInfo = client.DownloadString($"https://api.github.com/users/{name}");
                client.Headers["User-Agent"] = "Nice Job agin";
                string repos = client.DownloadString($"https://api.github.com/users/{name}/repos");
                var result = new GithubResult();
                result.user = JsonConvert.DeserializeObject<User>(mainInfo);
                result.repo = JsonConvert.DeserializeObject<IEnumerable<Repostory>>(repos);
                return Json(result, JsonRequestBehavior.AllowGet);
            }
        }
    }
}