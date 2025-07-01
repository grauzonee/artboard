import fs from 'fs/promises';

export const deleteImage = async (imagePath: string) => {

    await fs.unlink(imagePath);
} 
