# Versioning Optimizations

Thanks to the `[hash]`, under the output `filename`:

[[[ code('f9686a0557') ]]]

When the contents of any JavaScript file changes, the output file will have a new
filename. But... there is a *slight* issue. Sometimes... the filename might change...
even when the contents *don't* change!

Without going into too much detail, it *appears* that `[hash]` is not perfect...
though this is one of those spots where nobody in the Webpack world seems to know
for sure. To get around this, we'll use a plugin that gives us a more dependable hash.

In your terminal, run:

```terminal
yarn add webpack-chunk-hash --dev
```

Copy that library name and - at the top of `webpack.config.js`, import it:
`const WebpackChunkHash = require('webpack-chunk-hash')`:

[[[ code('af2fab929d') ]]]

Down in the `plugins` config, very simply, say: `new WebpackChunkHash()`. I'll add
a note above it:

[[[ code('cb2011949c') ]]]

Thanks to this plugin, we have a *new* wildcard for the filename: `[chunkhash]`.
Yep, replace `[hash:6]` with `[chunkhash:6]`:

[[[ code('c23ced8e5a') ]]]

Re-run webpack:

```terminal-silent
yarn dev
```

Thanks to the new hash algorithm, all the JavaScript files have new hashes. And
`manifest.json` points to the new one.

## Named Module Ids

There's one other slight problem with versioning. Earlier, we talked about how Webpack
assigns an id to each module internally. Yep, you will see funny things like
`var jquery = __webpack_require__(45)`... because... for this build, 45 apparently
represents the `jquery` module.

The problem is that sometimes those module ID's change between builds. Because of
this, even if we don't change *any* files that are part of `login.js`, some of
the module ID's it references *could* change. Like 45 could become 46
for jQuery! And *that* means that the filename of the built `login.js` file would
change... *simply* because these silly, internal module IDs change! We don't want
to bust our user's cache unnecessarily.

This is not a huge deal... but we can do better! Yep, Webpack has a plugin that
allows us to *control* the module IDs. At the bottom of `webpack.config.js`, in
`plugins`, we'll actually use two core plugins. If `isProduction`, use a new
`webpack.HashedModuleIdsPlugin()`. Otherwise, use `new webpack.NamedModulesPlugin()`:

[[[ code('20462cd8e9') ]]]

The `HashedModuleIdsPlugin` changes the module ID's to be a hash based off the module's
name. As long as `jquery` is always called `jquery`, the hash won't change. On the
downside, this makes your final built files just a *little* bit bigger: these
hashed IDs are longer than the numbers.

In development, the `NamedModulesPlugin` basically uses the module's name as the ID,
instead of a number. That's not usually helpful, but sometimes, like when trying to
debug HMR, Webpack will give you an error with the module ID in the message. If the
module ID is the module's name, that makes life easier!

Let's see what this looks like! Run the dev build:

```terminal
yarn dev
```

Now find the built `login.js`. Cool! You can see that the module ids just changed!
In production, this would be an unreadable hash.

Ok, we're done! Our assets are *truly* production-ready. Congrats!

## Cleaning out the build Directory

Of course... each time we run Webpack, our `build/` directory gets more and more
files. It's getting crowded in here! Technically, that's not a problem. But, it can
get messy and confusing! I like to clear this directory between builds with a very
simple plugin.

Run:

```terminal
yarn add clean-webpack-plugin --dev
```

Copy that package name. Inside `webpack.config.js`, on top, require it:
`const CleanWebpackPlugin = require()` and the package name:

[[[ code('e1dd76ff09') ]]]

You can probably guess the next step. To the `plugins` section! Add
`new CleanWebpackPlugin()` and pass it the path to clean: `web/build/**/*.*`:

[[[ code('eb15503c7a') ]]]

That's a *glob* pattern: the `**` says look at `web/build` recursively, and the
`*.*` says "delete all files"... but not directories.

***TIP
Version 2 of this plugin doesn't require any arguments: it knows automatically to delete
any output files.
***

Try it! Run:

```terminal
yarn watch
```

Boooo! I made a mistake! I'm missing a comma at the end of my previous line:

[[[ code('a781c12df2') ]]]

Come on Ryan! Try it again.

A log message says it's working... and... yea! There is nothing in `web/build`.
And when it finishes... boom! There is one copy of each file. Perfect!

It's time to celebrate our awesome setup. Next, we get to talk about an amazing,
powerful and fun Webpack feature: code splitting.
