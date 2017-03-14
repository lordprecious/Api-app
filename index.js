#! /usr/bin/env node
 // my news app
var superagent = require("superagent"); /**  required dependencies*/
var inquirer = require("inquirer");
var chalk = require("chalk");
var figlet  = require('figlet')

function BuildSource(source,sortby)
{
	return "https://newsapi.org/v1/articles?source=" + source + "&apiKey=a15864e776014990966b7593cb63d7e0&sortby" + sortby;  //link to the api;
}
function Search(callback) { // function that demands input fron the user requesting new source;
  var questions = [
    {
      name: 'sources',
      type: 'input',
      message: 'Searching For NEWS on NewAPI.org; PLEASE Enter your source (example: bbc-news, techcrunch or cnn): ',
      validate: function(value) {
        if (value.length) {
          return true;
        } else {
          return 'Please Enter your source: Examples are techcrunch and bbc-news';
        }
      }
    },
    {
      name: 'sort',
      type: 'input',
      message: 'You can sort by "top", "latest" or "popular" Sort By: ',  // prompting to user to select category of selected nes source;
      validate: function(value) {
        if (value.length) {
        	if (value === "top" || value === "latest" || value === "popular"){
        		return true;
        	}
        	else{
        		return "Please enter a valid sort order";
        	}
        } else {
          return "Please enter your sort order";
        }
      }
    }
  ];

  inquirer.prompt(questions).then(callback);
}
Search(function(){                                                         // function that displays information to the user;
	superagent.get(BuildSource(arguments[0].sources,arguments[0].sort)).end(function(err, res){
		if(err)
		{
			console.log(err);
		}
		else
		{
			for (var i = 0; i < res.body.articles.length; i++)
			{
				console.log(chalk.yellow(res.body.articles[i].author));
				console.log(chalk.green("\n\t" + res.body.articles[i].title));
				console.log("\n\t" + res.body.articles[i].description);
				console.log(chalk.blue("\n\t" + res.body.articles[i].url));
			}
		}
})
});
