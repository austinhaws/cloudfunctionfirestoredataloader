import bracketDao from "../../dao/bracketDao/bracketDao";

export default async ({args: {bracketId}}) => {
  await bracketDao.deleteBracket({id: bracketId});
  return bracketId;
}
