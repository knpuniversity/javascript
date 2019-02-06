# CommonsChunkPlugin: Shared/Vendor Entry

Restart Webpack!

```terminal-silent
./node_modules/.bin/webpack --watch
```

Woh, those JavaScript files are huge! And there's a really simple reason why:
jQuery. Yep, `login.js` imports `jquery`:

[[[ code('5bed1fb239') ]]]

`rep_log.js` imports `jquery`:

[[[ code('79a3b00990') ]]]

And `layout.js`? Yep, it imports `jquery` too:

[[[ code('85512b4bce') ]]]

That's good! We use it in each module. But, it means that `jQuery` is packaged in
*each* output file individually. That's *super* wasteful! Instead, jQuery, well,
really *any* code that's needed on most pages, should probably live in its *own*
file that's included on every page, and *removed* from everywhere else.

How can we do that? Magic. Or, the CommonsChunkPlugin.

## Adding the CommonsChunkPlugin

***TIP
There is a different solution for Webpack 4 called `SplitChunksPlugin`. Feel free 
to ask questions if you want to know how to get it working. The easiest way is to use
[Webpack Encore](https://symfonycasts.com/screencast/webpack-encore), which supports 
this feature out-of-the-box.
***

Open `webpack.config.js`. Under the `plugins` section, add
`new webpack.optimize.CommonsChunkPlugin()` and pass that an object with two keys:
`name` set to `vendor` and `minChunks` set to 2:

[[[ code('bbfe38ed6e') ]]]

Before we talk about what this does. Try it. Restart Webpack!

```terminal-silent
./node_modules/.bin/webpack --watch
```

Woh! There are two really important things! First... a new file! Welcome! Webpack
is now outputting `vendor.js`. And second, `layout.js`, `rep_log.js` and `login.js`
are now all *much* smaller. Heck, `login.js` is tiny!

This is the power of the `CommonsChunkPlugin`. Wait, what the heck is a chunk?
Webpack uses the word "chunk" *a lot*... and yet... somehow... nobody can seem to
agree on a definition for chunk. But basically, a chunk refers to a bundle of code...
in a generic sense. `CommonsChunkPlugin` has its name because it allows us to move
*common*, shared, code into a separate chunk... i.e. a separate output file.

Thanks to this configuration, whenever Webpack sees a module that is required two
or more times, it is put into the `vendor.js` chunk and *removed* from all other
chunks. Yep, since `jquery` is imported in all three of these files, Webpack puts
it in `vendor.js` and then does *not* put it in `layout.js`, `rep_log.js`, or `login.js`.

## Including the vendor.js File

But, for this to work, `vendor.js` needs to be included on *every* page. Open the
base layout: `app/Resources/views/base.html.twig`. Then, before `layout.js`, add
a script tag for `vendor.js`:

[[[ code('7658c4bb0e') ]]]

In `web/build`, open up `vendor.js`. Yea! You can totally see jQuery right inside.
And if you looked at the other built files, you would *not* find it anymore.

## Include everything from node_modules/?

That's amazing right? Let's make our entry files even smaller. Here's another
common configuration. Instead of `minChunks` set to a number, you can pass a callback
function with a `module` argument. I'll paste a bit of code:

[[[ code('2301849b80') ]]]

This simply says: if a module comes from the `node_modules/` directory, put it in
the `vendor.js` file. Re-run Webpack now:

```terminal-silent
./node_modules/.bin/webpack --watch
```

Wow! The results are *super* dramatic: `rep_log.js` is almost empty. But... there's
a problem. Do you see it? Configuring the "commons" entry is not an exact science.
By blindly including *everything* from `node_modules/`, we have probably *hurt*
performance!

How? Well, imagine `login.js` requires some giant module from `node_modules/`. Even
though this module is only needed for login, it will now be included in `vendor.js`.
That means your users will need to download this giant module *just* to see the homepage...
even though the homepage doesn't use it!

Yep, you need to find a balance between small entry files and a small vendor file,
since it's included on every page.

I'll show you *my* favorite setup next.
