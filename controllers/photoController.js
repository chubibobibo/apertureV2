const Photo = require('../models/photo.js');
const cloudinary = require('cloudinary').v2;
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');// geoding services
const mapboxToken = process.env.MAPBOX_KEY
const geoCoder = mbxGeocoding({ accessToken: mapboxToken });


module.exports.renderIndex = async (req, res) => {
    const foundPhotos = await Photo.find({}).populate('author')
    res.render('photo/index.ejs', { foundPhotos });
}

module.exports.renderNew = (req, res) => {
    res.render('photo/new.ejs');
}

module.exports.createNew = async (req, res) => {
    const { photos } = req.body
    if (!photos) {
        req.flash('error', 'can not create a new photo entry')
    } else {
        const newPhoto = await new Photo(photos);
        const geoData = await geoCoder.forwardGeocode({
            query: req.body.photos.location,//data coming from the input field in new.ejs
            limit: 1
        }).send()
        //saving geodata to the specific photoEntry
        //remember features is an array, so we take the first element
        newPhoto.geometry = geoData.body.features[0].geometry
        //req.files is an array so we need to map it to a new array that only has the url and filename in it. then we save it to the photo property of the new created photo entry 
        newPhoto.photo = req.files.map(img => ({ url: img.path, filename: img.filename }))
        newPhoto.author = req.user//saving the current logged user as author of the photo entry
        //setting up geocoder based on the initial setup we made with require
        //sending requset to mapbox

        await newPhoto.save()
        req.flash('success', 'Created a new Photo entry')
        res.redirect('/photos');
    }
}
module.exports.renderDetail = async (req, res) => {
    const { id } = req.params;
    //nested populate means populate the comments with path: author
    const foundEntry = await Photo.findById(id).populate({
        path: 'comment',
        populate: {
            path: 'author'
        }
    }).populate('author');
    res.render('photo/detail.ejs', { foundEntry });

}

module.exports.renderEditDetail = async (req, res) => {
    const { id } = req.params;
    const foundEntry = await Photo.findById(id);
    if (!foundEntry) {
        req.flash('error', 'Photo entry not found')
    }
    res.render('photo/edit.ejs', { foundEntry });
}

module.exports.editDetail = async (req, res) => {
    const { id } = req.params;
    const { photos, deleteImages } = req.body;
    const foundEntry = await Photo.findByIdAndUpdate(id, photos);
    const geoData = await geoCoder.forwardGeocode({
        query: req.body.photos.location,//data coming from the input field in new.ejs
        limit: 1
    }).send()
    foundEntry.geometry = geoData.body.features[0].geometry
    const img = req.files.map(img => ({ url: img.path, filename: img.filename }))
    foundEntry.photo.push(...img)
    foundEntry.save()
    //check if deleteImages(name: from form) exist then use it to pull the specific images in the photo array
    //deletImages contain the data(filename) which we will use to pull form array
    if (deleteImages) {
        await Photo.updateMany({ $pull: { photo: { filename: { $in: deleteImages } } } })
        await cloudinary.uploader.destroy(deleteImages, (error, res) => {
            console.log(res, error)
        });

    }
    req.flash('success', 'Successfully updated your photo entry')
    res.redirect(`/photos/${foundEntry._id}`);
}

module.exports.deleteEntry = async (req, res) => {
    const { id } = req.params;
    await Photo.findByIdAndDelete(id);
    req.flash('success', 'Deleted a photo entry')
    res.redirect('/photos');
}