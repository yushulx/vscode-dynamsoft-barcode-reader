import * as vscode from 'vscode';
import { httpsDownload } from './utils';
import * as path from 'path';

enum Template {
    URL = "https://raw.githubusercontent.com/yushulx/cmake-cpp-barcode-qrcode/main/templates/",
    SPEED = 'Speed',
    SPEED_FILE = 'speed.json',
    BALANCED = 'Balanced',
    BALANCED_FILE = 'balanced.json',
    COVERAGE = 'Coverage',
    COVERAGE_FILE = 'coverage.json',
    MORECOVERAGE = 'More Coverage',
    MORECOVERAGE_FILE = 'morecoverage.json',
    MOSTCOVERAGE = 'Most Coverage',
    MOSTCOVERAGE_FILE = 'mostcoverage.json',
}

export class ParameterManager {
    private templates: any = {};

    constructor() {
        this.templates[Template.SPEED] = Template.URL + Template.SPEED_FILE;
        this.templates[Template.BALANCED] = Template.URL + Template.BALANCED_FILE;
        this.templates[Template.COVERAGE] = Template.URL + Template.COVERAGE_FILE;
        this.templates[Template.MORECOVERAGE] = Template.URL + Template.MORECOVERAGE_FILE;
        this.templates[Template.MOSTCOVERAGE] = Template.URL + Template.MOSTCOVERAGE_FILE;
    }

    public async downloadParameterFile() {
        // Select a template file
        const answer = await vscode.window.showQuickPick([Template.SPEED, Template.BALANCED, Template.COVERAGE, Template.MORECOVERAGE, Template.MOSTCOVERAGE], { placeHolder: 'Select a template' });
        if (!answer) { return; }

        let folders = vscode.workspace.workspaceFolders;
        if (!folders) {
            vscode.window.showWarningMessage('No folder is opened.');
        }
        else {
            let des = folders[0].uri.fsPath;
            switch (answer) {
                case Template.SPEED:
                    httpsDownload(this.templates[Template.SPEED], path.join(des, Template.SPEED_FILE));
                    break;
                case Template.BALANCED:
                    httpsDownload(this.templates[Template.BALANCED], path.join(des, Template.BALANCED_FILE));
                    break;
                case Template.COVERAGE:
                    httpsDownload(this.templates[Template.COVERAGE], path.join(des, Template.COVERAGE_FILE));
                    break;
                case Template.MORECOVERAGE:
                    httpsDownload(this.templates[Template.MORECOVERAGE], path.join(des, Template.MORECOVERAGE_FILE));
                    break;
                case Template.MOSTCOVERAGE:
                    httpsDownload(this.templates[Template.MOSTCOVERAGE], path.join(des, Template.MOSTCOVERAGE_FILE));
                    break;
            }
        }
    }
}