# FOSJsRoutingBundle

Open up the base layout: `app/Resources/views/base.html.twig`. Scroll down to the
bottom. In a perfect world, we would only have one JS file: `layout.js`. But, we
still have two other script tags: one that loads the `router.js` from FOSJsRoutingBundle,
and a second one that populates that with routes.

Thanks to these, there is a global `Routing` variable, which we use in `RepLogApp.js`
to generate URLs for our routes: `Routing.generate()` and then the route name.

This is the *last* place where we are using global variables... and I want to fix
that!

## Trying to require router.js

The curious thing about the `router.js` file is that it lives in a PHP package. Yea,
it doesn't live in `node_modules`. Nope, it lives in
`vendor/friendsofsymfony/jsroutingbnundle/resources/public/js/router.js`. Yep, that's
the exact file we're currently including in `base.html.twig`.

Cool! So, let's just require it like normal! `const Routing = require()`, then...
well, a very ugly path:
`../../../vendor/friendsofsymfony/jsrouting-bundleRresources/public/js/router.js`.

Phew! Ugly... but makes sense, right? Well try it. Refresh!

Uh oh... it did *not* like that:

> Type error: Cannot read property navigator of undefined

It's coming from `router.js`, line 8. Huh. If you look at this file, well, it's
minified... so it's pretty confusing. This file is built using something called
the Google Closure... which basically means that it does *not* play nice with
`require`. I *hope* this will be fixed in the library soon - there's a pull request
open for it. But right now... well, you can't require this.

## Faking the Module

So... yea... we *need* to keep these two script tags in our base layout for now.
It's not ideal, but we will live.

But! It *does* bother me that - inside of `RepLogApp.js` - I need to *rely* on this
global variable. I *really* want this file to require *everything* it needs. So, I
use a trick!

Check this out: inside `Components`, create a new file called `Routing.js`. Inside,
just `module.exports = window.Routing`.

I'll add a comment above this. With this, yes, we *do* need to remember to put the
`router.js` script tag in our layout. But now, thanks to this module, we can *at least*
correctly use require statements everywhere else.

I mean, in `RepLogApp.js`, we can say `const Routing = require('./Routing')`. From
the perspective of *this* file, we're not relying on global variables. And hey! When
FOSJsRoutingBundle plays nicer in the future, we can easily update things.

Refresh to make sure it works. Yes! Ok, let's move onto something completely different:
replacing `require` with the much trendier `import`.
