const rp = require('request-promise');
const cheerio = require('cheerio');
const TurndownService = require('turndown');
const vscode = require('vscode');
var fs = require('fs');
const { Runner } = require('./coderunner');
const { exec } = require('child_process');

let getTestCaseFromProblemHtml = (dir, html) => {

  fs.copyFileSync(`${dir}/../template.cpp`, `${dir}/sol.cpp`);
  data = [];
  const $ = cheerio.load(html);
  const turndownService = new TurndownService();
  let markdown = turndownService.turndown($('.problem-statement').html());
  markdown =markdown.split("$$$").join("$");
  const double = String.raw`\\`;
  markdown = markdown.split(String.raw`\\`).join(`\\`);
  fs.writeFile(`${dir}/problemStatement.md`,markdown,function(err){
    if(err){
        console.log(err);
    }
    console.log(`The file ${dir}/problemStatement.md was saved!`);
  });
  $('div.input pre').each((i, elem) => {
    data[i] = {
      ...data[i],
      input: $(elem).text()
    };
  });
  $('div.output pre').each((i, elem) => {
    data[i] = ({
      ...data[i],
      output: $(elem).text()
    });
  });
  console.log(data);
  data.forEach((test, i) => {
    fs.writeFile(`${dir}/in${i}.txt`, test.input, function(err) {
      if(err) {
          console.log(err);
      }
      console.log(`The file ${dir}/in${i}.txt was saved!`);
    }); 
    fs.writeFile(`${dir}/out${i}.txt`, test.output, function(err) {
      if(err) {
          console.log(err);
      }
      console.log(`The file ${dir}/out${i}.txt was saved!`);
    }); 
  })
  console.log(data);
}

function getTestCaseFromProblemUrl(url) {
  var dir = vscode.workspace.workspaceFolders[0].uri.path+`/${url.substring(url.lastIndexOf('/')+1)}`;

  if (!fs.existsSync(dir)){
      fs.mkdirSync(dir);
  }

  rp(url)
    .then(function(html){
      getTestCaseFromProblemHtml(dir, html);
    }
    )
    .catch(err => console.log(err));
}

let getTotalProblemsFromContestHtml = (html) => {
  data = [];
  const $ = cheerio.load(html);
  console.log('parsing');
  $('tr td.id a').each((i, elem) => {
    problem_url = 'https://codeforces.com/' + $(elem).attr('href')
    console.log(problem_url);
    getTestCaseFromProblemUrl(problem_url);
  });
}

let runFileCreator = (url) =>{
    rp(url)
        .then(function(html){
        getTotalProblemsFromContestHtml(html);
        });
    console.log("Successful");
}

let Compile = (name) => {
  var dir = vscode.workspace.workspaceFolders[0].uri.path+'/'+name;
  exec(`cd ${dir};g++ -std=c++17 sol.cpp -o sold; `);
}

let Run = (name) => {
  var dir = vscode.workspace.workspaceFolders[0].uri.path+'/'+name;
  console.log(dir);
  for(i=0;i<10;++i){
    exec(`cd ${dir};./sold < in${i}.txt > res${i}.txt`);
  }
}

module.exports = {runFileCreator,Compile, Run};