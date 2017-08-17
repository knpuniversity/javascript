# Sourcemaps & Debugging

You may not have noticed it, but all our new cool tools have made debugging... well...
a nightmare.

Check it out: run inspect element on the yellow leaderboard. What if I want to know
what file this color comes from so I an change it? Well... apparently... it comes
from a style tag!? That's not helpful!

Luckily, I *happen* to know that this code originally lives in `main.scss` on line 48.
But really, I need my browser to help me out.

We have the same problem in JavaScript. When I click a row in the table, it logs
a message in the console... which is apparently coming from `rep_log.js` on line 200.
But, that's line 200 of the final, *compiled* file. If you look at the source
`assets/rep_log.js`, it doesn't even have a line 200.

Guys, this sucks! The answer to this is sourcemaps. This is not a new concept: it's
the idea that when your JavaScript or CSS is transformed, you somehow output a *map*
that says which source line and file each *final* line came from. Browsers already
know how to read sourcemaps. So as long as they're present, it will automatically
use them to tell us the correct file and line.

Cool! So all *we* need to do is activate them!

## A Bit of Refactoring

Open `webpack.config.js`. First, we need to do a little bit of refactoring to make
our life easier. Check out the CSS and Sass loaders: we're starting to get just a
*little* bit of duplication... which is about to get worse.

Near the top of this file, create a variable: `const styleLoader` set to an object
with `loader` set to `style-loader` and some empty options. Now that I've done that,
I can replace the `style-loader` strings below with this variable? We're now using
an expanded format for the loader... but this is *exactly* the same as before.

Do this for the rest of the loaders. I'll copy the first and paste three times.
Add `cssLoader`, then `sassLoader`. In this case, add an option: `sourceMap: true`.
We need that for the `resolve-url-loader`.

Finally, add `resolveUrlLoader`.

Cool! Use all of these down below: use `cssLoader` in both places, then `resolveUrlLoader`
and `sassLoader`. This didn't change anything, but we're setup for success!

## JavaScript Sourcemaps

Now, back to sourcemaps! First, let's activate them for JavaScript? How? At the bottom
if your config, add `devtool` set to `inline-source-map`. Yep, that's it. Actually,
there are multiple different ways to generate source maps and they all have pros
and cons, and seem to do funny things in different situations. But, `inline-source-map`
seems to be the most reliable when developing.

Let's give it a try! Find your Webpack tab and restart it. Then, refresh the page!
Moment of truth: click one of the rows.. then find the console. Hey! Yes! The log
comes from `RepLogApp.js` line 95. that sounds much better!

Go see if it's right: in `Components/` open `RepLogApp.js`, and on line 95... yes!
It's perfect. That was easy!

## CSS Sourcemaps

What about CSS? Well, CSS is handled by all of our loaders. All *we* need to do
is activate sourcemaps in each? Literally, that means we can add the same option
to all of the loaders: `sourceMap: true`. that to `resolveUrlLoader`, `cssLoader`
and `styleLoader`.

Ok! Restart Webpack! Then, refresh. Inspect the Leaderboard one more time. And...
yeehaw! The color comes from `main.scss` on line 48. The debugging band just got
back together.

If you're curious what this type of sourcemap looks like, you can open your
`web/build/rep_log.js` file and look at the bottom. Yep! See that big, ugly, unreadable
comment? That's the sourcemap!

Obviously, we wouldn't want that in our production files. That's something we'll fix
later.
