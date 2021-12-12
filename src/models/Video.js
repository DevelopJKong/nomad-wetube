//우리들이 해야할 일은 mogoose에게, 우리 애플리케이션의 데이터들이
//어떻게 생겼는지 알려주어야 한다

import mongoose from "mongoose";
// const video = {
//     title:"Heki",
//     description:"lalalaa",
//     createdAt:1212121,
//     hashtags: [
//         "#hi",
//         "#mongo"
//     ]
//
// }


const videoSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxLength: 80 },
  fileUrl: {type: String, required: true},
  thumbUrl: { type: String },
  description: { type: String, required: true, trim: true, minLength: 2 },
  createdAt: { type: Date, required: true, default: Date.now },
  hashtags: [{ type: String, trim: true }],
  meta: {
    views: { type: Number, default: 0, required: true },
  },  
  comments: [{type: mongoose.Schema.Types.ObjectId, ref:"Comment"}],
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
});  

videoSchema.static('formatHashtags',function(hashtags){
  return hashtags.split(",").map((word)=> (word.startsWith("#") ? word : `#${word}`)) 
});


const Video = mongoose.model("Video", videoSchema);
export default Video;

/************* */
