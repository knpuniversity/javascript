# Require Outside Libraries

When you use Webpack, the *hardest* thing is that you need to start thinking about
your JavaScript differently. You need to *stop* thinking about global variables,
and *start* thinking about how you can code *correctly*. It's not as easy as it
sounds: we've been using global variables in JavaScript... well... forever!

For example, in `RepLogApp.js`, we created this self-executing function to give
our code a little bit of isolation. That part isn't too important. But at the bottom,
we are *relying* on there to be a *global* `jQuery` variable. It just *must* exist,
or else everything will explode! On top, this becomes a `$` variable in the function.

Open the base layout file - `base.html.twig`. The *only* reason our code works is
that, at the bottom, yep! We have a script tag for jQuery, which adds a global
`jQuery` variable.

And this is the process we've used for *years*: add a script tag for a JS library,
then reference its global variable everywhere else.

I *hate* this! In `RepLogApp.js`, I just have to *hope* that jQuery was included
correctly. That's madness, and it needs to stop. So, from now on, we have a *new*
philosophy: if we need a variable in a file - like `$` - then we need to *require*
it in the same way that we are requiring `Helper`.

The *only* difference is that jQuery is a third-party library. Well... in PHP, we
would use Composer to install third-party libraries. And... yea! In JavaScript, we
can use yarn to do the same thing!

## Installing jQuery via Yarn

Check this out: open a *third* terminal tab - we're getting greedy! Then run:

```terminal
yarn add jquery --dev
```

Yep! We can use yarn to download *front-end* libraries! Oh, and you can search for
package names on `npmjs.com` or `npms.io`.

This downloads jquery into the `node_modules/` directory and adds it to `package.json`.

## Requiring jQuery

So... how do we require it? Oh, it's *awesome*: `const $ = require('jquery')`.

That's it! When a require path does *not* start with a `.`, Webpack knows to look
for a *package* in `node_modules/` with that name.

And now that we are *properly* importing the `$` variable - yay us - remove `$`
and `jQuery` from the self-executing function. Yep, when we use the `$` variable
below, it is *no longer* dependent on any global jQuery variable! Responsible coding
for the win!

But... does it work? Try it! Go back to our site and refresh! It does! That's because,
back on the terminal, if you run:

```terminal
ls -la public/build
```

... yep! Our `rep_log.js` file now has jQuery *inside* of it - you know because it's
now 300kb! Don't worry, we'll talk about optimizations later.

But the point is this: all *we* need to do is require the libraries we need, and
Webpack takes care of the rest!

## Installing & Using SweetAlert2

Let's require one more outside package. Search for "swal". We're using a really cool
library called SweetAlert to bring up the delete dialog. But... the *only* reason
this works is that, in the template, we're including a script tag for it.

Boo! Let's refactor this to *require* that library properly.

If you search for this package, you'll find out that it's called `sweetalert2`. Let's
install it:

```terminal
yarn add sweetalert2 --dev
```

This time, delete the script tag entirely. We can't remove the jQuery script tag
yet because we're still using the global variable in a few places. But, we'll fix
that soon.

Then, in `RepLogApp.js`, remove the argument from the self-executing function: that
global variable doesn't even exist anymore! To prove it, refresh! Awesome!

> swal is not defined

To get it back, add `const swal = require('sweetalert2');`

As *soon* as we save this, Webpack recompiles, we refresh and... it works! Yes!
We can use *any* outside library by running one command and adding one require line.

Let's use our new unstoppable skills to refactor our code into re-usable components.
