/**
 * sad that firestore documents don't play well with apollo
 *
 * @param o
 * @return {*}
 */
module.exports = o => o && JSON.parse(JSON.stringify(o));
