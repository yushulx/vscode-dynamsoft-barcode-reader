// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { Manager } from './project';

let manager = new Manager();

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	context.subscriptions.push(...[
		vscode.commands.registerCommand('dbr.dotnet', async () => {
			manager.createProject('dotnet');
		}),
		vscode.commands.registerCommand('dbr.cpp', async () => {
			manager.createProject('cpp');
		}),
		vscode.commands.registerCommand('dbr.web', async () => {
			manager.createProject('web');
		}),
		vscode.commands.registerCommand('dbr.python', async () => {
			manager.createProject('python');
		}),
		vscode.commands.registerCommand('dbr.android', async () => {
			manager.createProject('android');
		}),
		vscode.commands.registerCommand('dbr.ios', async () => {
			manager.createProject('ios');
		}),
		vscode.commands.registerCommand('dbr.doc', async () => {
			vscode.env.openExternal(vscode.Uri.parse('https://www.dynamsoft.com/barcode-reader/introduction/?ver=latest'));
		}),
		vscode.commands.registerCommand('dbr.demo', async () => {
			vscode.env.openExternal(vscode.Uri.parse('https://demo.dynamsoft.com/barcode-reader/'));
		}),
		vscode.commands.registerCommand('dbr.about', async () => {
			vscode.env.openExternal(vscode.Uri.parse('https://www.dynamsoft.com/barcode-reader/overview/'));
		}),
	]);
}

// this method is called when your extension is deactivated
export function deactivate() { }
