export default {
  durationConvert(i) {
    var m = Math.floor(i / 60000);
    var s = ((i % 60000) / 1000).toFixed(0);
    return m + ":" + (s < 10 ? '0' : '') + s;
  },
  artistsToString(a) {
    return a.map((object, i) => {
      if((i+1) === a.length) {
        return object.name
      } else {
        return object.name + ', ';
      }
    });
  }
}