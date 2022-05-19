// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { ParameterManager } from './parameter';
import { ProjectManager } from './project';

const projectManager = new ProjectManager();
const parameterManager = new ParameterManager();

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	context.subscriptions.push(...[
		vscode.commands.registerCommand('dbr.dotnet', async () => {
			projectManager.createProject('dotnet');
		}),
		vscode.commands.registerCommand('dbr.cpp', async () => {
			projectManager.createProject('cpp');
		}),
		vscode.commands.registerCommand('dbr.web', async () => {
			projectManager.createProject('web');
		}),
		vscode.commands.registerCommand('dbr.python', async () => {
			projectManager.createProject('python');
		}),
		vscode.commands.registerCommand('dbr.android', async () => {
			projectManager.createProject('android');
		}),
		vscode.commands.registerCommand('dbr.ios', async () => {
			projectManager.createProject('ios');
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
		vscode.commands.registerCommand('dbr.param', async () => {
			parameterManager.downloadParameterFile();
		}),
	]);
}

// this method is called when your extension is deactivated
export function deactivate() { }
