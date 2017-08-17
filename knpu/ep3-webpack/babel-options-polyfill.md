# babel-loader Options & Polyfill

Now, you may or may not have noticed it, but that build took a bit longer than normal:
it took almost *five* seconds. That makes sense... our code is now going through Babel:

[[[ code('6be6a3861f') ]]]

But actually, *most* of that time is because *every* file is being processed through
Babel... including third-party files like jQuery and Bootstrap! That's overkill.

## Skipping node_modules Files

Most of the time, we expect third-party modules to *already* be compiled into older
JavaScript. So, we don't need to re-transpile them. That may not always be the case,
so just be cautious.

How can we *skip* third-party files? Add an `exclude` for `/node_modules/`:

[[[ code('bcd2be4fa4') ]]]

And *just* by making this small change, when we re-run Webpack, it's way faster:

```terminal-silent
./node_modules/.bin/webpack --watch
```

Instead of four and a half seconds, we're back under two seconds.

## Passing babel-loader Options

But we can do better! Every loader can be passed *options*. If you look at the
documentation for `babel-loader` and scroll down, eventually, you'll see those
options.

For `babel-loader`, there's one *really* cool option. Under `use`, add an `options`
object with `cacheDirectory` set to `true`:

[[[ code('a55af48699') ]]]

This tells Babel to *cache* its results so that it doesn't need to re-transpile
the same source code twice. Try running webpack:

```terminal-silent
./node_modules/.bin/webpack --watch
```

The first run is about the same. But try it a second time:

```terminal-silent
./node_modules/.bin/webpack --watch
```

Woh! 700 ms - *way* faster!

And, if you're curious - which I *know* you are - the cache files live in
`node_module/.cache`. Kind of cool, right?

## babel-polyfill

While we're talking about Babel, open your base layout:
`app/Resources/views/base.html.twig`. We have a script tag to a Promise *polyfill*:

[[[ code('26bfb23013') ]]]

Why? Because some of our code is using the ES6 `Promise` object... and some older
browsers don't support that. By including the polyfill, we're *guaranteed* to have
that.

Even with Babel, this is *still* needed. Babel transpiles our new JavaScript *syntax*
into old JavaScript... but it doesn't add missing features, like the `Promise` object.

So yes... we *still* need something to fill in the missing Promise object... but I
do *not* want to keep using these global script tags!!! Delete it!

And, in your terminal, install a new library called `babel-polyfill`:

```terminal
yarn add babel-polyfill --dev
```

This library will give us the `Promise` polyfill and actually, *all* Polyfills.
Use it inside of `layout.js` - so that we get the polyfill on every page: require
`babel-polyfill`. I'll add a little comment above this:

[[[ code('eb88ca5595') ]]]

And of course, when we refresh, everything is happy! And it would *even* be happy
if I were using an older browser. Of course, *I* would be less happy using an older
browser... but that's unrelated.

Anyways, let's move on to something *amazing*: requiring *CSS* from JavaScript!
