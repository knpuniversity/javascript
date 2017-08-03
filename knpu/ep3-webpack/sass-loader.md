# Sass with sass-loader

I just read this awesome article about how cool Sass is. So now, I'm bored with my
old, `main.css` file. Oof. Ancient! Rename this to `main.scss`. Trendy! Exciting!

Now that this is a *Sass* file - oooOOOooo - I'll re-work some syntax. Instead of
having this extra `:hover` and `:focus` section, we can leverage Sass syntax and
say `&:hover, &:focus`, followed by the CSS.

That should, *ultimately*, dump the same CSS. But now, we have the power of Sass!

Since we renamed the file, in `layout.js`, we need to change the `require` to be
`main.scss`.

Now, what do you think will happen when webpack sees this import? You can probably
guess: it's *not* going to like it.

Find your webpack terminal. Oh boy... oof, I was right. We have a very familiar error:

> Module parse failed. Unexpected token. You may need an appropriate loader
> to handle this file.

We *do* have a loader for files ending in `.css`... but not `.scss`. Fixing this?
Oh, it's *so* nice.

## Adding sass-loader

Google for [sass-loader](https://github.com/webpack-contrib/sass-loader). Let's get
this guy installed. This package needs itself - `sass-loader` - but also another
package called `node-sass`. Copy both of those. Then, in your terminal, run:

```terminal
yarn add sass-loader node-sass --dev
```

Next, in `webpack.config.js`, we just need to setup our `.scss` loader. Copy the
CSS loader and paste it. Then... this is cool... just add `sass-loader` as a *third*
loader. Oh, and don't forget to update `test` for `.scss` files.

I love this: `sass-loader` will be called first, which will convert the SASS into
CSS. Then, `css-loader` will convert that to a JavaScript object. Finally, `style-loader`
will add the CSS to the page. That's team work people!

Switch over to your Webpack tab, hit Control+C and restart webpack:

No errors! Try the site. It looks *great*.

Guys! In just a *few* lines of code, we've unlocked the power of *Sass*. Use it
wherever you want. Like Less instead? It's *just* as easy to setup.
