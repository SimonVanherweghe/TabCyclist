// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");

let intervalId = null;

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  // The command has been defined in the package.json file
  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    "cycletabs.start",
    function() {
      // The code you place here will be executed every time your command is executed

      const interval =
        vscode.workspace.getConfiguration("tabcyclist").get("interval") || 5;
      if (!intervalId) {
        intervalId = setInterval(() => {
          vscode.commands.executeCommand("workbench.action.nextEditor");
        }, interval * 1000);
        vscode.window.showInformationMessage("Started cycling 🚴‍");
      } else {
        vscode.window.showWarningMessage(
          "There is already a cyclist started. 🚵‍"
        );
      }
    }
  );

  let disposable2 = vscode.commands.registerCommand(
    "cycletabs.stop",
    function() {
      // The code you place here will be executed every time your command is executed
      intervalId = clearInterval(intervalId);
      vscode.window.showInformationMessage("Stopped cycling 🏁");
    }
  );

  context.subscriptions.push(disposable);
  context.subscriptions.push(disposable2);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {
  clearInterval(intervalId);
}

module.exports = {
  activate,
  deactivate
};
