import { cloudinaryApi } from 'next-cloudinary';

export const config = {
  cloudName: 'your_cloud_name',
  apiKey: 'your_api_key',
  apiSecret: 'your_api_secret',
};

export const api = cloudinaryApi(config);
