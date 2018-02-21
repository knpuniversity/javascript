# Handling Images with the CopyPlugin

Hey! Bonus! A *really* cool side-effect of using Webpack is that *none* of these
files in the `assets/` directory need to be public anymore! I mean they *live* in
the public directory currently... but the user *never* needs to access these file
directly: Webpack is processing *all* of them: and moving them into `build/`.

To celebrate, let's move `assets/` *out* of the `public/` directory and into the
*root* of our project. We don't *need* to do this... but if something doesn't need
to be publicly accessible, why make it publicly accessible?

And this change breaks almost *nothing*. The *only* things we need to update are
the paths in `webpack.config.js`.

After making that change, restart Encore!

```terminal-silent
yarn run encore dev --watch
```

And... refresh! Woohoo! Wait... there's a missing image! Bah! I was lying! There
*is* one file that *still* needs to be publicly accessible!

Open `index.html.twig`... ah! We have a good, old-fashioned `img` tag that references
one of the images in the `assets/` directory. And... whoops! It's not public anymore.
My bad!

This is one of the *few* cases - maybe the *only* case - where we need to refer to
public images from *outside* a file that Webpack processes. The simple problem is
that Webpack doesn't know that it needs to move this file!

Of course, there's an easy fix: we could just move this *one* file back into the
`public/` directory. But... that sucks: I'd *rather* keep all of my assets in one
place.

## Installing copy-webpack-plugin

To do this, we can take advantage of a Webpack *plugin* that can copy this file
for us. Google for `copy-webpack-plugin` to find its [GitHub page](https://github.com/webpack-contrib/copy-webpack-plugin).
Basically... Encore gives you *a lot* of features... but it doesn't give you *everything*.
But... because we're using Webpack under-the-hood, if you find a Webpack plugin
you want, you can totally use it!

Side note, Encore *will* have a `copy()` method soon. So, you might be able to
do all of this easier. Yay! But, this is still a *great* example of how to extend
Webpack beyond Encore.

Anyways, let's install the plugin first. Notice that they use `npm`. I'm going to
use `yarn`. So copy the name of that plugin, find your terminal, and run:

```terminal
yarn add copy-webpack-plugin --dev
```

## Adding Custom Webpack Config

To use the plugin, we need to require it at the top of the Webpack config file. No
problem. And then below, um.... `config =`... and `plugins:`... what the heck does
this mean?

Well... earlier, I told you that `webpack.config.js` *normally* returns a big configuration
object. And Encore is just a tool to help *generate* that config. In fact, at the
bottom, you can *see* what that config looks like if you want! Just
`console.log(module.exports)`.

Then, restart Encore:

```terminal
yarn run encore dev --watch
```

Woh! There's our config! Actually, it's not so scary: there are keys for `entry`,
`output`, `module`, `plugin` and few other things. *This* is Webpack's config. And
it's important to understand in case you ever need to add something that Encore
doesn't provide.

For example, see the `plugins` key? Back on their docs, *that* is what they're referring
to: they want you to add *their* plugin to that config key.

Ok, so ho can we do that? Well, you could always just add it manually:
`module.exports.plugins.push()` and then the plugin. Yea, we could literally add
something to the plugins array! 

But, fortunately, Encore gives you an easier way to modify the most common things.
In this case, use `addPlugin()` and then `new CopyWebpackPlugin()`. Pass this an
array - this will be the paths it should copy.

## Copying Images into build/

But, before we fill that in... let's think about this. I don't need to copy *all*
of my images to the `build/` directory... just *one* of them right now. So let's
create a *new* directory called `static/` and move any files that need to be copied
into *that* directory, like `dumbell.png`.

In the `CopyWebpackPlugin` config, set `from` to `./assets/static` and `to` to
just `static`. This will copy to the output directory `/static`.

Ok, go restart Encore!

```terminal
yarn run encore dev --watch
```

Once the build finishes... inside `public/build`... yes! We have a new `static`
directory. It's nothing fancy, but this is a nice way to move files like this so
we can reference them publicly in a template.

There's one more reference in the login template: search for "bell" and... update
this one too. Try it! Go back and refresh. There it is!

Next, let's make our CSS sassier... with... Sass of course!
