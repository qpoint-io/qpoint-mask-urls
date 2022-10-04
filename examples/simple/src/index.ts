import Router from "@qpoint/router";
import proxy from "@qpoint/proxy";
import maskUrls from "@qpoint/mask-urls";
import rewriteHtml from "@qpoint/rewrite-html";

export default new Router()
  // proxy to qpoint.io
  .use(proxy({ appUrl: "https://qpoint.io" }))

  // mask the urls to match the proxy endpoint
  .use(maskUrls())

  // activate the rewrite
  .use(rewriteHtml({}))
