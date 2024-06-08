//express
const express = require('express');
const app = express();
//const User = require('../models/user');
const Author = require('../models/authors');
const { StatusCodes } = require('http-status-codes');
const userSchema = require('../src/config')
//const CustomError = require('../errors');

//require ejs
const ejs = require('ejs');

//use ejs
app.set('view engine', 'ejs');

//get method
const getpage = async (req, res) => {
    let searchOptions = {nonExistentField: "thisFieldDoesNotExist"}
    try{
        const authors = await Author.find(searchOptions)
        //res.render('authors/index', {authors: authors, searchOptions: req.query})
        res.render('authors/index', {authors: authors,searchOptions: req.body})
        console.log('gsearch options is', searchOptions)
        //console.log('gauthors options is', authors)
            console.log('gqname is', req.body.name)
            console.log('gqskill is', req.body.skill)
            console.log(authors)
    }
    catch(error) {
        console.log(error)
        res.redirect('/ro')
    }
        
    }

const postpage = async (req, res) => {
    let searchOptions = {}
    
    if(req.body.place !== '' && req.body.skill !== '') {
        searchOptions.place = new RegExp(req.body.place, 'i')
        searchOptions.skill = new RegExp(req.body.skill, 'i')
    }
    else if(req.body.skill !== null && req.body.skill !== '') {
        //searchOptions = {} 
        searchOptions.skill = new RegExp(req.body.skill, 'i')
    }
    else if(req.body.place !== null && req.body.place !== '') {
        //searchOptions = {} 
        searchOptions.place = new RegExp(req.body.place, 'i')
    }
    else if(req.body.place == '') {
        searchOptions = { } 
        searchOptions.place = new RegExp(req.body.place, 'i')
    }
    try{
        const authors = await Author.find(searchOptions)
        //res.render('authors/index', {authors: authors, searchOptions: req.query})
        res.render('authors/index', {authors: authors,searchOptions: req.body})
        console.log('search options is', searchOptions)
        //console.log('authors options is', authors)
            console.log('qname is', req.body.name)
            console.log('qskill is', req.body.skill)
            console.log(authors)
    }
    catch(error) {
        console.log(error)
        res.redirect('/ro')
    }
        
    }

//create get page
const createpage = (req, res) => {
    res.render('authors/new', {author: new Author()})
}


//create page post
const createpagepost = async (req, res) => {
    const author = new Author({
        name: req.body.name,
        skill: req.body.skill,
        place: req.body.place,
        num: req.body.num
    })
    try {
        const newAuthor = await author.save()
        //res.redirect(`authors/${newAuthor.id}`)
        res.redirect(`authors`)
    } catch {
        res.render('authors/new', { author: author })
    }
}

//Get Single Author
const getSingleAuthor = async (req, res) => {
          try {
            const author = await Author.findById(req.params.id)
            res.render('authors/show', { author: author, layout: 'layouts/show'})
        } catch (error) {
            res.redirect ('/author')
        } 

}

//showme method
const ShowCurrentUser = async (req, res) => {
    try {
        const author = await Author.findById(req.params.id)
        res.render('authors/show', { author: author })
    } catch (error) {
        res.redirect ('/author')
    }
}


// {
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


//export
module.exports = {
    getpage,
    postpage,
    createpage,
    createpagepost,
    getSingleAuthor,
    ShowCurrentUser
};