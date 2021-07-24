// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log(
    'Congratulations, your extension "comment-cleaner" is now active!'
  );

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    "comment-cleaner.clearComments",
    () => {
      // The code you place here will be executed every time your command is executed
      // Display a message box to the user

      const document = vscode.window.activeTextEditor?.document;

      let currentLanguage = document?.languageId;

      let currentFile = vscode.window.activeTextEditor?.document;

      const firstPosition = new vscode.Position(0, 0);
      const lastPosition = new vscode.Position(
        document!.lineCount,
        document?.lineAt(document.lineCount).text.length!
      );

      const fullRange = new vscode.Range(firstPosition, lastPosition);

      const fileContent = currentFile?.getText(fullRange);

      console.log(fileContent);

      // let lineCount = vscode.window.activeTextEditor?.document.lineCount;

      let commentRegex: RegExp;

      switch (currentLanguage) {
        case "html":
          commentRegex = /(<!--)+.+(-->)/;
          // vscode.window.activeTextEditor?.edit(editor => {
          //   editor.delete(
          //     new vscode.Range(
          //       new vscode.Position(0, 0),
          //       new vscode.Position(lineCount)
          //     )
          //   );
          // });
          break;

        default:
          break;
      }

      vscode.window.showInformationMessage(
        `Comments successfully cleared for ${currentFile?.fileName}`
      );
    }
  );

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
