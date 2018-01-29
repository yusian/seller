/**
 * 数据存取
 */
export function saveToLocal(id, key, value) {
  let seller = localStorage.__seller__;
  if (!seller) seller = '{}';
  seller = JSON.parse(seller);
  if (!seller[id]) seller[id] = {};
  seller[id][key] = value;
  localStorage.__seller__ = JSON.stringify(seller);
}

export function loadFromLocal(id, key, def) {
  let seller = localStorage.__seller__;
  if (!seller) return def;
  seller = JSON.parse(seller);
  if (!seller[id]) return def;
  return seller[id][key] || def;
}