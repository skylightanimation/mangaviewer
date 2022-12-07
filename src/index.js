//lib
// import got from 'got';

//cnfg
const PORT = 3000; 
const dir_data = 'data/images/';

// Requiring module
const express = require('express');
const path = require('path');
const filesystem = require('fs');
const url = require('url');
const app = express();


// inside public directory.
app.use(express.static('data')); 
app.use('/images', express.static('images'));
app.use('/assets', express.static('assets'));

 
// View Engine Setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
  
app.get('/', function(req, res){

	res.render('index')
})




app.get('/fetch_folder', function(req, res){

	let data = [];

	filesystem.readdir(dir_data, (err, folders) => {

		let result =[]
		folders.forEach(folder => {
			var URL = 'http://'+ req.headers.host+'/fetch_file/'+folder;
			var name = folder;
			let data = {name:folder, url:URL}
			result.push(data);
		});

	  	res.contentType('application/json');
		res.send(JSON.stringify(result));
	});
})




app.get('/fetch_file/:title', function(req, res){
	let folder = req.params.title;
	var URL = 'http://'+ req.headers.host+'/images/'+folder;
	let data = [];

	filesystem.readdir(dir_data+folder, (err, imgs) => {
		imgs.forEach(img => {
			let image = URL+'/'+img;
			data.push(image);
		});

		let result = [{title:folder, data:data}]

		res.contentType('application/json');
		res.send(JSON.stringify(result));

	});
})
 

// app.get('/p/:title', function(req, res){

// 	var URL = 'http://'+ req.headers.host+'/';

// 	let urlImg = URL+'fetch_file/'+req.params.title;
// 	let data = [];
// })



// Server setup
app.listen(PORT, () => {
  console.log(`Running server on PORT ${PORT}...`);
})