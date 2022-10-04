import { Context } from '@qpoint/router'
import { UrlRewriter } from './url-rewriter'

interface MaskUrlsConfig {
  basePath? : string
}

// adapter registration
export default function rewriteHtml(config: MaskUrlsConfig = {}) {
  // return middleware
  return function run(context: Context, next: Function) {
    // extract the config
    const { basePath = '' } = config

    // attach to the rewriter
    context.htmlRewriter
      .on("a", new UrlRewriter('href', context, basePath))
      .on("link", new UrlRewriter('href', context, basePath))
      .on("img", new UrlRewriter('src', context, basePath))
      .on("script", new UrlRewriter('src', context, basePath))

    // continue along
    return next();
  }
}