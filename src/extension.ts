// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { Uri } from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

const samples = {
	"python": path.join(__dirname, '../res/python/'),
	"dotnet": path.join(__dirname, '../res/dotnet/'),
	"cpp": path.join(__dirname, '../res/cpp/'),
	"web": path.join(__dirname, '../res/web/'),
	"android": path.join(__dirname, '../res/android/'),
	"ios": path.join(__dirname, '../res/ios/')
};

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	context.subscriptions.push(...[
		vscode.commands.registerCommand('dbr.dotnet', async () => {
			createProject(samples['dotnet']);
		}),
		vscode.commands.registerCommand('dbr.cpp', async () => {
			createProject(samples['cpp']);
		}),
		vscode.commands.registerCommand('dbr.web', async () => {
			createProject(samples['web']);
		}),
		vscode.commands.registerCommand('dbr.python', async () => {
			createProject(samples['python']);
		}),
		vscode.commands.registerCommand('dbr.android', async () => {
			createProject(samples['android']);
		}),
		vscode.commands.registerCommand('dbr.ios', async () => {
			createProject(samples['ios']);
		}),
		vscode.commands.registerCommand('dbr.doc', async () => {
			vscode.env.openExternal(vscode.Uri.parse('https://www.dynamsoft.com/barcode-reader/introduction/?ver=latest'));
		})
	]);
}

function copyFolderSync(src: string, des: string) {
	fs.readdir(src, (err, files) => {
		if (err) {
			return;
		}

		files.forEach(file => {
			let srcFile = path.join(src, file);
			let desFile = path.join(des, file);
			if (fs.statSync(srcFile).isDirectory()) {
				fs.mkdirSync(desFile);
				copyFolderSync(srcFile, desFile);
			} else {
				fs.copyFileSync(srcFile, desFile);
			}
		});
	});
}

async function openFolder() {
	const projectName = await vscode.window.showInputBox({
		prompt: 'Enter a name for the new project',
		validateInput: (value: string): string => {
			if (!value.length) {
				return 'A project name is required';
			}
			return '';
		}
	});
	if (!projectName) {
		return '';
	}

	let workspace = '';
	const folderUris = await vscode.window.showOpenDialog({ canSelectFolders: true, canSelectFiles: false, canSelectMany: false, openLabel: 'Select folder' });
	if (!folderUris) {
		return '';
	}

	let workspaceFolderUri = folderUris[0];
	console.log(workspaceFolderUri);
	vscode.commands.executeCommand("vscode.openFolder", workspaceFolderUri);
	vscode.window.showInformationMessage(workspaceFolderUri.fsPath);
	workspace = workspaceFolderUri.fsPath;
	let projectFolder = path.join(workspace, projectName);
	if (!fs.existsSync(projectFolder)) {
		fs.mkdirSync(projectFolder);
	}

	vscode.commands.executeCommand("vscode.openFolder", Uri.file(projectFolder));

	return projectFolder;
}

async function createProject(src: string) {
	const answer = await vscode.window.showQuickPick(['Yes', 'No'], { placeHolder: 'Do you want to create a new folder?' });
	if (!answer) { return false; }

	if (answer === "Yes") {
		const folderPath = await openFolder();
		if (folderPath !== '') {
			copyFolderSync(src, folderPath);
		}
	}
	else {
		let folders = vscode.workspace.workspaceFolders;
		if (!folders) {
			const folderPath = await openFolder();
			if (folderPath !== '') {
				copyFolderSync(src, folderPath);
			}
		}
		else {
			vscode.window.showInformationMessage(folders[0].uri.fsPath);
			copyFolderSync(src, folders[0].uri.fsPath);
		}
	}

}

// this method is called when your extension is deactivated
export function deactivate() { }
