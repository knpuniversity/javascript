# CommonsChunkPlugin: Shared/Vendor Entry

Restart Webpack! Woh, those JavaScript files are huge! And there's a really simple
reason why: jQuery. Yep, `login.js` imports `jquery`, `rep_log.js` imports `jquery`,
and `layout.js`? Yep, it imports `jquery` too. That make sense - we use it in each
module. But, it means that `jQuery` is packaged in *each* output file individually.
That's wasteful! jQuery, well, really *any* code that's needed on most pages, should
live in its *own* JavaScript file and *removed* from everywhere else.

How can we do that? The CommonsChunkPlugin.

## Adding the CommonsChunkPlugin

Find your `webpack.config.js` file. Under the `plugins` section, add
`new webpack.optimize.CommonsChunkPlugin()` and pass that an object with two keys:
`name` set to `vendor` and `minChunks` set to 2.

Before we talk about what this does. Try it. Restart Webpack!

```terminal-silent
./node_modules/.bin/webpack --watch
```

Woh! There are two really important things! First... a new file! Yea, Webpack is
outputting `vendor.js`. And second, `layout.js`, `rep_log.js` and `login.js` are
now all *much* smaller. Heck, `login.js` is tiny!

This is the power of the `CommonsChunkPlugin`. Wait, what the heck is a chunk?
Webpack uses this term a lot, and I have still not found a *solid* definition for
it! But basically, a chunk refers to a bundle of code... in a generic sense.
`CommonsChunkPlugin` has its name because it allows us to move *common*, shared,
code into a separate chunk... i.e. a separate output file.

With this configuration whenever Webpack sees a module that is required two or more
times, it is put into `vendor.js` and *removed* from all other chunks. For example,
since `jquery` is imported in all three of these files, Webpack packages it in
`vendor.js` and then does *not* put them in `layout.js`, `rep_log.js`, or `login.js`.

## Including the vendor.js File

But, for this to work, `vendor.js` needs to be included on *every* page. Open the
base layout in `app/Resources/views/base.html.twig`. Then, before `layout.js`,
add a script tag for `vendor.js`.

In `web/build`, open up `vendor.js`. Yea! You can totally see jQuery right inside.
And if you looked at the other built files, you would *not* see it anymore.

## Include everything from node_modules?

That's amazing right? Let's make our entry files even smaller. Here's another
common configuration. Instead of `minChunks` set to a number, you can pass a callback
function with a `module` argument. I'll paste a bit of code.

This simply says: if a module comes from the `node_modules` directory, put it in
the `vendor.js` file. Re-run Webpack now:

```terminal-silent
./node_modules/.bin/webpack --watch
```

Wow! The results are *super* dramatic: `rep_log.js` is now almost empty. But...
there's a problem, do you see it? Configuring the "commons" entry is not an exact
science. By blindly including *everything* from `node_modules`, we have probably
*hurt* performance!

How? Well, imagine `login.js` requires some giant module from `node_modules`. Even
though this is only needed on *one* page, you will now download that huge module
when visiting *any* page. You need to strike a balance between small entry file
and a small vendor file, since it's included on every page.

Let's try a different strategy next!