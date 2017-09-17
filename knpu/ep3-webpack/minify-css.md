# Minify CSS & DefinePlugin

Compile webpack in production mode with:

```terminal
yarn production
```

This minifies the JavaScript files... but does *nothing* to our CSS. Yep, everything
is still fully expanded. That makes sense: Webpack handles JavaScript... but it
doesn't handle CSS. That's done with the loaders.

But! The `css-loader` has a `minimize` option. If we set it to true, it will use
a library called [cssnano][cssnano] to make things... well... nano!

## css-loader, minimize & LoaderOptionsPlugin

Setting an option on `css-loader` is easy! But... first, I need to show you a
*different* way to set this option...

Go down to the production if statement. Add a new plugin: `webpackConfig.plugins.push()`
with `new webpack.LoaderOptionsPlugin()`. Pass this two options: `minimize: true`
and `debug: false`:

[[[ code('ee5b14494b') ]]]

Ok, what the heck does this do?

Basically... this plugin will pass these two options to *all* loaders. Wait... why
do we need that? I mean, if we want to pass `minimize: true` to `css-loader`...
can't we just scroll up and add that option? Yes! The plugin exists to help some
older, legacy loaders work with new versions of Webpack. And honestly... it may not
even be needed anymore. But, I still add it just in case.

The `minimize: true` option is important for `css-loader`. And in a few minutes,
we're going to pass that option manually to that loader anyways. The `debug` flag
toggles "debug" mode on each loader... which I'm pretty sure doesn't even do anything
anymore.

But thanks to this, we're ready to see our minified CSS! Re-run:

```terminal
yarn production
```

Scroll up! Yes! `login.css` is only 5 kb! It is definitely minified! Of course...
it still contains a giant sourcemap! Heck, that's bigger than the CSS itself!

## Disabling sourcemaps

We should probably remove the sourcemaps in the production build, right? Well,
there are two opinions on this. Some people say that you *should* continue to
output the sourcemaps in production... just in case you need to debug something.
But, they use a different sourcemap option that outputs to a separate *file*. We
want our CSS and JS files to *just* contain CSS and JS.

Personally, I typically turn sourcemaps off entirely for production. Go to the top
of `webpack.config.js`. Let's move our settings variables above the loaders:

[[[ code('32e5967169') ]]]

Add two new variables: `const isProduction =` ... then go copy the inside of our
if statement, and paste it here:

[[[ code('77c73cb746') ]]]

Next, add `const useSourcemaps = !isProduction`:

[[[ code('c4661f0eaf') ]]]

Use that below! Set the `sourceMap` option for each loader to `useSourcemaps`:

[[[ code('66a4cd37ce') ]]]

Oh, except for `sassLoader` - keep that `true` always... even though I just messed
that up!

[[[ code('f7f4721c80') ]]]

Remember, `resolve-url-loader` needs this. Don't worry, the sourcemaps won't actually
be rendered... since that option is set to `false` on `css-loader`.

Yep, we have now disabled sourcemaps for CSS in production.

Next, near the bottom, find the `devtool` option. Change this: if `useSourcemaps`,
then set it to `inline-source-map`. Else set this to `false`:

[[[ code('a5b2c2ca2e') ]]]

Oh, and down below in the if statement, we can use the new `isProduction` variable!

[[[ code('823a75270b') ]]]

Let's try it. Right now, `layout.js` is 211 kilobytes and `layout.css` is 712 kilobytes.
Run the production build!

```terminal-silent
yarn production
```

Ok! Scroll up. Yes! `layout.css` is much smaller. But, `layout.js` is the same.
Ah, that's because Uglify was *already* removing the extra sourcemap comments.

## Adding minify to css-loader directly

We're in *great* shape. Just two more small things. First, Google for `css-loader`
to find its GitHub page. Search for `minimize`. Cool! These are the options we can
pass to the loader. The important one is `minimize`. Right now, we're setting this...
but in a weird way: by using the `LoaderOptionsPlugin`. To be more explicit, let's
set it for real: `minimize: isProduction`:

[[[ code('bb35d24a70') ]]]

If we decide the `LoaderOptionsPlugin` isn't needed some day, our CSS will stay minified.

## The DefinePlugin

Ok! Our code is minified and sourcemaps are gone. There's just *one* more thing
we need to do to fully optimize our assets! Google for the Webpack [DefinePlugin][define_plugin].
This is a *very* cool plugin.

It allows you to define constants in your code. Here's a good example. Imagine you
want to know in your JS code whether or not you're in production... maybe because
you do some extra logging when *not* in production.

In your code, you would use a constant called `PRODUCTION`. But instead of *defining*
that somewhere in your JS, you can let the `DefinePlugin` do that for you. With
this config, Webpack actually *rewrites* your code! If it sees `!PRODUCTION`,
the final built code will say if `!true`. It literally replaces the `PRODUCTION`
constant with the word `true`.

## DefinePlugin: process.env.NODE_ENV

The plugin is *perfect* for something like this, or even feature flags. But it's
also important for your production build. Down in our production section, add
the plugin: new `webpack.DefinePlugin()`. Pass it `process.env.NODE_ENV` set
to `JSON.stringify('production')`:

[[[ code('3a455d9add') ]]]

There are a few things happening. First, you must *always* wrap the values to this
plugin with `JSON.stringify()`. The plugin does a literal find and replace... so if
the value is a string, it needs to be wrapped in quotes. `JSON.stringify` is an
easy way to do that.

But why do we need this at all? Sometimes, a third-party library will try to determine
whether or not it is being used in production or development... maybe so that it
can add more helpful error messages. To do this, it will often do the same thing
we're doing: check to see if `process.env.NODE_ENV === 'production'`.

But... that won't work! In a browser environment - which is where all of our actual
JavaScript runs - there is *no* `process.env.NODE_ENV`! This causes that code to
always run in development mode.

Thanks to the plugin, if any code checks for `process.env.NODE_ENV`, it will be replaced
with the string `"production"`. Yep, the final JS would literally contain code
that looked like `if ("production" === "production")`!

In our app, this won't make any noticeable difference. But, our production build
is ready-to-go.

Now, let's turn to asset versioning!


[cssnano]: http://cssnano.co/
[define_plugin]: https://webpack.js.org/plugins/define-plugin/
