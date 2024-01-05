# qpoint-mask-urls

A Qpoint adapter for masking URLs behind a reverse proxy

## Overview

When proxying requests upstream, html links are generated for the upstream location.

Consider the following:

An app hosted on vercel would likely produce html with a link URL: https://qpoint-site.vercel.app/about-us

The proxy needs to mask the url to match the outer domain URL: https://qpoint.io/about-us

## Usage

```ts
import Endpoint from "@qpoint/endpoint";
import proxy from "@qpoint/proxy";
import maskUrls from "@qpoint/mask-urls";
import rewriteHtml from "@qpoint/rewrite-html";

export default new Endpoint()
  // proxy to qpoint.io
  .use(proxy({ appUrl: "https://qpoint.io" }))

  // mask the urls to match the proxy endpoint
  .use(maskUrls())

  // activate the rewrite
  .use(rewriteHtml())
```

## Installation

```bash
npm add @qpoint/mask-urls
```

## Advanced

`basePath` can be provided with the config if the upstream app is nested within the path.
