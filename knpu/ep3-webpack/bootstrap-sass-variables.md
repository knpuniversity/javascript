# Tweaking Bootstrap's Sass

Now that we finally have Bootstrap's Sass working, we can celebrate! Inside
`_bootstrap.scss`, the first thing it imports is an `_variables.scss` file. I'll
hold Command+Click to open that.

Awesome! This holds a *bunch* of variables that are used throughout the rest of the
Sass files. Yea, this means that we can actually control colors and other things.

Copy the `$brand-primary` variable line. Then, at the top of our `main.scss`, before
we import Bootstrap, *override* that variable. Make sure to remove the default.

This variable is used to color some buttons and a lot of other things. Let's make
it a little lighter: change the 6.5 to 2.5. It's not important, but the new color
should be `#3885C7`.

Ok, back in the browser, inspect the "I Lifted It!" button. Yea, the current color
is `#337AB7`. Now, refresh! Check it out now. Yea! It's the slightly lighter `#3885C7`.

So this is *really* the reason why you might want to import Bootstrap as Sass, instead
of CSS.

## Importing Only Parts of Bootstrap

Let's do one more thing! The `_bootstrap.scss` file imports *everything* in Bootstrap.
But, what if you know you're not using some parts of this? For example, we are *not*
using the glyphicons. So importing that is just wasteful!

Let's fix this! Copy the *entire* contents of `_bootstrap.scss`. Then, in our `css/`
directory, create a new `_bootstrap.scss` file and paste that stuff here.

As *soon* as we do that... all the paths are broken! Yea, that makes sense: we're
in a different directory. No problem, I'll copy `"bootstrap` and do a Find and Replace
to replace this with `"~bootstrap-sass/assets/stylesheets/bootstrap`. Replace everything!

And now we have happy paths.

Next, in `main.scss`, import this file instead of the core one. Just, `./_bootstrap.scss.`

If we stopped here, nothing would change: we're still importing everything. But now...
we have the power! In `_bootstrap.scss`, comment out the `glyphicons` line.

Now, we don't technically need to restart Webpack, since we didn't modify its config.
But, stop it temporarily, then clean out the build directory with:

```terminal
rm -rf web/build/*
```

Next, re-run webpack:

```terminal-silent
./node_modules/.bin/webpack --watc
```

Ok, check this out! In `web/build`, we still have the Font Awesome fonts... but
we do *no* have the glyphicon fonts anymore. That's awesome! We're not parsing
the `_glyphicons.scss` file anymore, so Webpack never sees those font files and
so never moves them here. This is proof that our CSS file is now just a *little*
but smaller. And we're just a *little* bit more awesome than before.
