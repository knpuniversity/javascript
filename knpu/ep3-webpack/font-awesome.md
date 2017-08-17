# Font Awesome & file-loader [hash]

We have only *one* link tag left: FontAwesome:

[[[ code('02b7c76843') ]]]

Remove it! And clean up the `stylesheets` block:

[[[ code('2e6bac75eb') ]]]

We don't have FontAwesome installed yet... so find your open terminal tab and run:

```terminal
yarn add font-awesome --dev
```

That's the name of the official FontAwesome package.

Next, in `layout.js`, you guys know what to do - add `require('font-awesome/')`.
To get the correct path, once again, open up `node_modules/`, find `font-awesome/`,
and yes! We can say `css/font-awesome.css`:

[[[ code('9f8d45f148') ]]]

And without doing *anything* else, refresh! It works instantly!!! This little icon
in the menu is from FontAwesome, and so are a few other icons.

## The font-loader Hashed Filenames

Close `node_modules/` and look inside `web/build/`. Wow! It's getting crowded! We
have fonts from Bootstrap, fonts from FontAwesome and one image. 

And, though it's not *really* important, but we can't quickly see which files are
which... because they all have crazy names.

By default, the filenames are a unique hash based on the *contents* of the file.
That's *great*, because it means that if you reference two files that have the same
name... but *usually* live in different directories, when they're copied to `build/`,
they won't collide. It's also built-in cache busting! Woo!

## Controlling file-loader Hashes

Head back to the Webpack site and click back on "Loading Images". There's a link
to the documentation for the [file-loader][file_loader].

It shows how to use the `file-loader` using the inline syntax, which is one of the
reasons I wanted you to see it. It looks like there's an *option* called `name`...
which should let us control the *name* of those output files. And, just like with
Webpack's `output`, it has some special placeholders, like `[name]`, `[extension]`
and `[hash]`.

Let's play with this! In `webpack.config.js`, remove the simple `file-loader` and
use the expanded syntax from earlier. That means, add `loader: 'file-loader'` and
`options`:

[[[ code('f9ada96ac3') ]]]

Pass this the `name` option, set to `[name]` - that's the original name of the file -
`-[hash]` because we *do* still want the hash in the name. But shorten it by adding `:6`.
This will only use the first *six* characters of the hash, which is probably unique
enough - these *long* filenames were bumming me out. Finish with `.[ext]`:

[[[ code('2355a1fd2c') ]]]

This is *totally* not needed - I'm just being anal about how my files are named.
Copy all of this and repeat it for the fonts:

[[[ code('306c172efc') ]]]

To see this in action, in your terminal, stop webpack, and then clear out the `build/`
directory:

```terminal
rm -rf web/build/*
```

Ok, come back Webpack!

```terminal-silent
./node_modules/.bin/webpack --watch
```

Yes! Now, the filenames are way prettier. And I *feel* better!

Next! Let's get crazy and move our front-end assets... out of the public directory...


[file_loader]: https://webpack.js.org/loaders/file-loader/
