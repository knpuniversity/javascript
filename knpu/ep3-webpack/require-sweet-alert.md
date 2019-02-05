# Requiring SweetAlert2

Hey! We can install and *require* third-party libraries. That's *amazing*! And it
makes our code more reliable: we do *not* need to *hope* that someone remembered
to include `jQuery` on this page.

`RepLogApp` also depends on two other vendor libraries: `Routing` from FOSJsRoutingBundle
and SweetAlert2:

[[[ code('847d46acea') ]]]

Let's save Routing for later and skip straight to SweetAlert.

It's the *exact* same situation as jQuery, except that - this time - the script tag
is included on *this* specific page, not in the layout. Open
`app/Resources/views/lift/index.html.twig`. At the bottom, yep! There is the `script`
tag for SweetAlert:

[[[ code('b2379d3f1a') ]]]

We do *not* want that anymore!

First, we need to download SweetAlert via Yarn. If you're not sure about the name
of a package, check out [https://npms.io/][npms]. Search for "SweetAlert2".
The first looks like a good match and... when we click it... yep! This is the exact
library we're using.

So go get it peeps! Find your terminal and run:

```terminal
yarn add sweetalert2@6.6.6 --dev
```

***TIP
To strictly follow the tutorial, please, make sure you install exactly the same 
`@6.6.6` version of SweetAlert2.
***

## Require sweetalert2

Perfect! Back in `RepLogApp`, add `const swal = require('sweetalert2')`. Then, remove
the extra `swal` from the top of the self-executing function and on the bottom: there's
no need for that complexity:

[[[ code('330b1d6d0e') ]]]

And guess what! SweetAlert is *only* used by `RepLogApp`... so we can safely remove
the `script` tag from the template. Woohoo!

Try it: head back to LiftStuff and refresh. Yes! It still loads!

But when we hit "Delete"... woh... something isn't right: it looks like *I* designed
this... which you do *not* want. And... I can't hit "Cancel". What's going on here?

## When JS needs CSS

I'll open up my debugger. Huh... no errors. This is actually a *CSS* problem. When
we installed `sweetalert2`, it installed version 6.6.6:

[[[ code('dc172600c6') ]]]

Woh... ominous. And when you use SweetAlert, you actually need to make sure you
include its *JavaScript* on the page... and *also* the SweetAlert CSS file. We're
loading the CSS file from a CDN... but at a *different*, slightly less evil version:
`6.1.0`:

[[[ code('2b48728e78') ]]]

Change this to `6.6.0` - that's a close enough version:

[[[ code('1ba5f3eb71') ]]]

*Now* refresh... and hit "Delete". Much, much better!

But... this just uncovered a *huge* flaw in our setup! Sure, we no longer need
to *hope* that the SweetAlert JS file was included on our page... but we still *do*
need to hope that we remembered to include the SweetAlert CSS *link* tag! This CSS
file is *really* a dependency of `RepLogApp`... but there's no way for us to require
it like with JS... well... no way yet. Stay tuned.

But before we get there, it's time to leverage the `require` key to modularize our
code even more.


[npms]: https://npms.io/
