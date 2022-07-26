import express from "express";
import cors from 'cors';
import {YouTube,Facebook,Instagram,Twitter} from 'social-downloader-cherry';
import {downloadLink} from "./Controller/DownloadUrl.js"

import ytdl from "ytdl-core";
import fs from "fs"

const app =express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

const port = process.env.PORT|| 5000
app.get("/",async (req,res)=>{


// res.send("hello this is app");



})


app.post("/",async (req,res)=>{

const {type,Link} =req.body;
// const a=   ytdl(Link).pipe(fs.createWriteStream('vieo.mp4'))


if(type===1)
{


 
console.log("this is youtube")
const data=await ytdl.getInfo(Link);

const send ={formats:data.formats,name:data.videoDetails.title,duration:data.videoDetails.lengthSeconds,thumbnail:data.videoDetails.thumbnail.thumbnails[1].url}
res.send(send);


}
 else  if(type===2)
{

const data=await Facebook.getVideo(Link);
console.log(data.data);
res.send(data.data);


}
else if(type===3)
{

const data=await Twitter.getVideo(Link);

res.send(data.data);


}
else if(type===4)
{

const data=await Instagram.getAny(Link)

res.send(data.data);


}
else
{
    res.send("not suitable");

}




});



app.listen(port,()=>{
    console.log(`working on ${port}`);
})