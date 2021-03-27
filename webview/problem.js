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

module.exports = {getWebViewContent};