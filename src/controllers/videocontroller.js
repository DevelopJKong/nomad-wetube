let videos = [{
  title: "Frist Videos",
  rating: 5,
  comments: 2,
  createdAt: "2 minutes ago",
  views: 1,
  id:1,
},
{
  title: "Second Videos",
  rating: 5,
  comments: 2,
  createdAt: "2 minutes ago",
  views: 1,
  id:2,
},
{
  title: "Third Videos",
  rating: 5,
  comments: 2,
  createdAt: "2 minutes ago",
  views: 59,
  id:3,
},

];

export const trending = (req, res) => { 
 return res.render("home",{pageTitle: "Home",videos});
}
export const watch = (req, res) => {
  const { id } = req.params;
  const video = videos[id - 1];
  return res.render("watch",{pageTitle:`Watching: ${video.title}`,video});

};
export const getEdit = (req, res) => {
  const { id } = req.params;
  const video = videos[id - 1];
  return res.render("edit",{pageTitle: `Editing: ${video.title}`,video});
};

export const postEdit = (req, res) => {
  const { id } = req.params;
  const { title } = req.body; //여기서 input data를 얻을수있다
  videos[id - 1].title = title;
  return res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "Upload Video" });
};
export const postUpload = (req,res) => {

  const { title } = req.body;
  const newVideo = {
    title,
    rating: 0,
    comments: 0,
    createdAt: "just now",
    views: 0,
    id: videos.length +1,
  };
  videos.push(newVideo);
  console.log(videos);
  return res.redirect("/");

};