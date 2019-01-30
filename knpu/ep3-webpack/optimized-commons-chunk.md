# Optimizing the "Commons" Chunk

Here's how I like to configure the CommonsChunkPlugin. Set `minChunks` to `Infinity`.
Then change the `name` option to `layout`:

[[[ code('7ec39975d5') ]]]

That name is important. Scroll up: `layout` is the name of one of our entries!

[[[ code('b8e6f4ed5a') ]]]

Because of this, *anything* that is required in `layout.js` will not be included
in other files. Yep, since `layout.js` requires `jquery`, it will live in the compiled
`layout.js`, but not in `login.js` or `rep_log.js`:

[[[ code('6ef95879c6') ]]]

And since `bootstrap-sass` is used here, it also won't be output in any other
built file.

Our `layout.js` file now serves two purposes. First, to collect all the common modules
that we don't want duplicated across multiple entries. And second, as a way for us
to execute any *global* JavaScript we might have.

Ok, find your Webpack terminal and stop it. Then, clear out the build directory:

```terminal
rm -rf web/build/*
```

to delete that `vendor.js` file. Now, Restart webpack:

```terminal-silent
./node_modules/.bin/webpack --watch
```

Yep, no `vendor.js`. In `base.html.twig`, we can remove the extra `vendor.js`
script tag:

[[[ code('6105698bd7') ]]]

Try it out: refresh! Yes! Everything works!

## The Webpack Manifest

Look inside the built `layout.js` file. Right on top, you can see the Webpack bootstrap:
a collection of functions that the rest of the built code use to help organize all
the Webpack module-loading magic. Before we used CommonsChunkPlugin, this appeared
at the top of *every* output file. But now - as you can see in the built `login.js` -
it's not there anymore. Webpack is *already* smart enough to know that since `layout.js`
is our common chunk and will be included on every page, the Webpack bootstrap code
doesn't need to be repeated. Clever Bootstrap!

But... there's one small catch. Isn't there always one small catch? The Webpack
bootstrap code includes something called the manifest. Internally, Webpack gives
each module a number id, and the manifest contains those ids. Sometimes, those
ids change.

Normally, we don't care! These are all internal Webpack details! But... if the module
ids change... then the manifest changes... and that means that the contents of
`layout.js` change. 

Let me say it a different way: because of the module ids in the manifest, if I make
a change to, say, `login.js`, it *may* cause the built `layout.js` file to change.
Why is that a problem? Caching.

We're going to talk more about caching and versioning later. But for now, let me
just say this: you don't want the contents of a built file to change unless it actually
*needs* to change. Why make your user re-download a fresh `layout.js` file... if
nothing important changed inside it?

## Extracting the Manifest

Anyways, the fix is to move that Webpack bootstrap code *out* of `layout.js`... so it
can happily remain unchanged even when the internal module ids change. To do that,
open `webpack.config.js` and go to the `CommonsChunkPlugin`. Change the `name` option
to an array, with `layout` and a new entry called `manifest`:

[[[ code('59e7503062') ]]]

I'll move my first comment down a bit, and then add a new comment above `manifest`:

> Dumps the manifest in a separate file.

[[[ code('fc1cae0813') ]]]

Let's see what this does! Restart Webpack:

```terminal-silent
./node_modules/.bin/webpack --watch
```

Ok, we *still* have a `layout.js` file... but now we *also* have a tiny `manifest.js`!
Thanks to this change, `layout.js` is *just* our code. And the tiny `manifest.js`
contains the Webpack bootstrap. If the ids change now, the user will only need to
re-download that small file.

Of course, to get this to work... we need to add another script tag! Open `base.html.twig`.
Add a second `script` tag pointing to `manifest.js`:

[[[ code('7714860f8f') ]]]

Phew! I know, that was confusing. But our setup rocks! Thanks to `CommonsChunkPlugin`,
anything in `layout.js`, will *not* be duplicated in the other files.

Next! Let's learn about the webpack-dev-server.
