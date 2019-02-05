# Bootstrap Sass & resolve-url-loader

Right now, we're loading Bootstrap's CSS. That's cool... but, there's a library
called `bootstrap-sass`... which is a *Sass* version of all that Bootstrap CSS.
That's even *cooler*... because if we used *that* instead, we could control and
tweak Bootstrap itself, by just overriding some Sass variables.

***TIP
Bootstrap 4 uses Sass natively. You can either require the CSS files or the
Sass files from the main package (from the `sass/` directory).
***

## Installing bootstrap-sass

Let's do it! First, use yarn to remove the old package:

```terminal
yarn remove bootstrap
```

Then, add the new package:

```terminal
yarn add bootstrap-sass --dev
```

This package is *just* like the previous one... except it has Sass files instead
of CSS. It *does* still contain the Bootstrap JavaScript. So to keep loading that,
just change the require to `bootstrap-sass`:

[[[ code('779358be81') ]]]

Next, for the CSS require, we need to find the new path. Look inside `node_modules/`
for `bootstrap-sass`. Ok! It has an `assets/stylesheets/_bootstrap.scss` file!
This is the key: *it* imports every piece of bootstrap.

Ok! Back in our file, require `bootstrap-sass/assets/stylesheets/_bootstrap.scss`:

[[[ code('c139f5fe89') ]]]

Check out the terminal that's running Webpack. It had a *ton* of errors... but now
it's happy again! Try out the site. Nice!

## Importing Sass instead of Require

Up until now, to load CSS or Sass, we've required it from JavaScript. But, you can
also use `@import` from inside *CSS*. Close the `node_modules/` directory and open
our `main.scss`. At the very top, add `@import`. Then, copy the path to the bootstrap
Sass file, remove it:

[[[ code('02f206a40d') ]]]

And add it to the `@import` line:

[[[ code('d412acd48e') ]]]

Webpack parses these `@import` lines... so this is effectively identical
to what we had before. Except... it doesn't work! Even PhpStorm is *super* angry!
When you use `require` inside a JS file, Webpack knows to look for `bootstrap-sass`
inside the `node_modules/` directory. But when you use a CSS `@import`, that path
is relative to *this* file.

No worries! To hint to Webpack that you want to treat this path like a *module*
path, prefix it with `~`:

[[[ code('dbb4b1ddf0') ]]]

Let's do this for Font Awesome too: copy its path, remove the `require` line:

[[[ code('91d012557b') ]]]

And add `@import ~`, then the path:

[[[ code('0c4ddedf82') ]]]

## Path Problems in Sass

In theory... this should work *just* like before. Right? Right? Try it!

Oh no! It looks *terrible*! Find your terminal. Interesting:

> Can't resolve `fonts/bootstrap/glyphicons-halflings-regular.svg`

... and then it references our `main.scss` file. Huh. This is really odd.

What's *really* curious is that the file is actually referenced from deep inside
bootstrap: we require `_bootstrap.scss`, it imports another `_glyphicons.scss` and
*it* references the font files. Well, it uses some variables, but this code references
that file.

And this worked a moment ago... so why would it break? All we did was change the
*way* that we were require these files.

So... this is a little confusing. Without going into too much detail, when you
`@import` a Sass file from another Sass file in a different directory, any paths
wrapped in `url()` get totally messed up: Webpack, well really, `css-loader`, looks
for those paths relative to the *first* Sass file. In other words, it looks for
the font files relative to `main.scss`, not `_glyphicons.scss`

## The resolve-url-loader

The most important thing is to fix this nonsense. How? With another loader.
Find your terminal and run

```terminal
yarn add resolve-url-loader@2 --dev
```

***TIP
Latest `resolve-url-loader` has a few breaking changes. Stay on version 2 
to keep things working.
***

***TIP
An alternative way to fix this is to override the `$icon-font-path` variable and
point it at the `fonts/` directory inside `bootstrap-sass`.
***

This loader exists only to solve this problem. Once it's installed, find `webpack.config.js`
and, *right* before `sass-loader`, add `resolve-url-loader`:

[[[ code('3b73f7db21') ]]]

But, for this to work, on `sass-loader`, add `?sourceMap`:

[[[ code('47ac5899ce') ]]]

We're going to talk more about source maps in a few minutes. But internally,
the `resolve-url-loader` needs them so it can do its job.

I know. It's a little crazy. But! If we go back and restart Webpack...

```terminal
./node_modules/.bin/webpack --watch
```

It works! And the page comes back to life!

Hey! We've got Bootstrap via Sass! Now, let's tweak some stuff!
