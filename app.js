var readline = require('readline-sync');
//import file reading and writing functions
var file = require('./file')
var englishWords;
var lang;
var langArray = ['en','ta','te','hi'];


// findPrimaryColors = function(colorsJson){
//   for(var i in colorsJson){
//     if(colorsJson[i]>9)
//       console.log(JSON.stringify(i)+ ',');
//   }
// }

// var menu = function(t,d){
//     //console.log(specialTranslation,teluguTranslatiosn);
//   // console.log(t,d);
//   // console.log(t,d);
//   //  console.log(specialTranslation,newTranslations);
//     //file.write(specialTranslation,newTranslations);
//     file.write(t)
//   //  findPrimaryColors(t);
//     //file.write(t,d);
//   //  englishWords  = englishWords1;
//     //lang = readline.question('enter the lang you want to translate english file into json');
//     //authenticate();
//
// }
//menu();
//convert json file into txt and find out primary colors
//file.read('colors.json',menu);
var MakeJson = function(choice){
  file.read('onlyKeys.txt',choice,function(t){
    file.read('hindi.txt',choice,function(d){
      file.write(t,choice,d);
    });
  });
}
var generateSpecialTranslations = function(choice){
  file.read('hindiSpecial.json',choice,function(t){
    file.read('newJson.json',choice,function(d){
      file.write(t,choice,d);
    });
  });
}
var removeDuplicateKeys = function(choice){
  file.read('translation.json',choice,function(t){
    var newJson={};
    for(i in t){
        newJson[i.toLowerCase()] = t[i];
      }
    file.write(newJson,choice);
  });
}
var extractKey = function(choice){
  file.read('optimize.json',choice,function(t){
    var onlyKeys = " "
    for(key in t){
      //onlyKeys+=t[key]+'\n';
      onlyKeys+=key+'\n';
    }
    file.write(onlyKeys,choice);
  })

}
// const ordered = {};
// Object.keys(unordered).sort().forEach(function(key) {
//   ordered[key] = unordered[key];
// });
var removeEmptyKeyFromArray =function(tempKeys){
        var finalArray=[];
        if(tempKeys.length>0){
                    for(let i in tempKeys){
                        if (tempKeys[i].length <= 0) {
                            continue;
                        }
                        finalArray.push(tempKeys[i]);
                    }
                }
        return finalArray;
    }
var extractBrandAndModel = function(choice){
  const ordered = {};
  file.read('brandAndModel.json',choice,function(t){
    Object.keys(t).sort().forEach(function(key) {
      ordered[key] = t[key];
    });
    var brandAndModel ={};
      for(var key in ordered){
          if(!key.includes(" ")){
            brandAndModel[key] = ordered[key];
            continue;
          }
          var arrayKey = removeEmptyKeyFromArray(key.split(" "));

          var arrayVal = removeEmptyKeyFromArray(ordered[key].split(" "));
          for(var i in arrayKey){
            brandAndModel[arrayKey[i]]= arrayVal[i];
          }
        }
    //       var str = key;
    //       var val = ordered[key];
    //       for(var i in brandAndModel){
    //
    //         if(str.includes(brandAndModel[i])){
    //           str=str.replace(i+" ","");
    //           val = val.replace(brandAndModel[i]+" ","");
    //         }
    //         console.log(str);
    //       }
    //       console.log(str);
    //       if(!str.includes(" "))
    //         brandAndModel[str]=val;
    //     }
    file.write(brandAndModel,choice);
  })
}

var menu = function(){
  try{
      var choice = readline.question('enter choice \n 1.Make Json from two txt file \n 2.Generate special translation file \n 3.Remove Duplictae Keys and generate file\n 4.Extract keys from Json file\n 5.Extract space separated brand,model\n');
      if(choice==1)
        MakeJson(choice);
      if(choice==2)
        generateSpecialTranslations(choice);
      if(choice==3)
        removeDuplicateKeys(choice);
      if(choice==4)
        extractKey(choice);
      if(choice==5)
        extractBrandAndModel(choice);
    }catch(e){
      console.log('in');
      console.log(e.message);
      menu();
    }

}
menu();
