# Your First Webpack

Since the `require()` key doesn't work in a browser:

[[[ code('87f43fcf2c') ]]]

We're going to use Webpack to... pack it all together! Let's jump straight in
to see how it works!

## Installing webpack

In the last tutorial, we installed Babel:

[[[ code('4227383260') ]]]

We're going to use Babel again. But for now, let's remove it. In your terminal, run
`yarn remove babel-cli` then `babel-preset-env`:

```terminal-silent
yarn remove babel-cli babel-preset-env
```

After this, we have absolutely *nothing* in our app: `package.json` is empty:

[[[ code('ae6952efea') ]]]

And so is `node_modules/`. We're starting from scratch.

Now, add webpack:

```terminal
yarn add webpack@3 --dev
```

***TIP
This tutorial uses Webpack v3, so please double check that you install that version. If you
do want to use Webpack 4 or higher, we've done our best to add tips throughout the tutorial 
to help you. If you're installing Webpack 4 (or higher), you also need to install `webpack-cli`:

```terminal
yarn add webpack webpack-cli --dev
```
***

As it's downloading, let's talk strategy. Webpack is an executable, and we will point
it at `RepLogApp.js`. Webpack is amazing because it will actually *read* the `require()`
call inside that:

[[[ code('a9270424c6') ]]]

Open `RepLogAppHelper.js`, and finally dump one big file with *both* modules inside.
Yes, this means *we* will get to use the `require()` function and our *browser* will
still get one, streamlined, simple, beautiful JS file.

Create a new directory in `web/` called `build/`: we'll put our finished file here.

## Running webpack

Back in our terminal, awesome! Yarn finished its work... and now `node_modules/`
is *filled* with goodies. To run Webpack, use `./node_modules/.bin/webpack`. This
needs 2 arguments: the input file - so `web/assets/RepLogApp.js` - and the output
file - `web/build/rep_log.js` - a different filename to avoid confusion.

Deep breath. Run webpack:

```terminal-silent
./node_modules/.bin/webpack web/assets/js/RepLogApp.js web/build/rep_log.js
```

***TIP
If you are using Webpack 4 or higher, add the `--mode` and `-o` options:

```terminal-silent
./node_modules/.bin/webpack web/assets/js/RepLogApp.js -o web/build/rep_log.js --mode development
```
***

Yes! No errors... and it looks like it did something. Check the `web/build` directory...
we *do* have a `rep_log.js` file. In `index.html.twig`, update the script `src`
to point here: `build/rep_log.js`:

[[[ code('2652ebc1af') ]]]

Now, refresh! Everything works! Holy cats Batman! We just unlocked the `require()`
function for front-end JavaScript. Game. Changer.

## Checking out the Compiled File

Check out the compiled file. Webpack adds some bootstrap code at the top: this helps
it do its job internally. Then, below that, you see our code: `RepLogApp` first and
then, the `Helper` class.

Yep, webpack, um, packs all our modules into one file. Well, it's actually much,
much more powerful than that. But this is already *huge*.

## Ignore the build Directory

Now, the `build/` directory is not something we need to commit to the repository:
we can always rebuild this file whenever we need to. So, in `.gitignore`, ignore
it: `/web/build/*`:

[[[ code('6925333847') ]]]

Next, we'll create the all-important `webpack.config.js` file: they key to unlocking
Webpack's full potential.
