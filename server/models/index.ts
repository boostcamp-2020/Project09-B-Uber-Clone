import mongoose from '../config/db';
import userSchema from './userSchema';
import driverSchema from './driverSchema';
import waitingDriverSchema from './waitingDriverSchema';
import requestingUserSchema from './requestingUserSchema';

mongoose.model('User', new mongoose.Schema(userSchema));
mongoose.model('Driver', new mongoose.Schema(driverSchema));
mongoose.model('WaitingDriver', new mongoose.Schema(waitingDriverSchema));
mongoose.model('RequestingUser', new mongoose.Schema(requestingUserSchema));

export default mongoose;
