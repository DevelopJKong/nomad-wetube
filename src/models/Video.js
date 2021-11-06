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
    title: String,
    description: String,
    createdAt: Date,
    hashtags: [{type:String}],
    meta: {
        views: Number,
        rating: Number,
    },

});

const Video = mongoose.model("Video",videoSchema);
export default Video;

/************* */







