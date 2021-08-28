const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50,
    },

    release_year: {
        type: String,
        validate(value) {
            const re = "^[0-9]{1,4}$"
            if (!re.test(String(value))) {
                throw new Error('Year is not Valid!');
            }

            const curr_year = new Date().getFullYear();
            if(parseInt(value) > curr_year) {
                throw new Error('Year is not Valid!')
            }
        }
    },

    image: {
        type: String,
        trim: true,
    }
})

const Movie = mongoose.model('Movie', movieSchema)

module.exports = Movie