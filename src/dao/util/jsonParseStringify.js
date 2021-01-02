/**
 * sad that firestore documents don't play well with apollo
 *
 * @param o
 * @return {*}
 */
export default o => o && JSON.parse(JSON.stringify(o));
