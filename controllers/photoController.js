const Photo = require('../models/photo.js');

module.exports.renderIndex = async (req, res) => {
    const foundPhotos = await Photo.find({}).populate('author')
    console.log(req.session)
    console.log(req.user)
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
        //req.files is an array so we need to map it to a new array that only has the url and filename in it. then we save it to the photo property of the new created photo entry 
        newPhoto.photo = req.files.map(img => ({ url: img.path, filename: img.filename }))
        newPhoto.author = req.user//saving the current logged user as author of the photo entry
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
    console.log(req.user)
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
    const { photos } = req.body;
    const foundEntry = await Photo.findByIdAndUpdate(id, photos);
    const img = req.files.map(img => ({ url: img.path, filename: img.filename }))
    foundEntry.photo.push(...img)
    foundEntry.save()
    req.flash('success', 'Successfully updated your photo entry')
    res.redirect(`/photos/${foundEntry._id}`);
}

module.exports.deleteEntry = async (req, res) => {
    const { id } = req.params;
    await Photo.findByIdAndDelete(id);
    req.flash('success', 'Deleted a photo entry')
    res.redirect('/photos');
}