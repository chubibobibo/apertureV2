
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
        geometry: {
            type: 'Point',
            coordinates: [2.3431, 48.8862],
        },
        location: 'montmartre, paris',
        photo: [
            {

                url: 'https://res.cloudinary.com/dxx0zratx/image/upload/v1675852032/stockImages/bastien-nvs-CKn6fbGPOpE-unsplash_sfccrf.jpg',
                filename: 'stockImages/bastien-nvs-CKn6fbGPOpE-unsplash_sfccrf'



            }
        ],
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        author: '63de40d0eaa51f7e3befba17',

    },

    {
        title: 'Trocadero',
        geometry: {
            type: 'Point',
            coordinates: [2.285665524, 48.857663236],
        },
        location: 'trocadero, Paris',
        photo: [
            {

                url: 'https://res.cloudinary.com/dxx0zratx/image/upload/v1675852031/stockImages/anthony-delanoix-QAwciFlS1g4-unsplash_y3dkcx.jpg',
                filename: 'stockImages/anthony-delanoix-QAwciFlS1g4-unsplash_y3dkcx'

             

            }
        ],
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        author: '63de40d0eaa51f7e3befba17',
    },

    {
        title: 'Le Marais',
        geometry: {
            type: 'Point',
            coordinates: [2.3582, 48.8612],
        },
        location: 'le marais, Paris',
        photo: [
            {

                url: 'https://res.cloudinary.com/dxx0zratx/image/upload/v1675852032/stockImages/steven-lasry-m-9xIn58Poo-unsplash_ippyzb.jpg',
                filename: 'stockImages/steven-lasry-m-9xIn58Poo-unsplash_ippyzb'

                

            }
        ],
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        author: '63de40d0eaa51f7e3befba17',
    },
    {
        title: 'Pigalle',
        geometry: {
            type: 'Point',
            coordinates: [2.3373, 48.8822],
        },
        location: 'pigalle, Paris',
        photo: [
            {

                url: 'https://res.cloudinary.com/dxx0zratx/image/upload/v1675852032/stockImages/john-towner-UO02gAW3c0c-unsplash_dgrdey.jpg',
                filename: 'stockImages/john-towner-UO02gAW3c0c-unsplash_dgrdey'

                

            }
        ],
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        author: '63de40d0eaa51f7e3befba17',
    },
    {
        title: 'Montparnasse',
        geometry: {
            type: 'Point',
            coordinates: [2.3305, 48.8393],
        },
        location: 'montparnasse, Paris',
        photo: [
            {

                url: 'https://res.cloudinary.com/dxx0zratx/image/upload/v1675852032/stockImages/henrique-ferreira-ZyYsY0ez2D4-unsplash_zqkiem.jpg',
                filename: 'stockImages/henrique-ferreira-ZyYsY0ez2D4-unsplash_zqkiem'

               

            }
        ],
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        author: '63de40d0eaa51f7e3befba17',
    },
]

// deleteInst()

//inserting the created array
Photo.insertMany(photoInstance).then(data => { console.log(data) }).catch(err => { console.log(err) })

//run node photoSeeds.js