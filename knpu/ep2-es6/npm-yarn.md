# yarn & npm: Installing Babel

Ok, so do you love ES2015 yet? Man, I sure do. So... let's go use it immediately
on our site! Oh wait.... didn't I mention that its features aren't supported by
all browsers? Whoops. Yea, the latest version of Chrome supports everything...
but if some of our users have older browsers, does this mean we can't use ES2015?

## npm and yarn: Package Manager Battle!

Nope! You *can*! Thanks to an amazing tool called Babel. But before we talk about
it, we need to do a little bit of installation. In the Node.js world, the package
manager is called npm, and because you already installed Node, you already have it!

But wait! There's a disturbance in the Node.js package manager force. Yes, there
is another... package manager... called Yarn! It's sort of a competitor to npm, but
they work almost identically. For example, in PHP, we have a `composer.json` file.
In Node, we will have a `package.json`... and you can use either `npm` or `yarn`
to read it.

In other words,... you can use `npm` or `yarn`: they basically do the same thing.
You could even have some people on your team using `npm`, and others using `yarn`.

We're going to use Yarn... because it's a bit more sophisticated. But, that means
you need to install it! I'm on a Mac, so I already installed it via Brew. Check
[Yarn's Docs][install_yarn] for your install details.

## Creating a package.json

To use Yarn, we need a `package.json` file... which we don't have yet! No worries,
to create one, run:

```terminal
yarn init
```

It'll ask a bunch of questions - none are too important - and you can always
update your new `package.json` file by hand later:

[[[ code('9d632b624b') ]]]

Awesome!

## Installing Babel

Ok, the wonderful tool that will fix *all* of our browser compatibility problems
with ES2015 is called Babel. Google for it to find `babeljs.io`.

In a nut shell, Babel reads *new* JavaScript code, i.e. ES2015 code, and recompiles
it to *old* JavaScript so that all browsers can understand it. Yea, it literally
reads source code and converts it to *different* source code. It's wild!

Go to [Setup][setup_babel]. In our case, to see how it works, we're going to use the CLI,
which means we will run Babel from the command line. To install Babel CLI, it wants us
to run `npm install --save-dev babel-cli`.

But don't do it! Since we're using Yarn, run:

```terminal
yarn add babel-cli --dev
```

That does the same thing, but with more exciting output!

This made a few changes to our project. Most importantly, it added this `devDependencies`
section to `package.json` with `babel-cli` inside:

[[[ code('5d84c406df') ]]]

It also created a `yarn.lock` file: which works like `composer.lock`. And finally,
the command added a new `node_modules/` directory, where it downloaded `babel-cli`
and all of its friends, um, dependencies. That is the `vendor/` directory for Node.

Open up your `.gitignore` file. At the bottom, let's ignore `/node_modules/`:

[[[ code('ed719b6543') ]]]

We don't need to commit that directory because - thanks to the `package.json` and
`yarn.lock` files - anyone else can run `yarn install` to download everything they need.

Okay, enough setup! Let's use Babel!


[install_yarn]: https://yarnpkg.com/lang/en/docs/install/
[setup_babel]: http://babeljs.io/docs/setup/
