import deleteBracketMutation from "./mutation/deleteBracketMutation";
import versionQuery from './query/versionQuery';
import dateType from './scalar/DateType';

// convert parameters to object for succinct spread usage
const useObjectParams = func => (parent, args, context, info) => func({ parent, args, context, info });

// change functions from (parent, args, context, info) to be ({parent, args, context, info})
const connectObjectParams = obj => {
  const keys = Object.keys(obj);

  keys

    // skip Date since it's its own resolver type (GraphQLScalarType; not standard 4 parameter)
    .filter(key => key !== 'Date')

    .forEach(key => {
      if (obj[key] && obj[key] instanceof Object) {
        if (['[object Function]', '[object AsyncFunction]'].includes({}.toString.call(obj[key]))) {
          obj[key] = useObjectParams(obj[key])
        } else {
          connectObjectParams(obj[key]);
        }
      }
    });

  return obj;
};

const resolverFunctions = {
  Query: {
    version: versionQuery,
  },

  Date: dateType,
};

export default connectObjectParams(resolverFunctions);
