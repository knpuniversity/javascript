# Sourcemaps & Debugging

You may not have noticed, but all these cool new tools have made debugging... well...
a nightmare.

Check it out: run inspect element on the yellow leaderboard. What if I need to know
what file this color comes from? Well... apparently... it comes from a *style* tag!?
That's not helpful!

Luckily, I *happen* to know that this code originally lives in `main.scss` on line 48.
But really, I need my browser to help me out.

JavaScript is no better. When I click a row in the table, it logs a message to the
console... which is apparently coming from `rep_log.js` on line 200. But, that's
line 200 of the final, *compiled* file. If you look at the source `assets/rep_log.js`,
it doesn't even have a line 200!

Guys, this sucks! The answer, is sourcemaps. This is not a new concept: it's the
idea that when your JavaScript or CSS is transformed, you somehow output a *map*
that says which source line and file each *final* line comes from. Browsers already
know how to read sourcemaps. So as long we output them, we'll start seeing the
*correct* file and line when debugging.

Ok, I'm sold! Let's do it!

## A Bit of Refactoring

Open `webpack.config.js`. First, we need to do a little bit of refactoring to make
our life easier. Check out the CSS and Sass loaders: we're starting to get just a
*little* bit of duplication... which is about to get worse.

Near the top of this file, create a variable: `const styleLoader` set to an object
with `loader` set to `style-loader` and some empty options. Thanks to this, we can
replace the `style-loader` strings below with this variable. We're now using the
expanded format for the loader... but this is *exactly* the same as before.

Do this for the other loaders. I'll copy the first and paste three times. Add `cssLoader`,
then `sassLoader`. In this case, add an option: `sourceMap: true`. We need that for
the `resolve-url-loader`.

Finally, add `resolveUrlLoader`.

Cool! Use these below: use `cssLoader` in both places, then `resolveUrlLoader` and
`sassLoader`. This didn't change anything, but we're setup for success!

## JavaScript Sourcemaps

Back to sourcemaps! First, let's activate them for JavaScript. How? At the bottom
of your config, add `devtool` set to `inline-source-map`. Yep, that's it. Actually,
there are multiple ways to generate source maps. Each has pros and cons, and each
seems to do funny things in at lease some situations. But, `inline-source-map` is
the most reliable I've found while developing.

Give it a try! Find your Webpack tab and restart:

```terminal-silent
./node_modules/.bin/webpack --watc
```

Then, refresh the page! Moment of truth: click one of the rows.. then find the console.
Hey! Yes! The log comes from `RepLogApp.js` line 95. That sounds much better!

Go see if it's right: in `Components/` open `RepLogApp.js`, and on line 95... it's
perfect!

## CSS Sourcemaps

What about CSS? Well, CSS is handled by our loaders. All *we* need to do is activate
sourcemaps in each. Literally, that means we can add the same option to each one:
`sourceMap: true`. Add that to `resolveUrlLoader`, `cssLoader` and `styleLoader`.

Ok! Restart Webpack! Then, refresh. Inspect the Leaderboard one more time. And...
yeehaw! The color comes from `main.scss` on line 48. We just got the debugging band
back together.

If you're curious what a sourcemap looks like, you can open your `web/build/rep_log.js`
file and look at the bottom. Yep! See that big, ugly, unreadable comment? That's
the sourcemap!

Obviously, we won't want that in our production files. That's something we'll fix
later.
