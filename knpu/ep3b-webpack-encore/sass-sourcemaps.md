# Sass & Sourcemaps

Our `layout.js` file requires `main.css`:

[[[ code('cc031305e5') ]]]

That's cool... I *guess*... if you like using boring old CSS. But I want to be more
Hipster, so let's use Sass instead. Well, I could use Stylus to be *super* hipster...
and Encore *does* support that, but let's use something a bit more familiar.

To start, rename the file to  `main.scss`. Now, we can use a fancier syntax for these
pseudo-selectors:

[[[ code('720f4a0971') ]]]

OooooOoOooOooo.

Obviously, the build is failing because, in `layout.js`, that file path is wrong!
Change it to `main.scss`:

[[[ code('fed1f26650') ]]]

So... does it already work?

## Activating Optional Features

No! On the watch tab of our terminal, it *failed* when loading `main.scss`.
Out-of-the-box, Encore *cannot* process Sass files. But, it tells you how to fix
this! We just need to enable it inside our config & install some extra packages.
Remember: Encore is *full* of features. But to stay light, it doesn't enable
*everything* automatically. Instead, *you* are in control: enable what you need,
and Encore will tell you what to do. It's kinda cool!

Go back to `webpack.config.js` and add `.enableSassLoader()`:

[[[ code('4b0db0698a') ]]]

Then, back on your terminal, copy the `yarn add` line, stop Encore with `Ctrl`+`C`,
and paste!

```terminal
yarn add sass-loader node-sass --dev
```

Let it do its thing, then... restart Encore!

```terminal
yarn run encore dev --watch
```

No errors! To prove it works, move over to your browser and... refresh! It still
looks great! Well, *most* importantly, on the login page, when we hover of the button,
it *does* have that styling.

## Encore Versus Webpack Concepts

There's one thing I want you to notice: the *name* of this method: `enableSassLoader()`:

[[[ code('37f1e2f8f5') ]]]

"Loader" is a *Webpack* concept. Encore tries to make Webpack as *easy* as possible,
but it *reuses* Webpack's language and terms whenever possible. And that's important!
If you ever need to do something custom with Webpack, it's usually pretty easy to
figure out how that fits into Encore. 

Also, we're requiring `bootstrap.css` right now:

[[[ code('c55b042751') ]]]

But, with Sass support, you could instead import Bootstrap's Sass files *directly*.
The advantage is that you can override Bootstrap's Sass variables and take control
of colors, sizes and other stuff. To do that with Bootstrap 3, you'll need the
`bootstrap-sass` package. For Bootstrap 4, the Sass files are included in the main
package.

## Sourcemaps!

Let's fix *one* more problem quickly: sourcemaps! If you click on a row, we have
some `console.log()` debugging code. But, where does that code come from? Well, if
you click on the `rep_log.js` link, apparently it's coming from line 197. But, that's
a lie! Well, sort of. This is the *built* `rep_log.js` file, not the *source* file.

And *this* highlights a classic problem: when you build many files into one file,
debugging gets harder because error messages and other info don't point to the
*real* line number or the original filename.

Let's fix that! Back in `webpack.config.js`, add `.enableSourceMaps()` with an
argument: `!Encore.isProduction()`:

[[[ code('72016af211') ]]]

This enables extra debugging info - called sourcemaps - whenever we are creating
a *development* build.

Because we just updated the Webpack config, restart Encore:

```terminal
yarn run encore dev --watch
```

Thanks to this, all of our JavaScript *and* CSS files now have some extra content
at the bottom that hints to our browser where the source content came from. This
time, when I click a row, in the console, awesome! It's coming from `RepLogApp.js`
line 104. That is the *real* spot.

Oh, by the way: if you *don't* enable sourcemaps, you may still see *some* sourcemap
info at the bottom of your CSS files during development. That's just an internal
quirk - it won't be there on production.
