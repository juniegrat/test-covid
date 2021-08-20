export default function toDateTime(secs) {
  var t = new Date(1970, 0, 1, 2); // Epoch
  t.setSeconds(secs);
  return t;
}
