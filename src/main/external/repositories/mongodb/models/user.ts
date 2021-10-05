import { CollectionNames, Genders, User, UserRoles } from '../../../../../constants';
import { incTotalCount } from '../helpers/entity-model-fn';
import { MongoHelper } from '../helpers/mongo-helper';
import { UserDocument } from './model.types';
import SchemaConstructor from './schema-constructor';
import { resetPasswordSchema } from './sub-schema';

const userSchema = SchemaConstructor({
  [User.Name]: { type: String, required: true, trim: true },
  [User.Email]: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  [User.Phone]: {
    type: String,
    trim: true,
    required: true,
  },
  [User.Gender]: { type: String, enum: Object.values(Genders), required: true },
  [User.Password]: { type: String, required: true, select: false },
  [User.Role]: {
    type: String,
    required: true,
    trim: true,
    default: UserRoles.Operator,
    enum: Object.values(UserRoles),
  },
  resetPassword: { type: resetPasswordSchema, required: false, select: false },
});

userSchema.set('toObject', {
  virtuals: true,
});

userSchema.set('toJSON', {
  virtuals: true,
});

userSchema.post('save', incTotalCount);

export default MongoHelper.getModel<UserDocument>(CollectionNames.Users, userSchema);
