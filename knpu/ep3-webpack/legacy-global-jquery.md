# Legacy Libraries & global jQuery

Now that `layout.js` is being processed through webpack, we can remove our
self-executing function and replace the `$` with `const $ = require('jquery')`:

[[[ code('137990e68b') ]]]

We rock! But this time... there's a surprise. When we refresh, we do *not* get warm,
fuzzy feelings: we get a cold and not-so-fuzzy error:

> $.tooltip() is not a function

Interesting!

[[[ code('8984dcfe9d') ]]]

This `$.tooltip()` function *should* be coming from Bootstrap... which is included
in our base layout:

[[[ code('c15c3da261') ]]]

So... why isn't this working? Well... think about it: Bootstrap's job is to *modify*
`jQuery` and add more functions to it, like "tooltip". But, in `layout.js`, we require
a *different*, *fresh*, unmodified jQuery and then try to call `.tooltip()` on it!

[[[ code('d81c29c37c') ]]]

That doesn't work because - when the Bootstrap code is loaded - it modifies the
jQuery that's loaded in our *layout*: it modifies the *global* jQuery variable.
In `layout.js`, we're *not* using the global `jQuery` variable: we're requiring
our *own* jQuery... which has *not* been modified by Bootstrap.

The fix? We already know it: we need to once again handle all our dependencies
*inside* `layout.js`. I mean, if we need bootstrap functions inside of this file,
then we need to *require* bootstrap here.

Let's do it!

## Installing and Requiring Bootstrap

First, install Bootstrap:

***TIP
Hey, Bootstrap 4 is out! But this site is designed for Bootstrap 3 CSS, so don't forget to change your dependency to version 3: yarn add bootstrap@3 --dev.
***

```terminal
yarn add bootstrap@3 --dev
```

Then, in `layout.js`, this is interesting: just say `require('bootstrap')`:

[[[ code('6344198bce') ]]]

Nope, I'm not setting this to a variable. This is really common with jQuery plugins,
like Bootstrap. These files don't actually *return* anything. Instead, we require
them so that they *modify* the jQuery function and add new functions to it.

We should be good, right? Try it! Ah!!! The same cold, unfuzzy error! This is confusing.

## Modules that Rely on Global Variables

To see what's really going on, open the base layout and remove the `script` tags
for `jQuery` and `bootstrap`:

[[[ code('7d83a3b2cc') ]]]

We don't need these anymore: we've refactored all of our code to properly *require*
what we need instead of relying on global variables.

And when we refresh now, the *new* error is a bit more helpful:

> `jQuery` is not defined

The *source* of this isn't clear at first, but this is coming from *Bootstrap*.
This is where Webpack gets tricky.

The `bootstrap` module *relies* on there to be a *global* `jQuery` variable. Yep,
it's behaving poorly.

Look, in a perfect world, when we require bootstrap, internally, *it* would use
the `require()` function to require jQuery and then modify it. See, if multiple
files require the same module - like `jQuery`, they are all returned the *same*
object. This means that Bootstrap would add the `tooltip()` function to the same
`jquery` that we use in `layout.js`.

But.... that doesn't happen. Instead, Bootstrap looks for a *global* jQuery variable
to modify. If there is *no* global variable - like in our nice system - it explodes.

## Fixing Poorly-Behaving Modules

There are a *few* ways to fix this. First, we could say `window.jQuery = $` before
requiring bootstrap. If we try that and refresh, no more errors! Yep, we require
the `jquery` module and then make it a global variable *just* in time for Bootstrap
to look for it.

But there are a few problems with this... the biggest being that I *don't* want to
keep relying on global variables! And second... we're probably going to face this
issue again and again... with other jQuery plugins. I'd rather have a more *global*
way of fixing this.

How? Through the power of Webpack!
