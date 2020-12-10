import mongoose from '../config/db';
import userSchema from './userSchema';
import driverSchema from './driverSchema';
import waitingDriverSchema from './waitingDriverSchema';
import requestingUserSchema from './requestingUserSchema';
import userHistorySchema from './userHistorySchema';

mongoose.model('User', new mongoose.Schema(userSchema));
mongoose.model('Driver', new mongoose.Schema(driverSchema));
mongoose.model('WaitingDriver', new mongoose.Schema(waitingDriverSchema));
mongoose.model('RequestingUser', new mongoose.Schema(requestingUserSchema));
mongoose.model('UserHistory', new mongoose.Schema(userHistorySchema));

export default mongoose;
