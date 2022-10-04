import { Context } from '@qpoint/router'

// simple url rewriter for various attributes
export class UrlRewriter {
  attribute: string
  basePath : string
  edgeBase : string
  appBase  : string


  constructor(attribute: string, context: Context, basePath: string) {
    // extract the URLs
    const edgeUrl = new URL(context.request.url)
    const appUrl = new URL(context.proxy.url)

    // set the internal state
    this.attribute = attribute
    this.basePath = basePath
    this.edgeBase = `${edgeUrl.origin}${basePath}`
    this.appBase = appUrl.origin
  }

  element(element: Element) {
    const attribute: string = element.getAttribute(this.attribute)
    if (attribute) {
      let value: string;

      // handle relative and absolute urls
      if (attribute.startsWith('/') && !attribute.startsWith(this.basePath)) {
        value = this.basePath + attribute
      } else {
        value = attribute.replace(this.appBase, this.edgeBase)
      }

      element.setAttribute(
        this.attribute,
        value,
      )
    }
  }
}