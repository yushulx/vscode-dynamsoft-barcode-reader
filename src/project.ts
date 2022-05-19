import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';
import { Uri } from 'vscode';
import { copyFolder } from './utils';

enum Type {
    CONSOLE = 'Console App',
    WINFORMS = 'Windows Forms App',
    FILE = 'File Reader',
    CAMERA = 'Camera Scanner',
    GUI = 'GUI App',
}

enum FolderName {
    FOLDER_NAME_CONSOLE = 'console',
    FOLDER_NAME_WINFORMS = 'winforms',
    FOLDER_NAME_FILE = 'file',
    FOLDER_NAME_CAMERA = 'camera',
    FOLDER_NAME_GUI = 'gui',
}

export class ProjectManager {
    private samples = {
        "python": path.join(__dirname, '../res/python/'),
        "dotnet": path.join(__dirname, '../res/dotnet/'),
        "cpp": path.join(__dirname, '../res/cpp/'),
        "web": path.join(__dirname, '../res/web/'),
        "android": path.join(__dirname, '../res/android/'),
        "ios": path.join(__dirname, '../res/ios/')
    };

    async getProjectType(types: string[]) {
        const projectType = await vscode.window.showQuickPick(types, { placeHolder: 'Create a new project' });
        if (!projectType) { return ''; }
        return projectType;
    }

    async createProject(option: string) {
        // Select the project type
        let projectType: string = Type.CONSOLE;
        let root: string = '';
        let src: string = '';
        switch (option) {
            case "dotnet":
                root = this.samples.dotnet;
                projectType = await this.getProjectType([Type.CONSOLE, Type.WINFORMS]);
                break;
            case "cpp":
                root = this.samples.cpp;
                projectType = await this.getProjectType([Type.CONSOLE]);
                break;
            case "web":
                root = this.samples.web;
                projectType = await this.getProjectType([Type.FILE, Type.CAMERA]);
                break;
            case "python":
                root = this.samples.python;
                projectType = await this.getProjectType([Type.CONSOLE, Type.GUI]);
                break;
            case "android":
                root = this.samples.android;
                projectType = await this.getProjectType([Type.CAMERA]);
                break;
            case "ios":
                root = this.samples.ios;
                projectType = await this.getProjectType([Type.CAMERA]);
                break;
        }
        if (projectType === '') { return; }

        switch (projectType) {
            case Type.CONSOLE:
                src = path.join(root, FolderName.FOLDER_NAME_CONSOLE);
                break;
            case Type.WINFORMS:
                src = path.join(root, FolderName.FOLDER_NAME_WINFORMS);
                break;
            case Type.FILE:
                src = path.join(root, FolderName.FOLDER_NAME_FILE);
                break;
            case Type.CAMERA:
                src = path.join(root, FolderName.FOLDER_NAME_CAMERA);
                break;
            case Type.GUI:
                src = path.join(root, FolderName.FOLDER_NAME_GUI);
                break;
        }

        if (src === '') {
            return;
        }

        // Select the project folder
        const answer = await vscode.window.showQuickPick(['Yes', 'No'], { placeHolder: 'Do you want to create a new folder?' });
        if (!answer) { return; }

        let des: string = '';
        if (answer === "Yes") {
            des = await this.openFolder();
            if (des !== '') {
                copyFolder(src, des);
            }
        }
        else {
            let folders = vscode.workspace.workspaceFolders;
            if (!folders) {
                des = await this.openFolder();
                if (des !== '') {
                    copyFolder(src, des);
                }
            }
            else {
                des = folders[0].uri.fsPath;
                vscode.window.showInformationMessage(folders[0].uri.fsPath);
                copyFolder(src, des);
            }
        }

        if (option === 'cpp') {
            src = path.join(root, 'lib');
            let libFolder = path.join(des, 'lib');
            if (!fs.existsSync(libFolder)) {
                fs.mkdirSync(libFolder);
            }
            copyFolder(src, libFolder);

            src = path.join(root, 'include');
            let includeFolder = path.join(des, 'include');
            if (!fs.existsSync(includeFolder)) {
                fs.mkdirSync(includeFolder);
            }
            copyFolder(src, includeFolder);
        }
    }

    async openFolder() {
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
        workspace = workspaceFolderUri.fsPath;
        let projectFolder = path.join(workspace, projectName);
        if (!fs.existsSync(projectFolder)) {
            fs.mkdirSync(projectFolder);
        }

        console.log("Open " + projectFolder);
        await vscode.commands.executeCommand("vscode.openFolder", Uri.file(projectFolder), { forceNewWindow: true });

        return projectFolder;
    }
}