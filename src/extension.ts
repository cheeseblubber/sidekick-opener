// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.workspace.onDidOpenTextDocument(async (document) => {
    // skip if it doesn't match file regex
    if (!isMatchingFile(document.fileName)) {
      return;
    }

    vscode.window.showTextDocument(document, {
      viewColumn: vscode.ViewColumn.Two,
    });

    //Closing with tabGroup
    const tabs: vscode.Tab[] = vscode.window.tabGroups.all
      .filter((tg) => tg.viewColumn === vscode.ViewColumn.One)
      .map((tg) => tg.tabs)
      .flat();

    const foundTab = tabs.find(
      (tab) =>
        (tab as any)?.input.uri.path === document.uri.path &&
        tab.group.viewColumn === vscode.ViewColumn.One
    );

    if (foundTab) {
      vscode.window.tabGroups.close(foundTab);
    }

    context.subscriptions.push(disposable);
  });
}

// Function to check if the file matches specified patterns
function isMatchingFile(fileName: string): boolean {
  // Add or modify patterns here to extend functionality
  const patterns = [
    /\.scss$/, // Matches .scss files
    /\.css$/, // Matches .css files
    /\.test\.(tsx|ts)$/, // Matches .test.tsx and .test.ts files
    /\.spec\.(tsx|ts)$/, // Matches .test.tsx and .test.ts files
    // Additional patterns can be added here as needed
  ];

  return patterns.some((pattern) => pattern.test(fileName));
}
// This method is called when your extension is deactivated
export function deactivate() {}
