# Lodash & requiring Partial Libraries

At the bottom of the table, you choose what you're lifting and enter how many times
you lifted it. But, management just send us a new requirement: to inspire people
to lift more, they want to auto-fill that box with a random number.

To get that random number, we're going to use a library called Lodash. Well, actually,
this is a bit overkill, but it makes for a great example! Trust me!

Google for the Lodash library. It's basically a bit library of utility functions.
Under Documentation, one of them is `_.random()`.

Ok cool! Let's get this installed. In your open terminal, run

```terminal
yarn add lodash --dev
```

Next, in `RepLogApp.js`, on top, add `const _ = require('lodash')`.

Let's go make sure it's down downloading. Perfect!

Find the `clearForm()` method near the bottom: this is called after we submit the
form. Add `$form.find()` to find the `reps` input, then all `.val(_.random(1, 10)`.

To make sure that box has a value on load, head up to the constructor call `this._clearForm()`.

Perfect! Refresh now! Ah, there's our cute little random number. It resets each
time we submit.

## Require only Part of a Library

So why the heck are we *really* doing this? It wasn't obvious, but notice that the
compiled `rep_log.js` just got a lot bigger! It's 2.7 mb... but before, it was 1.27!
Yea! That's all from lodash! We're importing *every* function from that library...
even though we only need one!

So... is there a way for us to import just one thing? Well, it depends on the
library. In this case, it is possible! Look inside your `node_modules` for `lodash`.
The library is just a bunch of tiny functions all separated into files. When you
require `lodash`, you load a file that loads *all* of these. But you can also
require just a single file. In this case, `number.js` holds what we need... plus
a few other things. We could require `number.js` or `random.js`.

Back in our code, change to `const _ = require('lodash/number')`.

In the browser, everything still works. And the package is back down to 1.3 mb!

That's great! And we're now ready to talk about the require function's hipper,
better-looking little brother: `import`.