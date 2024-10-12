// cloudinary.js

import axios from 'axios';

const CLOUDINARY_UPLOAD_PRESET = process.env.CLOUDINARY_UPLOAD_PRESET; // Replace with your preset
const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME || "dgz5bgdzc";       // Replace with your cloud name
const CLOUDINARY_API_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;

/**
 * Upload an image to Cloudinary
 * @param {File} imageFile - The image file to upload
 * @returns {Promise<string>} - The URL of the uploaded image
 */
export const uploadImageToCloudinary = async (imageFile: File) => {
    const formData = new FormData();
    formData.append('file', imageFile);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET || "db0zguvf");
    formData.append("folder", "takeoff");

    try {
        const response = await axios.post(CLOUDINARY_API_URL, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        // Return the URL of the uploaded image
        return response.data.secure_url;
    } catch (error) {
        console.error('Cloudinary upload error:', error);
        throw new Error('Image upload failed');
    }
};
