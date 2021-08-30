const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
    movie_name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50,
    },

    release_year: {
        type: String,
        validate(value) {
            const re = /^[0-9]{1,4}/
            if (!re.test(value)) {
                throw new Error('Year is not Valid!');
            }

            const curr_year = new Date().getFullYear();
            if (parseInt(value) > curr_year) {
                throw new Error('Year is not Valid! Date in future!')
            }
        }
    },

    image_url: {
        type: String,
        trim: true,
        validate(value) {
            const re = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
            if (!re.test(value)) {
                throw new Error('URL is not Valid!');
            }
        }
    },

    description: {
        type: String,
        trim: true,
    }
})

const Movie = mongoose.model('Movie', movieSchema)

module.exports = Movie