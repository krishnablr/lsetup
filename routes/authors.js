const express = require('express')
const router = express.Router()
const Author = require('../models/authors')
const app = express() ;
const bodyParser = require('body-parser');
const { Error } = require('mongoose');
//app.use(express.urlencoded({extended: false}))
app.use(bodyParser.urlencoded({ extended: true }));

const { authenticateUser } = require('../middleware/authentication');
const { getpage } = require('../controllers/authorController');
const { postpage } = require('../controllers/authorController');
const { createpage } = require('../controllers/authorController');
const { createpagepost } = require('../controllers/authorController');
const { getSingleAuthor } = require('../controllers/authorController');
const { ShowCurrentUser } = require('../controllers/authorController');



router.get('/', authenticateUser, getpage);
router.post('/a', authenticateUser, postpage);
router.get('/new', authenticateUser, createpage);
router.post('/', authenticateUser, createpagepost);
router.get('/:id', authenticateUser, getSingleAuthor)
router.get('/showme', authenticateUser, ShowCurrentUser)


//let a = 7 ;

// //---------------------------------GET Method Start--------------------------------------------------------
// //All Authhors Route
// router.get('/', authenticateUser, async (req, res) => {

// //let searchOptions = { name: /somename/i, skill: /plumber/i }
// //let searchOptions = { name: / /i }
//     let searchOptions = {nonExistentField: "thisFieldDoesNotExist"}
// //let searchOptions = { name: / /i }

// // if(req.query.name !== '' && req.query.skill !== '') {
// //     searchOptions.name = new RegExp(req.query.name, 'i')
// //     searchOptions.skill = new RegExp(req.query.skill, 'i')
// // }
// // else if(req.query.skill !== null && req.query.skill !== '') {
// //     //searchOptions = {} 
// //     searchOptions.skill = new RegExp(req.query.skill, 'i')
// // }
// // else if(req.query.name !== null && req.query.name !== '') {
// //     //searchOptions = {} 
// //     searchOptions.name = new RegExp(req.query.name, 'i')
// // }
// // else if(req.query.name == '') {
// //     searchOptions = { } 
// //     searchOptions.name = new RegExp(req.query.name, 'i')
// // }
// // // else if(req.query.name !== null) {
// // //    let searchOptions = { name: / /i }
// // // }

// try{
//     const authors = await Author.find(searchOptions)
//     //res.render('authors/index', {authors: authors, searchOptions: req.query})
//     res.render('authors/index', {authors: authors,searchOptions: req.body})
//     console.log('gsearch options is', searchOptions)
//     //console.log('gauthors options is', authors)
//         console.log('gqname is', req.body.name)
//         console.log('gqskill is', req.body.skill)
//         console.log(authors)
// }
// catch(error) {
//     console.log(error)
//     res.redirect('/ro')
// }
    
// } )
// //---------------------------------GET Method End-----------------------------------------------------

//---------------------------------POST Method--------------------------------------------------------

// //Search Authors Route


// router.post('/a', authenticateUser, async (req, res) => {
//     //let searchOptions = { name: /somename/i, skill: /plumber/i }
//     //let searchOptions = { name: / /i }
//     //let searchOptions = {name: /test/ }
//     //let searchOptions = { name: / /i }
//     let searchOptions = {}
    
//     if(req.body.place !== '' && req.body.skill !== '') {
//         searchOptions.place = new RegExp(req.body.place, 'i')
//         searchOptions.skill = new RegExp(req.body.skill, 'i')
//     }
//     else if(req.body.skill !== null && req.body.skill !== '') {
//         //searchOptions = {} 
//         searchOptions.skill = new RegExp(req.body.skill, 'i')
//     }
//     else if(req.body.place !== null && req.body.place !== '') {
//         //searchOptions = {} 
//         searchOptions.place = new RegExp(req.body.place, 'i')
//     }
//     else if(req.body.place == '') {
//         //searchOptions = {} 
//         searchOptions.place = new RegExp(req.body.place, 'i')
//     }
//     //  else if(req.query.name !== null) {
//     //     let searchOptions = { name: / /i }
//     //  }
    
//     try{
//         const authors = await Author.find(searchOptions)
//         //const authors = await Author.find({ skill: /plum/i })
//         res.render('authors/index', {authors: authors, searchOptions: req.body})
//         console.log('psearch options is', searchOptions)
//         console.log('pqname is', req.body.name)
//         console.log('pqskill is', req.body.skill)
//         console.log('pqplace is', req.body.place)
//         console.log(authors)
//         //res.send(searchOptions.place);
//         //res.json(req.body.skill);
        
//     }
//     catch(error) 
//     {
//         console.log(error)
//         res.redirect('/ro')
//     }
        
//     } )

//---------------------------------POST Method End-----------------------------------------------





// //New page for authors
// router.get('/new', authenticateUser, (req, res) => {
//     res.render('./authors/new', { author: new Author() })
// })

// //Create Author Route GET request

// //Create Author Route POST request
// router.post('/', async (req,res) => {
//     //res.send(req.body.name)
//     const authorss = new Author({ 
//             name: req.body.name,
//             skill: req.body.skill,
//             place: req.body.place,
//             num: req.body.num
//         })
//     try {
//         const newAuthor = await authorss.save()
//         console.log('Added')
//         res.redirect('/ro')
//     }
//     catch(error)  {
//         console.log(error)
//         res.render('authors/new', { author: authorss, errorMessage: 'Error Creating Author'})
//     }
//      //author.save()
//      //res.render('authors')
// })  


// create Author Route POST request


// router.get('/:id', authenticateUser,  async(req, res) => {
//     try {
//         const author = await Author.findById(req.params.id)
//         res.render('authors/show', { author: author })
//     } catch (error) {
//         res.redirect ('/author')
//     }

// })

//single Author Route GET request


module.exports = router