export function dateFormate(date, fmt) {
  if (new RegExp("(Y+)").test(fmt)) {
    let source = RegExp.$1; // YYYY
    let origin = date.getFullYear().toString();
    origin = origin.substr(4 - source.length, source.length); // 2016
    fmt = fmt.replace(source, origin);
  }
  let obj = {
    "M+": date.getMonth() + 1, // 月份
    "d+": date.getDate(), // 日
    "H+": date.getHours(), // 小时
    "m+": date.getMinutes(), // 分
    "s+": date.getSeconds(), // 秒
    "q+": Math.floor((date.getMonth() + 3) / 3), // 季度
    "S": date.getMilliseconds() // 毫秒
  };
  for (var key in obj) {
    if (new RegExp("(" + key + ")").test(fmt)) {
      let source = RegExp.$1;
      let origin = obj[key].toString();
      if (source.length > 1) {
        origin = ("00" + origin).substr(origin.length);
      }
      fmt = fmt.replace(source, origin);
    }
  }
  return fmt;
}