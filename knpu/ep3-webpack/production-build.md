# Production Build

During development, we are *not* minifying our assets: yep, they're full of comments
and spaces. And that's perfect for development! I like spaces! And those comments
might be useful! Also... minification takes extra time, so we don't want to slow
down our builds unnecessarily.

In other words, while developing, no minification! But for production, yes minification!
That means that - somehow - we need to be able to pass a flag to `webpack.config.js`
that tells it to compile in dev or production mode.

## Using NODE_ENV

***TIP
If you are using Webpack 4 or higher, use this to configure the Webpack mode:

```javascript
// webpack.config.js
//...
const webpackConfig = {
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    //...
}
```
***

In Node applications, there's a standard way to *signal* the environment to your
apps: by setting an environment variable called `NODE_ENV`. To read this, you can
say `process.env.NODE_ENV`:

[[[ code('7b8640546b') ]]]

Let's log that. Run webpack like normal:

```terminal-silent
./node_modules/.bin/webpack --watch
```

Ok! It prints undefined. So... how do we set that? On a UNIX system, prefix the
command:

```terminal
NODE_ENV=production ./node_modules/.bin/webpack --watch
```

Yes! It prints `production`. If you're on Windows, there's a library called [cross-env][cross_env]
that can help do this.

The point is: we can now send a flag into Webpack to tell it the environment.

## Minify JavaScript

Awesome! Let's use this flag to minify our JavaScript first, via a plugin.

Start by replacing `module.exports` with a new variable: `const webpackConfig =`:

[[[ code('d6e28979aa') ]]]

Then, all the way at the bottom, export this: `module.exports = webpackConfig`:

[[[ code('c0705c446c') ]]]

Before that, add an if statement: if `process.env.NODE_ENV === 'production')`, then
we will add a new plugin. So, `webpackConfig.plugins.push()` then
`new webpack.optimize.UglifyJsPlugin`:

[[[ code('cc717660bc') ]]]

***TIP
This is for Webpack 4 or higher. At first, install `terser-webpack-plugin` and then use
the following configuration

```javascript
// webpack.config.js
//...
const TerserPlugin = require('terser-webpack-plugin');

//...

if (process.env.NODE_ENV === 'production') {
    webpackConfig.optimization.minimizer = [new TerserPlugin()];
}
```
***

And... that's it!

Try it! Run webpack without the NODE_ENV flag first:

```terminal-silent
./node_modules/.bin/webpack --watch
```

Ok cool. The un-uglified `layout.js` file is 1.62 megabytes. Stop and re-run in production:

```terminal-silent
NODE_ENV=production ./node_modules/.bin/webpack --watch
```

Ahh... this takes longer to run! But, the JavaScript files are way, way smaller!

Open up the built `login.js`. Ah, yes, one *beautiful*, single line.

***TIP
License comments from outside libraries are *not* removed from the Uglified files
for legal reasons. To remove them, see the [extractComments option][extract_comments].
***

## Adding package.json scripts

But, remembering this long command is a bummer. Heck, the command was *already*
long, *before* adding the `NODE_ENV` stuff! My fingers are so tired...

There's a *great* way to improve this. Open `package.json`. Add a new key called
`scripts` set to a hash. Inside, you can put something like `dev` set to
`NODE_ENV=dev webpack`:

[[[ code('f746244c91') ]]]

Thanks to that, we have a shortcut! Just run:

```terminal
yarn dev
```

Yep, *it* runs `NODE_ENV=dev webpack`! And we don't even need to say
`node_module/.bin/webpack`: the `scripts` know to look there already for `webpack`.

Let's add two more: `watch` set to the same thing with `--watch` on the end. And
finally, `production`, with `NODE_ENV=production`:

[[[ code('a733f029d0') ]]]

I love it! Try them out:

```terminal
yarn watch
```

Nice! Stop that, and try:

```terminal
yarn production
```

The command looks right... and the final JavaScript files are super small.

But! Our work is not done yet: we still need to minify the CSS files... *and* handle
a few other things.


[cross_env]: https://npmjs.com/package/cross-env
[extract_comments]: https://github.com/webpack-contrib/uglifyjs-webpack-plugin#extractcomments
