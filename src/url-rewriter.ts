import { Context } from '@qpoint/endpoint'
import { MaskUrlsConfig } from '.'

interface LinkPattern {
  from: string
  to: string
}

// simple url rewriter for various attributes
export class UrlRewriter {
  attribute: string
  patterns: LinkPattern[]

  constructor(attribute: string, ctx: Context, config: MaskUrlsConfig) {
    // extract the config
    let { edgeUrl, appUrl, basePath, absolute } = config

    // if edgeUrl wasn't provided, let's grab it from the request
    if (!edgeUrl)
      edgeUrl = ctx.req.url

    // if appUrl wasn't provided, let's grab it from the proxy
    if (!appUrl)
      appUrl = ctx.pxy.url

    // basePath should be an empty string, at the least
    if (!basePath)
      basePath = ''

    // extract the URLs
    const edge = new URL(edgeUrl)
    const app = new URL(appUrl)

    // generate the link patterns
    this.patterns = [
      // https://appUrl.com/path
      { from: `${app.origin}`, to: `${edge.origin}${basePath}` },

      // //appUrl.com/path
      { from: `//${app.host}`, to: `//${edge.host}${basePath}` },

      // /path
      { from: `/`, to: `${ absolute ? '//' + edge.host : '' }/${basePath}` }
    ]

    // set the attribute
    this.attribute = attribute
  }

  element(element: Element) {
    const attribute: string = element.getAttribute(this.attribute)

    // nothing to do if the html element doesn't have the attribute containing the link
    if (!attribute) {
      return
    }

    // run through the link patterns and adjust accordingly
    for (const pattern of this.patterns) {
      if (attribute.startsWith(pattern.from)) {
        // update the attribute value
        element.setAttribute(this.attribute, attribute.replace(pattern.from, pattern.to))

        // return
        return
      }
    }
  }
}
