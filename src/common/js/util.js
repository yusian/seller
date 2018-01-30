/**
 * 解析url参数
 * @exapmle ?id=12345&userId=a
 * @retrun Object {id:12345,userId:a}
 */
export function urlParse() {
  let search = window.location.search;
  if (!search) search = '?id=12345';
  let obj = {};
  let reg = RegExp('[?&][^?&]+=[^?&]+', 'g');
  let arr = search.match(reg);
  arr.forEach(str => {
    let keyValues = str.substr(1).split("=");
    let key = keyValues[0];
    let val = keyValues[1];
    obj[key] = val;
  })
  return obj;
}
