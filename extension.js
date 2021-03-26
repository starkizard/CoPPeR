const vscode = require('vscode');

function registerCommands(context){
	let helloworld = vscode.commands.registerCommand(
		'vscopper.helloWorld', function(){
			vscode.window.showInformationMessage('Hello World from CoPPer - CP for VSCode!');
		}
	);
	
	let codeforcesCnt = vscode.commands.registerCommand(
		'vscopper.codeforcesContest', async function(){
			let prms = await vscode.window.showInputBox({placeHolder: 'Enter contest URL'});
			vscode.window.showInformationMessage(prms+ " is the url supplied");
		}
	);
	context.subscriptions.push(helloworld);
	context.subscriptions.push(codeforcesCnt);
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
