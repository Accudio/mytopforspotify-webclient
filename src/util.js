export default {
  artistsToString(a) {
    return a.map((object, i) => {
      if((i+1) === a.length) {
        return object.name
      } else {
        return object.name + ', ';
      }
    });
  },
  genresToString(a) {
    for(let i = 0; i < a.length; i++) {
      let genre = a[i].split(' ');
      for(let j = 0; j < genre.length; j++) {
        genre[j] = genre[j][0].toUpperCase() + genre[j].substr(1);
      }
      a[i] = genre.join(' ')
    }
    return a.join(', ');
  }
}