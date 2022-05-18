import * as fs from 'fs';
import * as path from 'path';

export function copyFolder(src: string, des: string) {
	fs.readdir(src, (err, files) => {
		if (err) {
			return;
		}

		files.forEach(file => {
			let srcFile = path.join(src, file);
			let desFile = path.join(des, file);
			if (fs.statSync(srcFile).isDirectory()) {
				fs.mkdirSync(desFile);
				copyFolder(srcFile, desFile);
			} else {
				fs.copyFileSync(srcFile, desFile);
			}
		});
	});
}