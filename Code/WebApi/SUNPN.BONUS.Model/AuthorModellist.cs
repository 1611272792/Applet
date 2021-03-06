﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SUNPN.BONUS.Model
{
    public class AuthorModellist
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string AuthName { get; set; }
        public string AuthId { get; set; }
        public string IsActive { get; set; }
        public List<AuthorModel> listAuthor { get; set; }
    }
    public class AuthorModel
    {
        public string AuthorId { get; set; }
        public string AuthorName { get; set; }
        public string AuthorIcons { get; set; }
        public string AuthorUrl { get; set; }
        public string AuthorContian { get; set; }
        public string UserContian { get; set; }
    }
}
