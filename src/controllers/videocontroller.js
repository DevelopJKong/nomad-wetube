export const trending = (req, res) => {
  const videos= [{
    title: "Frist Videos",
    rating: 5,
    comments: 2,
    createdAt: "2 minutes ago",
    views: 59,
    id:1,
  },
  {
    title: "Second Videos",
    rating: 5,
    comments: 2,
    createdAt: "2 minutes ago",
    views: 59,
    id:1,
  },
  {
    title: "Third Videos",
    rating: 5,
    comments: 2,
    createdAt: "2 minutes ago",
    views: 59,
    id:1,
  }

];
 return res.render("home",{pageTitle: "Home",videos});

}
export const see = (req, res) => res.render("watch", {pageTitle: "Watch"});
export const edit = (req, res) => res.render("edit",{pageTitle: "Edit"});
export const search = (req, res) => res.send("search");
export const upload = (req, res) => res.send("Upload");
export const deleteVideo = (req, res) => {
  console.log(req.params);
  return res.send("Delete Videos");
};
