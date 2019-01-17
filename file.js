//read from json file and stored in local varible
var fs = require('fs');
read = function(fileName,choice,callback)
{
  fs.readFile(fileName, 'utf-8', function(err, data){
    //reading txt file
    if(choice==1){
      var engWord =[];
      var i=0;
      var t = "";
      for(var j = 0 ; j<data.length;j++){
                  if(data[j]=='\n'){
                      engWord[i] = t;
                      i++;
                      t=""
                      continue;
                  }
                  t = t.concat(data[j]);
              }
      callback(engWord);
    }
    //read Json file
    if(choice==2 || choice==3 || choice==4 || choice==5){
      callback(JSON.parse(data));
    }
  });
};
//write to the json file if user have done is editing


write = function(originalText,choice,translatedText)
{

    if(choice==1){
      var jsonVariable={};
      for(key in originalText){

          jsonVariable[originalText[key].toLowerCase()] = translatedText[key]
      }
      fs.writeFile('newJson.json',JSON.stringify(jsonVariable, undefined, 4), (err) =>
      {
        //if some err occur terminate and show the error
        if (err) throw err;
      });
    }
    if(choice==2){
      console.log(originalText,translatedText);
      for(key in originalText){
        if(translatedText[key]){
          if(typeof originalText[key]=='object'){
            originalText[key].value = translatedText[key];
          }else {
            originalText[key] = translatedText[key];
          }
        }

      }

      fs.writeFile('specialTranslation.json',JSON.stringify(originalText, undefined, 4), (err) =>
      {
        //if some err occur terminate and show the error
        if (err) throw err;
      });
    }
    if(choice==3)
    {
      fs.writeFile('optimize.json',JSON.stringify(originalText, undefined, 4), (err) =>
      {
        if (err) throw err;
      });
    }
    if(choice==4){
      fs.writeFile('onlyKeys.txt',originalText, (err) =>
      {
        if (err) throw err;
      });
    }
    if(choice==5){
      fs.writeFile('separatedBrandandModel.json',JSON.stringify(originalText, undefined, 4), (err) =>
      {
        if (err) throw err;
      });
    }


}
module.exports = {
  write: write,
  read: read,
};
