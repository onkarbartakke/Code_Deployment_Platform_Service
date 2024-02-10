import express from "express";
import {S3} from "aws-sdk";

const app = express();

const s3 = new S3({
    accessKeyId : "87b60f238fd62228fa5ad367dd92a37b",
    secretAccessKey: "6386058f371323a04b97cc9c9632879ff679c0b332033b29afdd11d400a446c8",
    endpoint : "https://036b534bf708270ce5810d5305ab0281.r2.cloudflarestorage.com" 
});




app.get("/*" , async (req,res)=>{
    const host = req.hostname;
    const id = host.split(".")[0];
    console.log(id);
    const filePath = req.path;

    const contents = await s3.getObject({
        Bucket: "vercel",
        Key: `dist/${id}${filePath}`
    }).promise();
    
    const type = filePath.endsWith("html")? "text/html" : filePath.endsWith("css") ? "text/css" : "application/javascript"

    res.set("Content-Type" , type);

    res.send(contents.Body);
})

app.listen(3001);