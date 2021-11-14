import Video from "../models/Video";


/* Video.find({},(error,videos) => {
  if(error){
      return res.render("server-error");
  }
  return res.render("home",{pageTitle:"Home",videos})

});*/ 

//await 가 대단한 이유는 database를 기다려주기 때문이다
//async 라고 적어준이유는 안에 있는 await를 function 안에서 동작한다는것을 알려주기 위함이다
export const home = async (req, res) => { 
  
  try {
    const videos = await Video.find({});
    return res.render("home",{pageTitle: "Home",videos});
    
  } catch (error) {
    
        
  }
};
export const watch = (req, res) => {
  const { id } = req.params;

  return res.render("watch",{pageTitle:`Watching`});

};
export const getEdit = (req, res) => {
  const { id } = req.params;

  return res.render("edit",{pageTitle: `Editing`});
};

export const postEdit = (req, res) => {
  const { id } = req.params;
  const { title } = req.body; //여기서 input data를 얻을수있다

  return res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "Upload Video" });
};
export const postUpload = (req,res) => {

  const { title , description, hashtags } = req.body;
  console.log(title,description,hashtags);
  const video = new Video({
    title,
    description,
    createdAt: Date.now(),
    hashtags: "food,movies,music".split(",").map(word => `#${word}`),
    meta:     {
      views: 0,
      rating: 0,
    }
  });
  console.log(video);
  return res.redirect("/");

};