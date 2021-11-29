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
  const videos = await Video.find({}).sort({createdAt:"desc"});
  console.log(videos);
  return res.render("home", { pageTitle: "Home", videos });
};


export const watch = async(req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
 if(!video){
   return res.render("404",{pageTitle:"Video not found."})
  }
return res.render("watch", { pageTitle: video.title ,video});
};

/*******************getEdit & postEdit 시작 부분입니다************************** */

export const getEdit = async(req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  if(!video){
    return res.status(404).render("404",{pageTitle:"Video not found."})
   }
  return res.render("edit", { pageTitle: `Editing${video.title}`,video });
};


export const postEdit = async(req, res) => {

  const { id } = req.params;
  const { title, description, hashtags } = req.body;
  const video = await Video.exists({ _id: id });
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video not found." });
  }
  await Video.findByIdAndUpdate(id, {
    title,
    description,

    hashtags: Video.formatHashtags(hashtags)
  });
  return res.redirect(`/videos/${id}`);
};
/*******************getEdit & postEdit 끝 부분입니다************************** */


/*******************getUpload & postUpload 시작 부분입니다********************** */
export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "Upload Video" });
};


export const postUpload = async (req, res) => {
  const {path : fileUrl} = req.file;
  const { title, description, hashtags } = req.body;
  console.log(title, description, hashtags);
  try {
    await Video.create({
      title,
      description,
      fileUrl,
      hashtags: Video.formatHashtags(hashtags),
      
    });
    //video.save(); //save는 promise라 다 끝날때 까지 기다려줘야 한다
    //console.log(dbVideo);
    return res.redirect("/");
  } catch (error) {
    console.log(error); 
    return res.status(400).render("upload", {
      pageTitle: "Upload Video",
      errorMessage: error._message,
    });
  }
};
/*******************getUpload & postUpload 끝 부분입니다********************** */

/********************************deleteVideo 시작 부분입니다****************** */
export const deleteVideo = async(req,res) => {
    const { id } = req.params;
    await Video.findByIdAndDelete(id);
    console.log(id);
    return res.redirect("/");
}

/********************************deleteVideo 끝 부분입니다****************** */


export const search = async(req,res) => {
  const { keyword } = req.query;
  let videos = [];
  if(keyword) {
    //search
    videos = await Video.find({
      title: {

        $regex:new RegExp(`${keyword}$`,"i")
      },
    })
  }
  return res.render("search",{pageTitle: "Search",videos});
}
