# Versioning & Cache Busting

Let's talk about caching.

## Validation vs Expiration Caching

Imagine someone comes to our site and downloads `layout.js`. In a typical setup,
when they visit the next page, their browser makes a request back to our server for
`layout.js`. If that file has not changed, our server sends back an empty response
that says:

> Hey! Use your cached version dude!

But if the file *has* changed, our server sends back the new, updated `layout.js`.

This caching strategy is called "validation". On the bright side, when `layout.js`
changes, browsers will automatically go get the new, updated file. With validation
caching - which is what most web servers do by default - you shouldn't have any
problems where your user needs to "clear their cache" or "force refresh" to see
the updated CSS or JS.

But... validation caching is not the fastest way to cache! Nope, you can instead
configure your web server to use *expiration* caching. In this situation, when your
user downloads `layout.js`, the server will say "Hey browser! Cache this for 1 year!".
Then, as the user browses your site, they *instantly* use the cached file... instead
of making a request to our server to ask if it's still valid.

Yep, expiration caching rocks! So why don't we all use it? Well, what if we update
`layout.js`? With expiration caching... well... our existing users would *never*
download the new file. Their browsers would use the old file for a whole year!

To get expiration caching to work, whenever `layout.js` changes, the URL to it
needs to change... either by adding a query parameter, like `/build/layout.js?v=5`
*or* by changing the filename.

Webpack has a *great* way to do that automatically.

## Adding [hash] to the Filenames

At the top of `webpack.config.js`, add a new variable called `useVersioning` set
to `true`:

[[[ code('00f457e351') ]]]

This will let us disable versioning easily if we want to.

Start under `output`: the `filename` option controls the JavaScript files. Change
this: if `useVersioning`, then change the filename to be `[name].[hash:6].js`:

[[[ code('230ce66d6a') ]]]

`[hash]` is another special wildcard: it's a hash based on the file's *contents*.
And this outputs just the first 6 characters.

To control the CSS filenames, find the `plugins` section. For `ExtractTextPlugin`,
add `useVersioning`. If it's on, use `[name].[contenthash:6].css`:

[[[ code('2b589790b0') ]]]

***TIP
If you're using Webpack 4 or higher, we recommend using the `mini-css-extract-plugin` 
instead of ExtractTextPlugin. However, if you do use ExtractTextPlugin, 
use `[name].[md5:contenthash:hex:6]` to avoid an issue with changes in Webpack 4.
***

ExtractTextPlugin exposes a `[contenthash]` wildcard.

And... that's it! Find your webpack terminal. First, clear the build directory:

```terminal
rm -rf web/build/*
```

Now run:

```terminal
yarn dev
```

So cool! By changing two lines, all of the filenames contain a hash! Now, whenever
we change a file, its built filename changes.

Of course... well... our site is totally broken! Whoops! We created a new problem:
our app needs to point to the new filenames... but those hashes will change *constantly*!

Let's fix that next!
