# Bootstrap CSS & Fonts

In our base layout - `base.html.twig` - I want to remove all of the CSS link tags
and require them. We only have two left: Bootstrap and Font Awesome.

Start by removing Bootstrap. Instead, in `layout.js`, before `main.css`, add the
`require()` function.

But, what do we put here?

## Finding Non-Standard node_modules Paths

We installed Bootstrap via Yarn. That's why we can require the Bootstrap JS file.
But what about the Bootstrap CSS file? Does that package even *contain* the CSS?
Let's find out! Open your `node_modules/` directory, find `bootstrap/`, and look
inside.

Ok! This *also* has a `dist/` directory with `css/bootstrap.css`. That means our
require path should be `bootstrap/dist/css/bootstrap.css`:

[[[ code('d6a52ad96e') ]]]

Oh, and we don't need to worry about requiring a *minified* file because, eventually,
Webpack will minify *all* our CSS for us. Thanks Webpack!

This require path makes perfect sense: since the path does *not* start with a dot,
it looks in `node_modules/` for a `bootstrap/` directory, and then we can reference
any file we want.

## What Happens when you Require a Module Name?

But then, how does this work? When we *just* say `require('bootstrap')`... what
does that do? Does it look for an `index.js` file in that directory? Well, there
isn't one, so there goes that theory.

The secret is inside of the `package.json` file for that package. It *should* have
a key called `main`. Not *all* libraries have this key - some old, legacy libraries
won't - but most new libraries will have this.

The `main` key tells Node *which* file to include when someone simply requires
the module by name. When we say, `require('bootstrap')` it *actually* requires
`dist/js/npm.js`.

## file-loader for Fonts

Close `package.json`, and go refresh the page! Woh! That did not go well. In the
console... ah! A familiar error:

> Module parse failed for `fonts/glyphicons-halflings-regular.eot`.
> Unexpected character

Yep, Bootstrap's CSS is referencing a *font* file, and just like with images, Webpack
has *no* idea what to do with it!

Back on the Asset Management section of Webpack's site, there's also a link for
[Loading Fonts][loading_fonts]. And, yea, it's the same exact thing as images.

In `webpack.config.js`, copy the image loader, and, this time I'll use the `test`
regex from the docs exactly:

[[[ code('84cc346826') ]]]

Excellent! Find your terminal, clear out all these ugly error - oof - and restart
Webpack:

```terminal-silent
./node_modules/.bin/webpack --watch
```

It's happy! I'm happy! And if you close `node_modules/` and look in `build/`,
ha! We have a *bunch* of new font files. If you refresh, everything is back to
normal. We're not using any of the Glyphicons from Bootstrap, but if we *were*,
they would totally work.


[loading_fonts]: https://webpack.js.org/guides/asset-management/#loading-fonts
