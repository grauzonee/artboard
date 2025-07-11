import fs from 'fs/promises';
import { existsSync } from 'fs';

export const deleteImage = async (imagePath: string) => {
    await fs.unlink(imagePath);
}

export const checkImage = (imagePath: string): boolean => {
    return existsSync(imagePath);
}
