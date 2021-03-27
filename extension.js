const vscode = require('vscode');
const { runFileCreator } = require('./fileCreator');
const problem = require('./webview/problem');

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
			const panel = vscode.window.createWebviewPanel(
				'wannabe_sidebar',
				'heres the webview',
				vscode.ViewColumn.One,
				{}
			);

			panel.webview.html = problem.getWebViewContent(link);
		
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
