import API from '../server/models/API'
import { Model } from 'sequelize'

declare module "*.png";

declare module 'sequelize' {
    interface Model {
      hasAPI: (
        api: API | number
      ) => Promise<boolean>;
      addAPI: (
        api: API | number,
        options?: any
      ) => Promise<void>;
    }
  }