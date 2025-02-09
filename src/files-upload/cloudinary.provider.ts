import { v2 } from 'cloudinary';
import { configEnvs } from '../config/env';
/* import { CLOUDINARY } from './constants'; */

export const CloudinaryProvider = {
  provide: 'CLOUDINARY',
  useFactory: () => {
    return v2.config({
      cloud_name: configEnvs.cloudinaryName,
      api_key: configEnvs.cloudinaryApiKey,
      api_secret: configEnvs.cloudinaryApiSecret,
    });
  },
};
