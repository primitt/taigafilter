var convert = require("xml-js");
var axios = require("axios");
var headers = require("./headers.js");
var anilist = require("anilist-node");

const Anilist = new anilist();

async function decode(input) {
  const get_xml = await axios.get(input).then(async (response) => {
    const xml = await response.data;
    const jsobj = convert.xml2js(xml, { compact: true, spaces: 4 });
    return jsobj;
  });
  return get_xml;
}
function encode(input) {
  return convert.js2xml(input, { compact: true, spaces: 4 });
}
async function filter(url) {
  var decoded_xml = await decode(url);
  var items = [];
  var currently_watching = await Anilist.lists.anime("primitt").then((data) => {
    var watching = [];
    for (var i = 0; i < data.length; i++) {
      if (data[i].name == "Watching") {
        for (var j = 0; j < data[i].entries.length; j++) {
          watching.push(data[i].entries[j]);
        }
      }
    }
    return watching;
  });
  console.log(currently_watching);
  decoded_xml.rss.channel.item.forEach((item) => {
    // TODO: Build Filter!
    currently_watching.forEach((anime) => {
      if (item.title._text.includes(anime.media.title.romaji)) {
        items.push([
          item.title._text,
          item.link._text,
          item.guid._text,
          item.pubDate._text,
          item.category._text,
        ]);
      }
    });
  });
  return items;
}
module.exports = { decode: decode, encode: encode, filter: filter };
