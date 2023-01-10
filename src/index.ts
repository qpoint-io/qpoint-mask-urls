import { Context } from '@qpoint/router'
import { UrlRewriter } from './url-rewriter'

export interface MaskUrlsConfig {
  basePath?: string   // if the site routing is pinned to a basePath, like site.com/docs or site.com/blog
  absolute?: boolean  // should all links be converted to absolute, like //www.site.com/products/1
  edgeUrl? : string   // use this edge url, rather than the url from the request
  appUrl?  : string   // use this app url, rather than the url from the proxy
}

// adapter registration
export default function rewriteHtml(config: MaskUrlsConfig = {}) {
  // return middleware
  return function run(ctx: Context, next: Function) {
    // grab the response headers
    const headers = ctx.res.headers;

    // extract the content-type from the response
    const contentType = headers.get("Content-Type") || headers.get('content-type');

    // no need to run if this isn't html
    if (!contentType?.startsWith("text/html"))
      return next()

    // let's check to see if we have any dynamic config
    if (ctx.state['mask-urls.config'])
      config = ctx.state['mask-urls.config'] as MaskUrlsConfig

    // attach to the rewriter
    ctx.htmlRewriter
      .on("a", new UrlRewriter('href', ctx, config))
      .on("link", new UrlRewriter('href', ctx, config))
      .on("img", new UrlRewriter('src', ctx, config))
      .on("script", new UrlRewriter('src', ctx, config))

    // continue along
    return next();
  }
}