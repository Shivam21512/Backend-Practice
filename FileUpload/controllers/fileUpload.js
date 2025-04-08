const File = require("../models/File");
const cloudinary = require("cloudinary").v2

// LocalFileUpload -> Handler Function

exports.localFileUpload = async(req,res) => {
    try{

        // fetch filefrom request
        const file = req.files.file;
        console.log("File aagyi bhava -> ", file);

        // create path where file need to be stored on server
        let path  = __dirname + "/files/" + Date.now() + `.${file.name.split('.'[1])}`;
        console.log("PATH -> ", path);


        // Add path to the move function
        file.mv(path, (err) => {
            console.log(err);
        });
        
        // create a successfull response
        res.json({
            success:true,
            message:'Local File Upload Successfully',
        });


    }
    catch(error){
        console.log("Not able to upload the file on server")
        console.log(error);
    }
}

function isFileTypeSupported(type, supportedTypes) {
    return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file, folder,quality){
    const options = {folder};
    console.log("temp file path", file.tempFilePath);
    
    if(quality){
        options.quality = quality;
    }
    
    options.resource_type = "auto";
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}

 
// Image Upload Ka Handler

exports.imageUpload = async (req,res) => {
    try{
        // data fetch
        const {name, tags, email} = req.body;
        console.log(name,tags,email);

        const file = req.files.imageFile;
        console.log(file);

        // Validation 
        const supportedTypes = ["jpg","jpeg","png"];
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("File type :", fileType);

        if(!isFileTypeSupported(fileType, supportedTypes)){
            return res.status(400).json({
                success:false,
                message:'File format not supported',
            })
        }

        // file format support hai

        console.log("Uploading to FutureCoder");
        const response = await uploadFileToCloudinary(file,"FutureCoder");
        console.log(response);

        //db me entry save karnii h
         const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url,
         });

        res.json({
            success:true,
            imageUrl:response.secure_url,
            message:'Image Successfully Uploaded',
        })

    }
    catch(error){
        console.error(error);
        res.status(400).json({
            success:false,
            message:`Something went wrong`,
        })

    }
}




// Video Upload Ka handler

exports.videoUpload = async (req,res) =>{
    try{
        // data fetch
        const {name, tags, email} = req.body;
        console.log(name,tags,email);

        const file = req.files.videoFile;
        console.log(file);

        // Validation 
        const supportedTypes = ["mp4","mov"];
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("File type :", fileType);


        // TODO: ADD a upper limit of 5mb for video
        if(!isFileTypeSupported(fileType, supportedTypes)){
            return res.status(400).json({
                success:false,
                message:'File format not supported',
            })
        }

        // file format support hai

        console.log("Uploading to FutureCoder");
        const response = await uploadFileToCloudinary(file,"FutureCoder");
        console.log(response);

        //db me entry save karnii h
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url,
         });

        res.json({
            success:true,
            imageUrl:response.secure_url,
            message:'Video Successfully Uploaded',
        })

    }
    catch(error){
        console.error(error);
        res.status(400).json({
            success:false,
            message:'Something went wrong',
        })
    }
}



// imageSizeReducer

exports.imageSizeReducer = async (req, res) =>{
    try{
         // data fetch
         const {name, tags, email} = req.body;
         console.log(name,tags,email);
 
         const file = req.files.imageFile;
         console.log(file);
 
         // Validation 
         const supportedTypes = ["jpg","jpeg","png"];
         const fileType = file.name.split('.')[1].toLowerCase();
         console.log("File type :", fileType);

        // TODO: ADD a upper limit of 5mb for video
         if(!isFileTypeSupported(fileType, supportedTypes)){
             return res.status(400).json({
                 success:false,
                 message:'File format not supported',
             })
         }
 
         // file format support hai
 
         console.log("Uploading to FutureCoder");
         //TODO: try height attribute -> Compress  
         const response = await uploadFileToCloudinary(file,"FutureCoder",50);
         console.log(response);
 
         //db me entry save karnii h
          const fileData = await File.create({
             name,
             tags,
             email,
             imageUrl:response.secure_url,
          });
 
         res.json({
             success:true,
             imageUrl:response.secure_url,
             message:'Image Successfully Uploaded',
         })
        

    }
    catch(error){
        console.error(error);
        res.status(400).json ({
            success:false,
            message:'Something went wrong',
        })
    }
}