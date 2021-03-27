const vscode = require('vscode');

function registerCommands(context){
	let helloworld = vscode.commands.registerCommand(
		'vscopper.helloWorld', function(){
			vscode.window.showInformationMessage('Hello World from CoPPer - CP for VSCode!');
		}
	);
	
	let codeforcesCnt = vscode.commands.registerCommand(
		'vscopper.codeforcesContest', async function(){
			let link = await vscode.window.showInputBox({placeHolder: 'Enter URL'});

			const panel = vscode.window.createWebviewPanel(
				'wannabe_sidebar',
				'heres the webview',
				vscode.ViewColumn.One,
				{}
			);

			panel.webview.html = getWebViewContent(link);
		}
	);

	context.subscriptions.push(helloworld);
	context.subscriptions.push(codeforcesCnt);
}

function getWebViewContent(link) {
	return `<!DOCTYPE html>
  <html lang="en">
  <head>
	  <meta charset="UTF-8">
	  <meta name="viewport" content="width=device-width, initial-scale=1.0">
	  <title>heres the webview</title>
  </head>
  <body>
	  <h1>Hey you typed ${link}</h1>
  </body>
  </html>`;
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
