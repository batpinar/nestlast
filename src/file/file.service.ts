import { Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class FileService {
    async saveFile(file: Express.Multer.File): Promise<string> {
        const uploadPath = path.join(__dirname, '..', '..', 'uploads');
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath);
        }
        const filePath = path.join(uploadPath, file.originalname);
        fs.writeFileSync(filePath, file.buffer);
        return filePath; // Return the file path or URL as needed
        // Simulate saving the file and returning the file path
    }
}
