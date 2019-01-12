const express = require('express');
const hbs = require('hbs');
const fs = require('fs');


var app = express();

app.set('view engine',hbs);

// app.use((req,res)=>{
// 	res.render('maintenance.hbs');
// });
app.use(express.static(__dirname+'/public'));

app.use((req,res,next)=>{
	var n = new Date().toString();
	console.log(`${n} ${req.method} ${req.url}`);
	fs.appendFile("server.log",`${n} ${req.method} ${req.url}`+'\n',(err)=>{
		if(err)
			console.log(err);
	});
next();
});


hbs.registerPartials(__dirname+'/views/partials');
hbs.registerHelper('getcurrentyear',()=>{
	return new Date().getFullYear();
});

// hbs.registerHelper('scream',(xt)=>{
// 	var as = xt.toLowerCase();
// 	return as;
// });

app.get('/',(req,res)=>{
	res.render('home.hbs',{
		name : 'ajay',
		clg : 'cbit',
		title : 'homepage'	});
});

app.get('/about',(req,res)=>{
	res.render('about.hbs',{
		title : 'aboutpage'
	});
});
app.listen(3009);

