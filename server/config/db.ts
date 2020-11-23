import mongoose from 'mongoose';
import Config from './index';

mongoose.connect(`mongodb://${Config.DB_USER}:${Config.DB_PASSWORD}@${Config.DB_HOST}/${Config.DB_NAME}`, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

export default mongoose;
