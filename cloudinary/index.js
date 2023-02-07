const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

//configure cloudinary
//refer to cloudinary docs:
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_SECRET,
});

//create a new instance of cloudinary storage
//refer to multer-storage-cloudinary docs
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,//the cloudinary we just configured
    params: {
        folder: 'aperturePhotos',
        format: async (req, file) => {
            return 'jpeg', 'jpg', 'png'
        }
    }
})
module.exports = { cloudinary, storage } //exporting the instance storage we created and the configured cloudinary
