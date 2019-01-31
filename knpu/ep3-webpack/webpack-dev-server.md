# webpack-dev-server

To make developing easy, we're using the `--watch` flag on Webpack. But, there's
another way to make developing with Webpack awesome: the Webpack dev server. This
is a totally separate library that works a *bit* like `--watch`... but has some magic
up its sleeves.

First, install it

```terminal
yarn add webpack-dev-server@2 --dev
```

As soon as it finishes, go back to the main tab. Stop Webpack and clear the build
directory:

```terminal
rm -rf web/build/*
```

Now, instead of running webpack, run `webpack-dev-server`:

```terminal-silent
./node_modules/.bin/webpack-dev-server
```

OooOOOooo. I want you to notice two things. First, it *appears* to do the same thing
as Webpack: it builds our assets. And second, it says that it's running on `localhost:8080`.
Yea, this created a new web server that serves our Webpack assets.

Let me show you: copy that URL. But before we try it, look in `web/build`. Holy cow!
It's *empty*! When you use `webpack-dev-server`, it does *not* physically write
any files! Instead, it runs a web server - `localhost:8080`. And when you navigate
to the URL of one of our built files... there it is! 

## Pointing our App at the dev server

To use this, we need to change all of our assets - all of our `script` and `link` tags
to point to that host. Yep, instead of `/build/layout.js`, this script tag needs
to be `http://localhost:8080/build/layout.js`. If you're using Symfony, you're in
luck! Doing this is easy.

Open `app/config/config.yml`. And, under the `framework` key, then `assets`, set
`base_url` to `http://localhost:8080`. Actually, in a real project, you should
probably put this in `config_dev.yml` instead, so that it only affects the `dev`
environment:

[[[ code('66fcbcc5cd') ]]]

Let's try it! Refresh the page! Ha! Even though there are *no* physical files in
`web/build`, this works! All of our assets now point to `http://localhost:8080`.

## webpack-dev-server Static Assets

But... there's a problem. Look at the network tab. Hmm... there are a few 404's,
including for `router.js`. In the HTML source, hmm, the path looks correct. But
remember: `router.js` is a normal file: it is *not* processed through Webpack.

Open the URL in a browser. Yep, it's broken! `webpack-dev-server` correctly serves
our Webpack-built assets... but it apparently does not serve normal, static assets.

Here's the confusing thing about the dev server. Go to just `http://localhost:8080`.
Huh, it looks like it *can* serve static files from our project. Oh... but it's serving
files from the *root* of our project. `webpack-dev-server` doesn't know that the
`web/` directory is our document root! Yea! We need to tweak things so that we're
able to go to `http://localhost:8080/favicon.ico`, not `/web/favicon.ico`. We can
do that easily.

So, the confusing part is that URLs like `/build/login.js` *do* work... you don't
need `/web/build/login.js`. Basically, Webpack-processed assets already have the
correct URL, but static assets don't. 

## Setting contentBase

How do we fix this? In `webpack.config.js`, add a new `devServer` key. The most
important option we need is `contentBase` set to `./web`:

[[[ code('5312f3c9be') ]]]

Go restart the dev server:

```terminal-silent
./node_modules/.bin/webpack-dev-server
```

*Now*, files like `login.js` still work. But go back to `http://localhost:8080`.
Perfect! It's looking at the `web/` directory. And that means that the dev server
can now serve our static assets.

When we refresh, the router 404 is gone! There are a few other 404's for some font
awesome assets - we'll fix that next.

Anyways, compared to using `--watch`, this is pretty similar. Make a change, like
the darken from 2.5 to 10:

[[[ code('f09afaa697') ]]]

Hit save and then quickly switch over to your browser. See it reload? I didn't
do that! The dev server automatically reloaded for me.

That's cool... but the *real* reason to use the dev server is for Hot Module Replacement,
which is *amazing*... and our next topic.
