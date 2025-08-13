import fs from 'fs/promises';
import { existsSync } from 'fs';
import { getConfigValue } from '@helper/configHelper';

export const deleteImage = async (imagePath: string) => {
    await fs.unlink(imagePath);
}

export const checkImage = (imagePath: string): boolean => {
    return existsSync(imagePath);
}

export const sanitizeImageUrl = (imageUrl: string): string => {
    console.log(imageUrl.replace(getConfigValue('HOST') + '/', ''));
    return imageUrl.replace(getConfigValue('HOST') + '/', '');
}
