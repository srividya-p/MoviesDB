let express = require('express');
let router = express.Router();

const Movie = require('./models/movie');

router.use((req, res, next) => {
    if (req.query._method == 'DELETE') {
        req.method = 'DELETE';
        req.url = req.path;
    }

    if (req.body._method == 'PUT') {
        req.method = 'PUT';
        req.url = req.path;
    }

    next()
})

router.get('/', async (req, res) => {
    try {
        let movies = await Movie.find()
        // res.send(movies);
        res.locals = { title: 'Movies DB' };
        res.render('Movies/all_movies', {
            message: [req.flash('success'), req.flash('error')],
            movies
        });
    } catch (e) {
        console.log(e)
    }
})

router.get('/add-movie', (req, res) => {
    res.locals = { title: 'Add Movie' };
    res.render('AddMovie/add_movie');
})

router.post('/movie-added', async (req, res) => {
    let movie_doc = new Movie(req.body);
    try {
        await movie_doc.save();
        // res.send({message: 'Movie added to Database!'})
        req.flash('success', 'Movie added to Database!')
        res.redirect('/')
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/')
    }
})

router.get('/update-movie', async (req, res) => {
    const baseURL = req.protocol + '://' + req.headers.host + '/';
    const url_obj = new URL(req.url, baseURL)
    const id = url_obj.searchParams.get("id")

    try {
        let movie = await Movie.findOne({ _id: id })
        // res.send(movie)
        res.locals = { title: 'Update Movie' };
        res.render('UpdateMovie/update_movie', {
            movie
        })
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/')
    }
})

router.put('/movie-updated/:id', async (req, res) => {
    try {
        await Movie.findOneAndUpdate({ _id: req.params.id }, req.body, { runValidators: true })
        // res.send({message: 'Movie updated successfully!'})
        req.flash('success', 'Movie updated successfully!')
        res.redirect('/')
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/')
    }
})

router.delete('/delete-movie/:id', async (req, res) => {
    try {
        await Movie.deleteOne({ _id: req.params.id })
        // res.send({message: 'Movie removed from Database!'})
        req.flash('success', 'Movie removed from Database!')
        res.redirect('/')
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/')
    }
})


module.exports = router;