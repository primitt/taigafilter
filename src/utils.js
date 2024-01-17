var convert = require("xml-js");
var axios = require("axios");

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

module.exports = { decode: decode, encode: encode };
