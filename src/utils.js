var convert = require("xml-js");
var axios = require("axios");
var headers = require("./headers.js");

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
async function filter(url){
  var decoded_xml = await decode(url);
  var items = [];
  decoded_xml.rss.channel.item.forEach((item) => {
    items.push([item.title._text, item.link._text, item.guid._text, item.pubDate._text, item.category._text])
  });
  return items;
}
module.exports = { decode: decode, encode: encode, filter: filter };
