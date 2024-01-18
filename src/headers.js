var xml = require("xml-js");
var axios = require("axios");

function build_items(items) {
  var builder = [];
  items.forEach((item) => {
    builder.push({
      title: item[0],
      link: item[1],
      guid: item[2],
      pubDate: item[3],
      category: item[4],
    });
  });
  return builder;
}
function rehd(items) {
  const headers = {
    rss: {
      _attributes: {
        "xmlns:atom": "http://www.w3.org/2005/Atom",
        version: "2.0",
      },
      channel: {
        title: "TaigaFilter v1",
        description: "TaigaFilter v1",
        link: "taiga.primitt.dev",
        "atom:link": {
          _attributes: {
            href: "taiga.primitt.dev/rss",
            rel: "self",
            type: "application/rss+xml",
          },
        },
        item: build_items(items),
      },
    },
  };
  return headers;
}

module.exports = { rehd: rehd };
