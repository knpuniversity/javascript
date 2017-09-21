# Webpack Visualizer

You've made it to the end! So let's do something fun!

The *cool* thing about Webpack is that it allows you to just *code*: import modules
when you need them, import CSS and let Webpack figure out how to package it all
together.

The downside is that you might not realize if your built files are becoming too big!
Like, maybe you import a *huge* library... but only use a small part of it. Or, you
have some big code that can be code split. There's a fun solution to seeing these
optimizations!

## Dumping the Stats

Google for Webpack visualizer. The one I like is by someone named Chris Bateman.
Hi Chris!

When you execute Webpack, you can tell it to dump a JSON file with *very* detailed
information about the final assets. Find your terminal and stop webpack. Use the
full, long version of our production command:
`NODE_ENV=production ./node_modules/.bin/webpack`, and then `--json`. Save the
output to a `stats.json` file:

```terminal-silent
NODE_ENV=production ./node_modules/.bin/webpack --json > stats.json
```

Run it! Webpack compiles like normal... but it outputs JSON, which we save to
`stats.json`. Check out that file: it has details about errors, warnings, and endless
information about the assets.

Sweet! Now: back to the browser! Click the box to load our `stats.json`.

Wow! A donut! It looks delicious! Apparently, 97.6% of our delicious donut... I mean
97.6% of our code is coming from stuff in `node_modules/`. Only this *tiny* portion
comes from our `assets/` directory! As you move out, it describes each part in
more and more detail.

Oh, and notice: we're looking at *all* chunks. But you can also view this graph
for only *specific* JavaScript files. This `02d` file is actually our code split
chunk!

But let's look at everything. Inside `node_modules/`, `jquery` takes up 39%. The
second biggest portion... is something called `core-js`, at 29.5%! That's interesting...
more on that in a moment.

Next is `bootstrap-sass`, `sweetalert` and then `css-loader`... which if you look
closer is Font Awesome. A few smaller libraries finish off the donut.

## Importing core-js Smarter

So... this contained a surprise! The *second* biggest library is `core-js`. What
the heck is that? And where did it come from?

If you do some digging, you'll find out that this comes from `layout.js`: specifically
from `babel-polyfill`:

[[[ code('b998c37c68') ]]]

Remember, we included this so that it would polyfill the `Promise` object for older
browsers.

I'll hold `Command` to click into the `babel-polyfill` module. Huh, this basically
just uses *another* library: `core-js`. And if you dig further, you'd find out that
by requiring the `shim` module, it imports *many* polyfills. Yep, we're importing
a *huge* library *just* to polyfill `Promise`.

Let's be smarter! First, remove `babel-polyfill`:

```terminal
yarn remove babel-polyfill
```

And now add `core-js`:

```terminal
yarn add core-js --dev
```

While we're waiting, Google for `core-js`. Ok, this is a library full of polyfills,
for ES6, ES7 and other things. Ah, and here are the docs about `Promise`.

See the "CommonJS entry points" part? This is telling us that if we need the `Promise`
polyfill, we can *just* require `core-js/library/es6/promise` or
`core-js/library/fn/promise`.

Let's do that! In `layout.js`, remove the `babel-polyfill` line. Instead, import
`core-js/library/es6/promise`:

[[[ code('082b7f6657') ]]]

And now... re-dump our stats:

```terminal-silent
NODE_ENV=production ./node_modules/.bin/webpack --json > stats.json
```

When it finishes, find the visualizer and refresh to reset it. Load the *new*
`stats.json`. Oh, way better! jQuery *now* takes up 53%... not because it got bigger,
but because our JavaScript donut is *so* much smaller. Then `bootstrap-sass` & `sweetalert2`.
`core-js` went from 29.5% to only 8.1%.

Thank you visualizer! So, focus on your code! And then... come to the visualizer
to make sure you're not doing anything *crazy*.

Ok guys! We've done it! We're done! Thank you for staying with me! Webpack is an
*amazing* library... but it's *hard*. It gives you so much flexibility... which means
I have endless ways to confuse myself and mess things up! But now, you are a Webpack
power user!

Oh, and also check out [Webpack Encore][webpack_encore]: a library created by Symfony
to make configuring Webpack easier, faster and more fool-proof. We'll create a tutorial
about it on KnpU soon!

All right, guys. See you next time.


[webpack_encore]: https://github.com/symfony/webpack-encore
