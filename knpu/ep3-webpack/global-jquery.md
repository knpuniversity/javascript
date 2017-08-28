# jQuery & Legacy JS in your Template

Here's a simple challenge: when I hover over the leaderboard, I want to show a
JavaScript Bootstrap popover that gives us some info about how it works.

Open up the template: `app/Resources/views/lift/index.html.twig`. Add a class on
the `h2` that we can target in JavaScript: `js-custom-popover`. Then, I'll add
a few other things that will help the popover: `data-toggle="popover"`, a `title`
and `data-content`:

[[[ code('edf6441a72') ]]]

To get this working, all we need to do is write some JavaScript to find that element
and activate the popover. Normally, we would put this in `rep_log.js`. In fact,
that's the *best* place to put it. Well, there, or some file that it requires. The
point is, now that our JavaScript has matured, 100% of your JS code should live in
an external JavaScript file. You should have *no* JavaScript in your templates, other
than the one script tag:

[[[ code('c73299a6af') ]]]

But, what if you're using Webpack on a *legacy* app... that still has a *ton* of
JavaScript in your templates? You *should* refactor this. But, since that can be
a big job, let's find out how we can *still* write JavaScript in a template... even
though we shouldn't.

Add a new `script` tag right in the template. Here, code like normally: add a
`$(document).ready()` block, then find our `.js-custom-popover` elements and activate
`popover()`. I'll pass that a few options:

[[[ code('db2df5cfe8') ]]]

So simple! It should work, right? After all, `rep_log.js` requires `jQuery`, so
we should be able to use it in our template.

Well, try it. Refresh the page. Uh oh... error!

> $ is not defined

This is coming from our template. What's going on? We *are* requiring jQuery!

[[[ code('c8c0ed8db4') ]]]

## Why jQuery / $ is not Global Anymore

Well... we already know what's going on. When we require `jquery`, it *detects*
that it is being used in a module environment. So it does *not* set a global `jQuery`
or `$` variable. Instead, it just returns the `jQuery` function, which we set to
`$`. But that only affects *this* file.

And this is good! We *want* each module to live in isolation like this. But, if you
*do* need to expose a `jQuery` variable globally, you can.

First, since we're using a Bootstrap function on this page, `require('bootstrap-sass')`
so the popover function is available:

[[[ code('ba05b71ae8') ]]]

## Making jQuery / $ Global

Now, to actually make `$` available as a global variable, we can set it on the window
object: `window.$ = $`:

[[[ code('0f19631a46') ]]]

That's it! But remember, this is *not* ideal, and is just meant to support legacy
code.

Refresh now! Ha! It works!

## The ProvidePlugin Complication

But, I have one *tiny* complication. In `webpack.config.js`, near the bottom, we
added something called the `webpack.ProvidePlugin()`:

[[[ code('f63a2a5df2') ]]]

Thanks to this, if *any* JavaScript relies on `jQuery` or `$` to be available as
a global variable, Webpack rewrites that code to require the `jquery` module properly.
This does *not* make the `jQuery` or `$` variables available globally, like in
a template. Instead, it *fixes* code to not *need* that. If you *do* want to make
these variables global, that's what we just did in `rep_log.js`:

[[[ code('bf07a4d07f') ]]]

In other words, these are solving two separate, but similar issues.

Here's the complication: sometimes, a third party library will try to reference `jQuery`
globally *not* by just saying `jQuery`, but by saying `window.jQuery`... which is
really the same thing. But, right now, the ProvidePlugin would *not* fix that situation.
So we *could* still have some issues with some libraries.

No worries! Add two more lines: `'window.jQuery': 'jquery'` and `'window.$': 'jquery'`:

[[[ code('c97dc96bc2') ]]]

Cool! So now we're covered. Re-start Webpack:

```terminal-silent
./node_modules/.bin/webpack --watch
```

And, refresh! Woh! What! An error! Once again, it says that `$` is not defined!
What the heck!

## Using global to set Global Variables

This is a *total* gotcha. Thanks to the `ProvidePlugin()`, it's actually now re-writing
*our* code, changing the `window.$` in a way so that it does *not* actually create
a global variable anymore. This is *not* what we intended!

The fix is easy: change `window.$` to `global.$`:

[[[ code('aabab982f9') ]]]

What? *We* know that `window` is the global variable in a browser environment.
Well, in Webpack, you're allowed to set things on a `global` variable. When you do,
it figures out that you're in a browser environment, and sets that on `window`.
Basically, this does the same thing as before, but won't be re-written by the
`ProvidePlugin()`.

*Just* by making this change, when we refresh, it *works*. Now, in practice, some
libraries *do* reference `window.jQuery`, but I don't know of any that reference
`window.$`, so you can remove it:

[[[ code('c1df182832') ]]]

Next! Let's talk about import and export... the more hipster alternativse to `require`
and `module.exports`.
