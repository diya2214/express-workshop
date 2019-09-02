var express = require('express')
var app = express()
var fs = require('fs')
var formidable = require('express-formidable')
app.use(formidable())
app.use(express.static("public"))

app.get('/get-posts',function(req,res){
  res.sendFile(__dirname + '/data/posts.json')

})

app.post('/create-post',function(req,res){
  var date= Date.now();
  var newData =  req.fields.blogpost

  fs.readFile(__dirname + '/data/posts.json', function (error, file) {
    var parsedData = JSON.parse(file)
      parsedData[date]=newData
      console.log(parsedData)
      fs.writeFile(__dirname + '/data/posts.json', JSON.stringify(parsedData), function (error) {
        console.log('FILE UPDATED')
    });

  });
})


app.listen(3000,function(){
  console.log('Server is listening on port 3000. Ready to accept requests')
});