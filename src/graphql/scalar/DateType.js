import {GraphQLScalarType} from 'graphql';
import {Kind} from 'graphql/language';
import moment from 'moment-timezone';

const dateType = new GraphQLScalarType({
  name: 'Date',
  description: 'Date custom scalar type',
  parseValue(value) {
    return new Date(value); // Value from the client
  },
  serialize(value) {
    return moment(value).tz('America/Boise').format('YYYY-MM-DDThh:mm:ssZ'); // Value sent to the client
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return new Date(Number(ast.value)); // Ast value is always in string format
    } else if (ast.kind === Kind.STRING) {
      return new Date(ast.value);
    } else {
      console.warn(`Unknown date literal type: '${ast.kind}' for '${ast.value}'`);
    }

    return null;
  }
});

export default dateType;
