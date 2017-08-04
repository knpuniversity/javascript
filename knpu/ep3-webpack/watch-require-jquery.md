# watch + Install jQuery with Yarn

The *downside* of using something like Webpack - or *any* tool that builds your
assets - is that *every* time you make a change, you have to re-run webpack. That's
lame.

Fortunately, like many tools, Webpack has a "watch mode", and it just *works*.
Right now, if I click delete, it says, "Delete this log?"

Re-run webpack, but this time with a `--watch` flag:

```terminal-silent
./node_modules/.bin/webpack --watch
```

It still builds the assets... but then *waits*. It's now constantly watching *all*
your files for changes. Creepy.

Put it to the test: in `RepLogApp.js`, add a few more question marks to the delete
modal for emphasis and save:

[[[ code('e6e4140db9') ]]]

Refresh the page and.... we *instantly* see the change.

This is nothing earth-shattering... it's just a tool we *need*... and Webpack provides
it without any setup. In the terminal, you can even see that it re-dumped our file.

There *is* one caveat with watch: and we'll see it a few times. If you make a change
to the `webpack.config.js` file *itself*, you will need to manually restart webpack.
Webpack watch does *not* detect changes to itself.

## The Classic Problem with JS Dependencies

Ok, it's time to do something *completely* different... and unlock a massively powerful
new tool. I'm going to say that a lot in this tutorial... and I mean it every time!

Right now, `RepLogApp` *only* works because jQuery is available globally:

[[[ code('a3cdf8d11a') ]]]

We have a self-executing function, which expects `jQuery` to be a global variable
by the time this file is loaded. That works because, in our base layout -
`app/Resources/views/base.html.twig` - we include jQuery:

[[[ code('6547b3aac2') ]]]

This gives us two global variables - `$` and `jQuery` - which we use everywhere else.

And this is the big, huge, *classic*, *horrifying* problem we want to fix: when we
write JavaScript, our code is not self-contained. Nope, we need to very carefully
make sure to *remember* to include any dependent `script` tags *before* loading *our*
JavaScript. If you forget to add a script tag or add it in the wrong order... bam!
Your user sees an error. And you see your face hitting your palm.

This is a *terrible* and unprofessional way to live. But with Webpack, we can finally
fix this. Instead of crossing your fingers and *hoping* that jQuery is included on
this page, in `RepLogApp.js`, we will *require* it.

## Installing jQuery via Yarn

In our terminal, we already used `yarn` earlier to install `webpack`. But we can
*also* use it to install other, front-end libraries... like jQuery. Try it:

```terminal
yarn add jquery --dev
```

And *just* like that! jQuery now lives inside `node_modules/`:

[[[ code('a8b8193ebe') ]]]

That's great! Because we can *now* require it like *any* other module.

At the top of `RepLogApp.js`, add `const $ = require('jquery')`:

[[[ code('fbcff8dc68') ]]]

For simplicity, we can remove the `$` from the self-executing function and the
`jQuery` argument at the bottom:

[[[ code('eee84c8d2d') ]]]

Now, we require jQuery from `node_modules` and assign it to the `$` variable. Whenever
we reference `$` in this file, that *required* value is used. We are *no* longer
dependent on whether or not a global `$` or `jQuery` variable exists.

## What Happens when you Require a Module

There are two *very* important things I want to point out. First, we just said
`require('jquery')`:

[[[ code('fd748102bc') ]]]

We *now* know that because this does *not* start with `.`, Node knows to look for
a core library - like it did with `path` - or to look inside `node_modules/`,
which is what happens this time. That's perfect!

The second very, very, very important thing is that jQuery acts *differently*,
depending on whether or not it's being included with a traditional script tag -
like in our layout - *or* if it's being required by a module system. This is a
very common thing you'll see.

Let me show you: I'll hold command to click into the `jquery` module itself. Yea,
it's a bit hard to read. But, on top, it checks to see if
`typeof module === "object"`, and `typeof module.exports === "object"`. Basically
jQuery is checking whether or not it is being used inside of a module environment,
called a commonjs environment.

If it *is*, it does *not* create global `jQuery` or `$` variables. Nope, instead
it uses `module.exports` to *export* the jQuery function. This is *really* important:
it means that when you require `jquery`, it *returns* the `jQuery` function...
but does *not* actually create a global variable. This is a *pivotal* difference
between classic JavaScript and modern JavaScript: instead of creating and using
global variables, we require modules and export things *from* these modules.

Phew! Let's try this out already! In my terminal, I'll check out my watch tab.
Yep, it's still working, and should have already detected our new `require()` and
dumped the new file.

Back in the browser, refresh! Yes! Everything still works! It's not super obvious
yet, but `RepLogApp` is now using the *required* jQuery instead of the global
script tag.

But, I can't remove that script tag from the base layout yet... because we have other
pages that depend on it. And yes, that means that - until we fix this - our users
are downloading jQuery *twice*: once in the base layout and again when they download
`rep_log.js`.

Open up that file: `web/build/rep_log.js`. Yep, most of this file is now jQuery.

Now that we have this super power, let's repeat it with SweetAlert... and discover
one lingering issue.
