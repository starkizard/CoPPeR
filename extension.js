const vscode = require('vscode');
const { runFileCreator, Compile, Run  } = require('./fileCreator');

function registerCommands(context){
	let helloworld = vscode.commands.registerCommand(
		'vscopper.helloWorld', function(){
			vscode.window.showInformationMessage('Hello World from CoPPer - CP for VSCode!');
		}
	);
	
	let codeforcesCnt = vscode.commands.registerCommand(
		'vscopper.codeforcesContest', async function(){
			let link = await vscode.window.showInputBox({placeHolder: 'Enter URL'});
			runFileCreator(link);
		}
	);
	let buildCode = vscode.commands.registerCommand(
		'vscopper.buildCode', async function(){
			let name = await vscode.window.showInputBox({placeHolder: "Enter Problem ID (A/B/C..)"});
			Compile(name);
		}
	);
	let runCode = vscode.commands.registerCommand(
		'vscopper.runCode', async function(){
			let name = await vscode.window.showInputBox({placeHolder: "Enter Problem ID (A/B/C..)"});
			Run(name);
		}
	)

	context.subscriptions.push(helloworld);
	context.subscriptions.push(codeforcesCnt);
	context.subscriptions.push(buildCode);
	context.subscriptions.push(runCode);
}

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	registerCommands(context);

}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
