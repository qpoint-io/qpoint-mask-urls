import Router from "@qpoint/router";
import proxy from "@qpoint/proxy";
import maskUrls from "@qpoint/mask-urls";
import rewriteHtml from "@qpoint/rewrite-html";

export default new Router()
  // proxy to qpoint.io
  .use(proxy({ appUrl: "https://qpoint.io" }))

  // proxy to www.newegg.com
  // .use(proxy({ appUrl: "https://www.newegg.com" }))

  // mask the urls to match the proxy endpoint
  .use(maskUrls({
    absolute: true,
    // maskAssets: true,
  }))

  // activate the rewrite
  .use(rewriteHtml({}))
