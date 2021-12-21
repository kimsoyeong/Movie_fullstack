const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const favoriteSchema = mongoose.Schema({
    userFrom: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    movieId: {
        type: String
    },
    movieTitle: {
        type: String
    },
    moviePost: {
        type: String
    },
    movieRunTime: {
        type: String
    },
}, { timestamps: true })


const Favorite = mongoose.model('Favorite', favoriteSchema);

// 다른 파일에서 해당 모델을 사용 가능하게
module.exports = { Favorite }