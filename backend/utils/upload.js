import multer from 'multer';

import {GridFsStorage} from 'multer-gridfs-storage';

import dotenv from 'dotenv';


dotenv.config();

const USERNAME= process.env.DB_USERNAME;
const PASSWORD= process.env.DB_PASSWORD;
const MONGODB_URI = process.env.MONGODB_URI;

const URL = MONGODB_URI || `mongodb+srv://${USERNAME}:${PASSWORD}@merncluster.5km0ode.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp`;


const storage = new GridFsStorage({
    url: URL,
    options: { useNewUrlParser: true},
    file: (req, file ) => {
        const match = ["image/png", "image/jpg" , "image/jpeg", "image/gif"];

        if (match.indexOf(file.mimetype) === -1){
            return{
                bucketName: "photos",
                filename:`${Date.now()}-blog-${file.originalname}`,
            };
        }

        return {
            bucketName: "photos",
            filename: `${Date.now()}-blog-${file.originalname}`,
        };
    },
});

export default multer({storage});
