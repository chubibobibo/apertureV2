
const Photo = require('../models/photo.js')
//connect to mongoDb
const mongoose = require('mongoose');
main().catch(err => console.log(err));
async function main() {
    //remove deprecation warning
    mongoose.set('strictQuery', false)
    await mongoose.connect('mongodb://localhost:27017/aperture2');
    mongoose.set('strictQuery', false)
}

const deleteInst = async () => {
    await Photo.deleteMany({})

}


//create new instance of model
const photoInstance = [
    {
        title: 'Montmartre',
        location: 'Paris',
        photo: [
            {
                url: 'https://res.cloudinary.com/dxx0zratx/image/upload/v1675801017/aperturePhotos/henrique-ferreira-ZyYsY0ez2D4-unsplash_bwsfze.jpg',
                filename: 'aperturePhotos/henrique-ferreira-ZyYsY0ez2D4-unsplash_bwsfze'
            }
        ],
        description: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."',
        author: "63de40d0eaa51f7e3befba17",

    },

    {
        title: 'Trocadero',
        location: 'Paris',
        photo: [
            {
                url: 'https://res.cloudinary.com/dxx0zratx/image/upload/v1675801017/aperturePhotos/anthony-delanoix-QAwciFlS1g4-unsplash_ckwpv8.jpg',
                filename: 'aperturePhotos/anthony-delanoix-QAwciFlS1g4-unsplash_ckwpv8'
            }
        ],
        description: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."',
        author: "63de40d0eaa51f7e3befba17",
    },

    {
        title: 'Le Marais',
        location: 'Paris',
        photo: [
            {
                url: 'https://res.cloudinary.com/dxx0zratx/image/upload/v1675801017/aperturePhotos/steven-lasry-m-9xIn58Poo-unsplash_aetdbn.jpg',
                filename: 'aperturePhotos/steven-lasry-m-9xIn58Poo-unsplash_aetdbn'
            }
        ],
        description: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."',
        author: "63de40d0eaa51f7e3befba17",
    },
    {
        title: 'Pigalle',
        location: 'Paris',
        photo: [
            {
                url: 'https://res.cloudinary.com/dxx0zratx/image/upload/v1675801017/aperturePhotos/bastien-nvs-CKn6fbGPOpE-unsplash_ukgwe4.jpg',
                filename: 'aperturePhotos/bastien-nvs-CKn6fbGPOpE-unsplash_ukgwe4'
            }
        ],
        description: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."',
        author: "63de40d0eaa51f7e3befba17",
    },
    {
        title: 'Montparnasse',
        location: 'Paris',
        photo: [
            {
                url: 'https://res.cloudinary.com/dxx0zratx/image/upload/v1675801017/aperturePhotos/kazuo-ota-O_vFB1K0ttk-unsplash_t7fb7l.jpg',
                filename: 'aperturePhotos/kazuo-ota-O_vFB1K0ttk-unsplash_t7fb7l'
            }
        ],
        description: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."',
        author: "63de40d0eaa51f7e3befba17",
    },
]

// deleteInst(photoInstance)

//inserting the created array
Photo.insertMany(photoInstance).then(data => { console.log(data) }).catch(err => { console.log(err) })

//run node photoSeeds.js