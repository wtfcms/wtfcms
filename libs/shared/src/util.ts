import { ObjectId } from '@mikro-orm/mongodb';
export const ObjectIdIsValid = (val) => {
  return ObjectId.isValid(val) && /^[a-fA-F0-9]{24}$/.test(val);
};
