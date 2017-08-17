# Images in CSS (file-loader)

Most of the CSS comes from our base layout: `base.html.twig`. On top, there's a link
tag to `assets/css/main.css`:

[[[ code('b5bfc373b8') ]]]

But, to keep with our new system, instead of adding this link tag manually,
I want to *require* that CSS from JavaScript. For global CSS, I'll include it
from my global JavaScript: `layout.js`.

In other words, remove that link tag!

[[[ code('54275ff9b8') ]]]

Then, in the source `layout.js` file, add `require('../css/main.css')`:

[[[ code('e712995b49') ]]]

And... that *should* just work!

## Webpack *Follows* Images in CSS

So... refresh! And as promised... woh! Nevermind! It does *not* work... it looks
*terrible*! What happened?

Our console shows an error:

> Module parse failed, dummbell-mini.png, unexpected character

Huh. Over in the terminal, the watch script has a similar message... and it looks
like it happens when Webpack reads `main.css`.

Hmm. Open `main.css`. Ah! There's the image: it's a *background* image inside our CSS!

[[[ code('ae24abd15a') ]]]

This, is *very* interesting. When we tell Webpack to load a CSS file, it actually
*parses* the background images and - basically - *requires* them! It does the same
with fonts and also finds and requires any `@import` calls.

So... why is this failing? Well, *just* like with CSS, a `.png` file is *not* JavaScript...
so Webpack has *no* idea what to do with it!

## Using file-loader

What's the fix? We need a loader capable of understanding image files.

Head over to webpack.js.org, click on Guides, Asset Management and then
[Loading Images][loading_images].

Ah, the `file-loader`! It has one simple job: move any files it processes into the
`build/` directory. When it does that, internally, it will return the filename to
that new file... which Webpack will use to re-rewrite the background-image path in
our CSS to point to it. It's pretty amazing.

Install it first: copy the name of the module and then, in your open terminal, run:

```terminal
yarn add file-loader --dev
```

Back in `webpack.config.js`, we need to add a *third* loader. Copy the `css-loader`
config. This time, for `test`, in the docs, it basically looks for *any* image file.
I'll paste something similar that includes even *more* image filenames. And for
`use`, pass these to `file-loader`:

[[[ code('9f8137e4ca') ]]]

Before you do *anything* else, head over, and restart Webpack!

```terminal-silent
./node_modules/.bin/webpack --watch
```

Ah, look at the output! Not *only* did it write `layout.js`, `rep_log.js` and
`login.js` files, it output a `.png` file... with a long funny name. You can see
it in the `build/` directory. *This* is `mini-dumbbell.png`. Its name is a hash of
its contents - more on that later.

## Configuring publicPath

Let's try it! Refresh! The image *should* show up on this first menu item... but
it's not there! And my console has a 404 for the image! What's up?!

Inspect the element. Ok, the final CSS from Webpack changed the `background-image`
to point to the new filename. Let's open that in a new tab.

Ah! The filename is right, but it's *missing* the `build/` directory prefix!

Webpack is *almost* doing everything correctly: it moves the file into `build/`
and even updates the CSS to point to that filename.

Open `webpack.config.js`. Yes, we *did* tell Webpack to put everything into `web/build`.
But, Webpack doesn't actually know what the *public* path is to files in this directory.
I mean, it doesn't know that `web/` is our document root, and so it doesn't know
that these files are accessible via `build/` then the filename. Nope, this is something
we need to *tell* Webpack, so that it can create the correct paths.

How? Under `output`, set `publicPath` to `/build/`:

[[[ code('935726bd3b') ]]]

Find you terminal and restart Webpack:

```terminal-silent
./node_modules/.bin/webpack --watch
```

Everything looks the same here... but when we refresh and open the menu... there
it is! Our little icon. The `background-image` *now* point to `/build/` the filename.

Guys, this is another monumental step forward! Now, as *long* as we correctly reference
image paths in CSS, Webpack will make sure those images are available in `build/`
*and* that their paths in the final CSS are correct. We focus on our source files,
and Webpack takes care of the rest.

Even better, if you make a mistake - like a typo - you'll actually see a Webpack
*build* error. There's no way to accidentally have a broken link.


[loading_images]: https://webpack.js.org/guides/asset-management/#loading-images
