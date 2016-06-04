var fs = require("fs");
var cmudictFile = readCmudictFile('./cmudict.txt');

function readCmudictFile(file){
  return fs.readFileSync(file).toString();
}

function formatData(data){    
   var syllablesArr = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];
   var arr = [];
   var lines = data.toString().split("\n"), lineSplit
   
   lines.forEach(function (line) {    
	    lineSplit = line.split("  ");
	    var count = 0;
	    if (lineSplit[1] !== undefined) {
		    lineSplit[0] = lineSplit[0].toString();
		    lineSplit[1] = lineSplit[1].toString();
		 
		    for (var i = 0; i < lineSplit[1].length; i++) {
		    	if(lineSplit[1].charAt(i).match(/\d/)) {
		    		count++;
		    	}
		    }
		    while (syllablesArr.length < count) {
		    	syllablesArr.push(arr);
		    }
		    if (!lineSplit[0].match(/\d/)) {
		    	syllablesArr[count].push(lineSplit[0]);
		    }
		    
		    
		}
	});
   	return syllablesArr;
}



function createHaiku(structure) {
	var arr = formatData(cmudictFile);

	for (var i = 0; i < structure.length; i++) {
		var word = Math.floor(structure[i]*Math.random(1))+1;
		var str = arr[word][Math.floor(Math.random(arr.length)*(arr[word].length-1))+1];
		while (word < structure[i]) {
			var newWord = Math.floor((structure[i]-word)*Math.random(1))+1;
			str += " " + arr[newWord][Math.floor(Math.random(arr.length)*(arr[newWord].length-1))+1];
			word += newWord;
		}
		console.log(str.slice(0, 1) + str.slice(1,str.length).toLowerCase());
	}
}
module.exports.createHaiku = createHaiku;
module.exports.formatData = formatData;



