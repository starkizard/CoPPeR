const vscode = require('vscode');
const problem = require('./webview/problem');

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

	let showWebView = vscode.commands.registerCommand(
		'vscopper.showWebView', async function(){
			let link = await vscode.window.showInputBox({placeHolder: 'Enter URL'});

			const panel = vscode.window.createWebviewPanel(
				'wannabe_sidebar',
				'heres the webview',
				vscode.ViewColumn.One,
				{}
			);

			panel.webview.html = problem.getWebViewContent(link);
		
		}
	);

	context.subscriptions.push(showWebView);
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
