# extract-text-webpack-plugin

Ever since we started requiring CSS from JS, we've had this annoying problem:
when the page loads... *just* for a second... there's no CSS! Oof! Ugly!

This is because the CSS is packaged *inside* our JavaScript... so we need to wait
for it to download and be executed.

This is ok for development, but we *cannot* have this on production. The fix involves
one of the most *important* plugins in all of Webpack: the
`extract-text-webpack-plugin`. It has a weird name.... but has one simple job:
it outputs a *real* CSS file, instead of embedding CSS in JavaScript.

***TIP
In Webpack 4 you can use the beta version `extract-text-webpack-plugin@4.0.0-beta.0` or
there is a new way to extract CSS to files with https://webpack.js.org/plugins/mini-css-extract-plugin/
***

Let's get it rocking! Find your terminal and run

```terminal
yarn add extract-text-webpack-plugin --dev
```

## Current Setup: style-loader

Now open up `webpack.config.js`. Remember: CSS is processed via *loaders*. If a
file ends in `.css`, it goes through the `css-loader` and then the `style-loader`:

[[[ code('b6fbe2ac8f') ]]]

For Sass, it's basically the same: the `sass-loader`, `resolve-url-loader`, then
the same `css-loader` and `style-loader`:

[[[ code('1285451216') ]]]

The `style-loader` is the key: it embeds the CSS so that it's added to the page
as a `style` tag. Basically, we need to *replace* the `style-loader` with something
that, instead, outputs a real CSS file. That's *exactly* what the `extract-text-webpack-plugin`
does!

Bring in the package with `const ExtractTextPlugin = require('extract-text-webpack-plugin')`:

[[[ code('9883f64c31') ]]]

## The Loaders: ExtractTextPlugin.extract()

Now, under the loaders for `.css` files, *remove* the two loaders and, instead,
add `ExtractTextPlugin.extract()` and pass that some options:

[[[ code('8f71e235b0') ]]]

First, `use` set to `cssLoader`. And then, `fallback` set to `styleLoader`:

[[[ code('79f4730bd6') ]]]

Ignore the `fallback` key for a moment. Basically, the `extract()` function is a
fancy way to prepend the loaders in `use` with a special `extract-text-webpack-plugin`
loader. Thanks to this, CSS files will be processed through `css-loader` and then
through this new extract text loader.

The `styleLoader`, which is set on `fallback`, is not used at all anymore:

[[[ code('38bcdf0848') ]]]

Well, actually, this is one of the least important, but most confusing parts about the
plugin. Later, when we talk about code splitting, I'll explain what the `fallback`
option *really* does. But for now, the `styleLoader` is no longer used. So, no more
style tags!

Repeat this for Sass. I'll copy the three loaders and then say
`ExtractTextPlugin.extract()`, passing that `use` set to those 3 loaders and
`fallback` set again to `styleLoader`:

[[[ code('9b8bcd4147') ]]]

## Adding the Plugin

The *last* step is to activate all of this down in the `plugins` section. Add
`new ExtractTextPlugin()` and pass it a special name: `[name].css`:

[[[ code('bb7402ffd1') ]]]

Let's see what this does! Find your webpack tab and restart the dev server:

```terminal-silent
./node_modules/.bin/webpack-dev-server --hot
```

When it finishes, scroll up to the output. In addition to `login.js`, there is a
`login.css`! And a `layout.css` and a `rep_log.css`. Our CSS is *no* longer packaged
inside JavaScript: each entry now has its own CSS file!

***TIP
If a JavaScript entry file does not require *any* CSS, no `.css` file will be
output by Webpack.
***

## Adding the link Tags

This will fix our CSS flashing problem! But... with a downside: we now need to manually
include `link` tags along with our `script` tags. In `base.html.twig`, add a `link`
tag for `build/layout.css`:

[[[ code('50c199d760') ]]]

Copy that. We need to do this again on our two pages:
`app/Resources/FOSUserBundle/views/Security/login.html.twig`. Override the block
`stylesheets`, call `parent()` and add the `link` tag to `login.css`:

[[[ code('4623d97462') ]]]

Do all of this again in `index.html.twig`. This time we need to point to `rep_log.css`:

[[[ code('640a1444bd') ]]]

I think we're ready! Refresh the page. Yes! No CSS delay! View the source and click
on `rep_log.css`. Yep! It's a beautiful, traditional CSS file.

## We Killed HMR!

But... I have some bad news. We just killed hot module replacement! If you make
a change and move over to your browser... it says "Nothing hot updated" and
"App is up to date".

Yep, `extract-text-webpack-plugin` and HMR are incompatible. Boooo! There *is* a
plugin to make this all work - [css-hot-loader][css_hot_loader], but it's pretty
young and I haven't tested it yet. If you like HMR, try it out!

But, how is it possible that two *super* important features like extract text and
HMR don't work together?! Well, the official answer is that `extract-text-webpack-plugin`
should only be used for your production build - not during development. We'll talk
about production builds next.

But I don't like that! If we *don't* use `extract-text-webpack-plugin` while developing,
then my site will look great... *even* if I completely forget to add my `link` tag!
I might only discover a page is ugly after deploying it to production. That's why
I always enable the plugin. But, if you like HMR and you can't get it to work with
that other plugin, disabling it during development *is* a valid option.

For us, I'm going to stop using the `webpack-dev-server`. At the top of `webpack.config.js`,
set `useDevServer` to `false`:

[[[ code('d72ce7059b') ]]]

And then, in `app/config/config.yml`, comment out the `base_url` stuff:

[[[ code('bcf7222e09') ]]]

Yep, we'll use the tried and true `webpack --watch`:

```terminal-silent
./node_modules/.bin/webpack --watch
```


[css_hot_loader]: https://github.com/shepherdwind/css-hot-loader
