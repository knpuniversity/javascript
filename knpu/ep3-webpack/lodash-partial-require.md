# Lodash & requiring Partial Libraries

At the bottom of the table, the user chooses an item and enter how many times
they lifted it. I love it! But, management is never satisfied! Nope, they just sent
us a new requirement. To inspire people to lift more, they want to auto-fill that
box with a random number.

To get that random number, we're going to use a library called Lodash. Well, actually,
you can easily get a random number with `Math.random()`... but using Lodash will
be really interesting. Just trust me!

Google for the Lodash library. It's basically a big package of functions. Under
Documentation, one of them is `_.random()`.

Ok cool! Let's get this installed. In your terminal, run

```terminal
yarn add lodash --dev
```

Next, in `RepLogApp.js`, on top, add `const _ = require('lodash')`:

[[[ code('2b78037012') ]]]

Go make sure it finished downloading. Perfect!

Find the `clearForm()` method near the bottom: this is called after we submit the
form. Add `$form.find()` to fetch the `reps` field, then add `.val(_.random(1, 10))`:

[[[ code('98badb7745') ]]]

To make sure that box has a value on load, head up to the constructor and add
`this._clearForm()`:

[[[ code('544a634fc4') ]]]

Perfect! Refresh now! Yes! There's our super random number. And it resets each
time we submit. Management is going to *love* this.

## Require only Part of a Library

So why the heck are we *really* doing this? It wasn't obvious, but the compiled
`rep_log.js` file just got a *lot* bigger! It's 2.7Mb... but before, it was 1.27!
Woh! That's all from lodash! We're importing *every* function from that library...
even though we only need one!

So... question: is there a way for us to import just one thing? Well, it depends
on how the library you're using is built. For lodash, it is possible! Look inside
`node_modules/` for `lodash`. The library is just a bunch of tiny functions all separated
into individual files. When you require `lodash`, it loads a file that requires *all*
of these. But... we could also require just a single file. In this case, `number.js`
holds what we need... plus a few other things. We could require `number.js` or
`random.js`.

Back in our code, change to `const _ = require('lodash/number')`:

[[[ code('73f65e0f95') ]]]

In the browser, everything still works. And the package is back down to 1.3Mb!

That's great! And we're *now* ready to talk about the require function's hipper,
better-looking, and younger sibling: `import`.
