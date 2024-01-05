import Endpoint from "@qpoint/endpoint";
import proxy from "@qpoint/proxy";
import maskUrls from "@qpoint/mask-urls";
import rewriteHtml from "@qpoint/rewrite-html";

export default new Endpoint()
  // proxy to qpoint.io
  // .use(proxy({ appUrl: "https://qpoint.io" }))

  // proxy to www.newegg.com
  // .use(proxy({ appUrl: "https://www.newegg.com" }))

  .use(proxy({ appUrl: "https://edge.qpoint.io" }))

  // mask the urls to match the proxy endpoint
  .use(maskUrls({
    absolute: true,
    // maskAssets: true,
  }))

  // activate the rewrite
  .use(rewriteHtml({}))
