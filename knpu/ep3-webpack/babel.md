# babel-loader

RepLogApp uses the ES6 class syntax. And, at the end of the last tutorial, we used a
tool called Babel to *transpile* this new ES6 code to older code that will run
on older browsers. But... we lost that when we moved to Webpack. Yep, if you look
at the dumped `rep_log.js` file and search for `class RepLogApp`, there it is!
Still using the ES6 class syntax.

## Installing babel-loader

It's time to bring Babel back. How? Well, we still have the `.babelrc` file from
the last tutorial, which configures Babel to do the transpiling we want:

[[[ code('12b34dedba') ]]]

So if we could somehow tell Webpack to pass all `.js` files through Babel...
we'd be done!

How do we do this? How can we tell Webpack to filter our code through something
external? With a *very* powerful system in Webpack called *loaders*. Google for
"babel-loader" and find its [GitHub page][babel_loader]. Let's get this guy installed.
Copy the `yarn add` line, though we already have `webpack` installed.

Find your terminal and run it with `--dev` on the end:

```terminal-silent
yarn add babel-loader@7 babel-core babel-preset-env --dev
```

***TIP
Latest version of `babel-loader` requires a newer version of Babel - so 
we’re staying on version 7.
***

This installs Babel itself and the `env` preset: both things we installed in the
last tutorial. It also installed `babel-loader`.

## About Loaders

Here's how the loader system works. In Webpack, you can say:

> Yo, Webpack! When I require this file, I want you to send it through this loader
> so that it can make whatever changes it wants.

In this case, we want to send `RepLogApp` through `babel-loader`. How? Of course,
there are two ways.

## The Inline Loader Sytnax

The first is a special syntax *right* when you require the module. Before the
name of the module, add `babel-loader!`:

[[[ code('bf59017350') ]]]

Read this from right to left. It says: require this module and *then* pass it through
`babel-loader`. You can even have *multiple* loaders, each separated by an exclamation
mark, processing from right to left. Each loader can *even* accept *options* via
query parameters when using this syntax.

Let's try it! Refresh! Yes.... nothing is broken. And in the built `rep_log.js` file,
search for `RepLogApp`. The `class` key is gone! Replaced by fancy code that mimics
its behavior.

Babel is back!

## Using a Loader Globally

This is great! Except that I do *not* want to have to add this to *every* require
statement! Thankfully, Webpack also has a *global* way to apply loaders.

Remove the inline loader syntax:

[[[ code('7045f55c97') ]]]

And open `webpack.config.js`. Add a new `module` key set to `{}` and a sub-key
called `rules` set to an array:

[[[ code('287398d29a') ]]]

Here's the deal: each *rule* will contain a filename regular expression and a loader
that should be applied whenever a file matches that. Add `{}` for this first
loader with a `test` key. We want to apply the loader to *all* files that *end*
in `.js`:

[[[ code('43e10fd3e5') ]]]

That's what this regular expression matches. Below this, add `use`, with
`loader: 'babel-loader'`:

[[[ code('c2915277b1') ]]]

That is it! Now, *every* `.js` file will go through Babel! Woohoo!

Restart the webpack script:

```terminal-silent
./node_modules/.bin/webpack --watch
```

And check out the built `rep_log.js` file. Try to find `RepLogApp` again. Yep, the
same, beautiful, transpiled code.


[babel_loader]: https://github.com/babel/babel-loader
