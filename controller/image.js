const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: 'faaeda961e264e67b531b00d66f4bdd7'
   });

   const handleApiCall = (req, res) => {
    app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
        res.json(data);
    })
    .catch(err => res.status(404).json('Failed to catch API'));
   }

const handleImage = (req, res, db) => {
    const {id} = req.body;
    db('users').where('id', '=', id).
    increment('entries', 1).
    returning('entries').
    then(entries => {
        res.json(entries[0])
    }).
    catch(err => res.status(404).json('Unable to connect'))
}

module.exports = {
    handleImage,
    handleApiCall
}