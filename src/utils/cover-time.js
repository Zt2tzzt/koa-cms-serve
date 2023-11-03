function convertISO8601Time(isoTime) {
  var dateObject = new Date(isoTime);
  var year = dateObject.getFullYear();
  var month = dateObject.getMonth() + 1; // getMonth() 返回值是从0开始的
  var date = dateObject.getDate();

  // 格式化日期字符串，月和天少于10在前面填充0
  month = month < 10 ? '0' + month : month;
  date = date < 10 ? '0' + date : date;

  return `${year}-${month}-${date} 00:00:000Z`;
}

module.exports = {
  convertISO8601Time
}
