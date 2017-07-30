using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace APIGitHub
{
    public class User
    {
        public string name { get; set; }
        public string location { get; set; }
        public int followers { get; set; }
    }

    public class Repostory 
    {
        public string name { get; set; }
        public string description { get; set; }
        public int watchers { get; set; }

        [JsonProperty("stargazers_count")]        
        public int stargazers { get; set; }
    }

    public class GithubResult
    {
        public User user { get; set; }
        public IEnumerable<Repostory> repo { get; set; }

    }
}