# Production Build

During development, we are *not* minifying our assets: yep, they're full of comments
and spaces. And that's perfect for development! I like spaces! And those comments
might be useful! Also... minification takes extra time, so we don't want to slow
down our builds unnecessarily.

In other words, while developing, no minification! But for production, yes minification!
That means that - somehow - we need to be able to pass a flag to `webpack.config.js`
that tells it to compile in dev or production mode.

## Using NODE_ENV

In Node applications, there's a standard way to *signal* the environment to your
apps: by setting an environment variable called `NODE_ENV`. To read this, you can
say `process.env.NODE_ENV`.

Let's log that. Run webpack like normal:

```terminal-silent
./node_modules/.bin/webpack --watch
```

Ok! It prints undefined. So... how do we set that? On a UNIX system, prefix the
command:

```terminal
NODE_ENV=production ./node_modules/.bin/webpack --watch
```

Yes! It prints `production`. If you're on Windows, there's a library called `cross-env`
that can help do this.

The point is: we can now send a flag into Webpack to tell it the environment.

## Minify JavaScript

Awesome! Let's use this flag to minify our JavaScript first, via a plugin.

Start by replacing `module.exports` with a new variable: `const webpackConfig =`.
Then, all the way at the bottom, export this: `module.exports = webpackConfig`.

Before that, add an if statement: if `process.env.NODE_ENV === 'production')`, then
we will add a new plugin. So, `webpackConfig.plugins.push()` then
`new webpack.optimize.UglifyJsPlugin`. And... that's it!

Try it! Run webpack without the NODE_ENV flag first:

```terminal-silent
./node_modules/.bin/webpack --watch
```

Ok cool. The un-uglified `layout.js` file is 1.62 megabtyes. Stop and re-run in production:

```terminal-silent
NODE_ENV=production ./node_modules/.bin/webpack --watch
```

Ahh... this takes longer to run! But, the JavaScript files are way, way smaller!

Open up the built `login.js`. Ah, yes, one *beautiful*, single line.

***TIP
License comments from outside libraries are *not* removed from the Uglified files
for legal reasons. To remove them, see the [extractComments option](https://github.com/webpack-contrib/uglifyjs-webpack-plugin#extractcomments).
***

## Adding package.json scripts

But, remembering this long command is a bummer. Heck, the command was *already*
long, *before* adding the `NODE_ENV` stuff! My fingers are so tired...

There's a *great* way to improve this. Open `package.json`. Add a new key called
`scripts` set to a hash. Inside, you can put something like `dev` set to
`NODE_ENV=dev webpack`.

Thanks to that, we have a shortcut! Just run:

```terminal
yarn dev
```

Yep, *it* runs `NODE_ENV=dev webpack`! And we don't even need to say
`node_module/.bin/webpack`: the `scripts` know to look there already for `webpack`.

Let's add two more: `watch` set to the same thing with `--watch` on the end. And
finally, `production`, with `NODE_ENV=production`.

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
