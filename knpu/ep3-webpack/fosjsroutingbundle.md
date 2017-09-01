# FOSJsRoutingBundle

Open up the base layout: `app/Resources/views/base.html.twig`. Scroll down to the
bottom:

[[[ code('c1f423c15a') ]]]

In a perfect world, we would only have one JS file: `layout.js`. But, we still
have two other script tags that are cramping my style. One loads `router.js`
from FOSJsRoutingBundle, and the second populates that with the actual routes.

Thanks to these, there is a *global* `Routing` variable, which we use in `RepLogApp.js`
to generate URLs: `Routing.generate()` and then the route name:

[[[ code('817f6be907') ]]]

This is the *last* place where we are using global variables... and I want to fix
that!

## Trying to require router.js

The curious thing about the `router.js` file is that it lives in a PHP package. Instead
of living in `node_modules`, it lives at
`vendor/friendsofsymfony/jsrouting-bundle/Resources/public/js/router.js`. This is
the exact file we're currently including in `base.html.twig`.

Cool! So, let's just require it like normal! `const Routing = require()`, then...
well, a very ugly path:
`../../../vendor/friendsofsymfony/jsrouting-bundle/Resources/public/js/router.js`:

[[[ code('73de26e8bd') ]]]

Phew! Long, gross-looking... but it makes sense. Try it. Refresh!

Uh oh... it did *not* like that:

> Type error: Cannot read property navigator of undefined

It's coming from `router.js`, line 8. Huh. If you look at this file, well, it's
minified... so it's pretty confusing. This file is built using something called
the Google Closure compiler... which basically means that it does *not* play nicely
with `require()`. I *hope* this will be fixed in the library soon - there's a pull
request open for it. But right now... well, there is no simple way to `require()` it.

***TIP
It *is* possible to `require()` the file... but it takes some work. See
[bit.ly/fosjsroutingbundle-require][fosjsroutingbundle-require] if you're
curious.
***

## Faking the Module

So... yea... we *need* to keep these two script tags in our base layout for now.
It's not ideal, but we'll survive.

But! It *does* bother me that - inside `RepLogApp.js` - I am *relying* on this
global variable. I *really* want this file to require *everything* it needs. So, I
use a trick!

Check this out: inside `Components`, create a new file called `Routing.js`. And inside
that, just `module.exports = window.Routing`:

[[[ code('40e6248111') ]]]

I'll add a comment above this:

[[[ code('d2b9e40ece') ]]]

With this, yes, we *do* need to remember to put the `router.js` script tag in our
layout. But now, we can *at least* correctly use require statements everywhere else.

I mean, in `RepLogApp.js`, we can say `const Routing = require('./Routing')`:

[[[ code('67e3e33180') ]]]

From the perspective of *this* file, we're not relying on any global variables.
And hey! When FOSJsRoutingBundle plays nicer in the future, we can easily update things.

Refresh to make sure it works. Yes! Ok, let's move onto something completely different:
requiring *partial* libraries... and then... replacing `require()` with the much trendier
`import`.


[fosjsroutingbundle-require]: http://bit.ly/fosjsroutingbundle-require
