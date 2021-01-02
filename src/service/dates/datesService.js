import moment from "moment";

export default {
  /**
   * test NOW is <= a specific date
   *
   * @param testDate string|undefined|null the date to test
   * @return {boolean} true if the NOW is before the testDate
   */
  isNowSameOrBeforeDate: testDate => testDate && moment().isSameOrBefore(moment(testDate, moment.ISO_8601)),
  isNowAfterDate: testDate => testDate && moment().isAfter(moment(testDate, moment.ISO_8601)),
};
