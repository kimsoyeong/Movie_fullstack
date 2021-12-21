const express = require('express');
const router = express.Router();
const { Favorite } = require('../models/Favorite')

//=================================
//             Favorite
//=================================

// api
router.post('/favoriteNumber', (req, res) => {

    // mongoDB에서 favorite 숫자를 가져오기
    Favorite.find({ "movieId": req.body.movieId })
        .exec((err, info) => { // query를 돌려 err, info 받음
            if (err) return res.status(400).send(err) // err 발생 시, client에 error 보냄
            // 프론트에 다시 숫자 정보 보내주기
            return res.status(200).json({ success: true, favoriteNumber: info.length }) // 200: 성공을 의미
        })
})

router.post('/favorited', (req, res) => {

    // 내가 이 영화를 Favorite 리스트에 넣었는 지 정보를 DB에서 가져오기

    // mongoDB에서 favorite 숫자를 가져오기
    Favorite.find({ "movieId": req.body.movieId, "userFrom": req.body.userFrom })
        .exec((err, info) => { // query를 돌려 err, info 받음
            if (err) return res.status(400).send(err) // err 발생 시, client에 error 보냄
            // 프론트에 다시 숫자 정보 보내주기

            let result = false; // 내가 아직 이 영화를 favorite 리스트에 넣지 않았다.
            if(info.length !== 0) {
                result = true
            }

            return res.status(200).json({ success: true, favorited: result }) // 200: 성공을 의미
        })
})

router.post('/removeFromFavorite', (req, res) => {
    Favorite.findOneAndDelete({ movieId: req.body.movieId, userFrom: req.body.userFrom }) // 일치하는 것을 Favorite에서 찾아서 삭제
        .exec((err, doc) => {
            if(err) return res.status(400).send(err)
            return res.status(200).json({ success:true, doc })
        })
})

router.post('/addToFavorite', (req, res) => {

    const favorite = new Favorite(req.body)

    favorite.save((err, dox) => {
        if(err) return res.status(400).send(err) // error
        return res.status(200).json({ success:true }) // 성공
    }) // Favorite doc에 저장

})

router.post('/getFavoredMovie', (req, res) => {
    Favorite.find({ 'userFrom': req.body.userFrom })
        .exec((err, favorites) => {
            if(err) return res.status(400).send(err)
            return res.status(200).json({ success:true, favorites })
        })


})


module.exports = router;