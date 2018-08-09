# ...Object Rest Spread

When a user submit an invalid form, we get a nice error message... but our cool
"lifting to the database" message stays! Totally confusing! It looks like we're
*still* trying to save the new rep log. Let's fix that!

In `RepLogApp`, the state that controls this is called `isSavingNewRepLog`. When
the AJAX call is successful, we set this back to `false`. We need to *also* set
this back to false inside the `catch`. And yes, fixing this is as *easy* as just
copying this key and pasting it below. Sure, this would duplicate that key in two
places... but, that's *super-minor* duplication: no big deal.

Except... I want to learn a super-fun new language feature. To show that, let's fix
this in a *slightly* fancier way. Above the AJAX call, set `const newState =` an
object with `savingNewRepLog` set to false.

[[[ code('48fa5617f9') ]]]

This represents the new state that we want to apply in *all* situations: success
or failure. In other words, we want to *merge* this state into whatever is being
set in success and also down in catch.

How can you merge objects in JavaScript? We've seen it before: `Object.assign()`.
Check it out: `return Object.assign()`. For the first argument, copy the new state
and paste. For the second argument, use `newState`.

[[[ code('26ddf0eb51') ]]]

`Object.assign()` will merge the data from `newState` *into* the first object and
return it. Perfect!

Repeat this in catch: add `Object.assign()`, then `newState`.

[[[ code('e8c0c885fd') ]]]

Let's go make sure this works: refresh, select our bad data and... cool. It shows
for just a second, then disappears.

## Installing & Configuring babel-plugin-transform-object-rest-spread

Object.assign() is really great. We also used it earlier to merge two objects
*without* modifying the original object. *That* was *super* important.

The only problem with `Object.assign()` is that it's... kinda confusing to look
at, *especially* if you need to use it to avoid mutation.

Ok, idea time: what if we could do this: remove the `Object.assign()`, return a normal
object, but then, add `...newState`.

[[[ code('d6abdcbda4') ]]]

That would be cool, right? I mean, we *already* do this for arrays! But... Webpack
explodes: the "spread" syntax does *not* work for objects.

Or does it?! Google for "babel plugin transform object rest spread" and find the
Babel documentation page. The feature we're "dreaming" about is called
"object rest spread". It is *not* an official ECMAScript feature. But, it's currently
a proposed, "draft" feature that's in a late stage. There's no promises, but that
means it will *likely* become a real feature in a future ECMAScript version.

And, because the JS world is a bit nuts, you don't *need* to wait! We can *teach*
Babel how to understand this syntax. Copy the package name, find your terminal
and run:

```terminal
yarn add babel-plugin-transform-object-rest-spread --dev
```

Oh, and as I mentioned before, most of these Babel plugins will have a slightly
new name in the future: `@babel/plugin-transform-object-rest-spread`. But, it's
really the same library.

When you work with Babel, you typically configure it with a `.babelrc` file. But,
Encore does this for us! Open `webpack.config.js`: the `configureBabel()` function
allows us to *extend* its configuration. Add `babelConfig.plugins.push()` and
paste the name.

[[[ code('bbb2252539') ]]]

In the future, if you download the new `@babel/plugin-transform-object-rest-spread`
library, the plugin name will be the full library name, starting with the `@babel`
part. Just follow the docs.

Head back to the tab that's running Encore. Yep, it's *super* angry. Stop and re-run
this command:

```terminal-silent
yarn run encore dev-server
```

And... it works! That's awesome! Babel now understands this syntax.

But... PhpStorm is still angry: ESLint parsing error. No worries: we just need to
tell ESLint that this syntax is cool with us. Open `.eslintrc.js`. Under `ecmaFeatures`,
add `experimentalObjectRestSpread` set to true.

[[[ code('30c58b7147') ]]]

Deep breath: go back to RepLogApp. And... sweet! The error is gone!

## Using the Object Rest Spread

Let's finish this! Down in `catch`, remove `Object.assign()`, remove the second
argument and add `...newState`.

[[[ code('a7fde36082') ]]]

And one more time: scroll down to `handleDeleteRepLog()`. We don't need this weird
code anymore! Just return a new object with `...repLog` then `isDeleting: true`.

[[[ code('dc578d8662') ]]]

I *love* that. And even better, when we refresh, it's not broken! We rock!
