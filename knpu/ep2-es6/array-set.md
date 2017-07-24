# Array, Set and ES2016

The `Map` object is perfect for maps, or associative arrays as we call them in the
PHP biz. But what about true, indexed arrays? Well actually, JavaScript has *always*
had a great way to handle these - it's not new! It's the Array object.

Well, the Array object isn't new, but it *does* have a new trick. Let's check out
an example: when the page loads, we call `loadRepLogs()`:

[[[ code('bb6ad1fb5e') ]]]

This fetches an array of `repLog` data via AJAX and then calls `_addRow()` on each
to add the `<tr>` elements to the table.

But once we add the table rows... we don't actually store those `repLog` objects
anywhere. Yep, we use them to build the page... then say: Adios!

Now, I *do* want to start storing this data on my object, and you'll see why in a
minute. Up in the `constructor`, create a `repLogs` property set to `new Array()`:

[[[ code('eb9ab0dbab') ]]]

If you've never seen that `Array` object before... there's a reason - stay tuned!
Then, down in `_addRow()`, say `this.repLogs()` - which is the `Array` object -
`this.repLogs.push(repLog)`:

[[[ code('d2bc1e6dde') ]]]

Back up in `loadRepLogs()`, after the `for` loop, let's see how this looks:
`console.log(this.repLogs)`. Oh, and let's also use one of its helper methods:
`this.repLogs.includes(data.items[0])`:

[[[ code('81ef2cae37') ]]]

Obviously, this item *should* have been added to the `Array`!

Refresh! Yea! We see the fancy `Array` and the word `true`. Awesome!

But hold on! The `Array` object may not be new, but the `includes()` function *is*
new. In fact, it's *really* new - it wasn't added in ES2015, it was added in *ES2016*!
ES2015 came with a *ton* of new features. And now, new ECMAScript releases happen
yearly, but with many fewer new things. The `Array`' `includes()` function is one of
those few things in ES2016. Cool!

Oh, and by the way, you don't typically say `new Array()`... and PHPStorm is yelling
at us! In the wild, you just use `[]`:

[[[ code('6873e85264') ]]]

That's right, when you create an array in JavaScript, it's actually this `Array` object.

## Calculating the Total Weight

But... why are we keeping track of the `repLogs`? Because now, we can more easily
calculate the total weight. Before, we passed the `Helper` object the `$wrapper`
element so that it could find all the `tr` elements and read the weight from them.
We can simplify this! Instead, pass it our `Array`: `this.repLogs`:

[[[ code('d7c5a9d925') ]]]

At the bottom of this file, change the `constructor()` for `Helper` to have a `repLogs`
argument. Set that on a `repLogs` property:

[[[ code('8c8aa4d098') ]]]

Below in `calculateTotalWeight()`, instead of using the `$wrapper` to find all the
`tr` elements, just pass `this.repLogs` to the static function. Inside of that,
update the argument to `repLogs`:

[[[ code('2c552e256c') ]]]

Previously, `_calculateWeights()` would loop over the `$elements` and read the
`data-weight` attribute on each. Now, loop over `repLog of repLogs`. Inside,
set `totalWeight += repLog.totalWeightLifted`:

[[[ code('a3e6d1f5ce') ]]]

It's nice to calculate the total weight from our source data, rather than reading it
from somewhere on the DOM.

Okay! Try that out! The table still loads... and the total still prints!

***TIP
Actually, we made a mistake! When you delete a rep log, the total weight will no
longer update! That's because we now need to *remove* the deleted `repLog` from
the `this.repLogs` array.
 
No problem! The fix is kinda cool: it involves adding a reference to the `$row` element:
the `index` on the `this.repLogs` array that the row corresponds to. This follows
a pattern that's somewhat similar to what you'll see in ReactJS.

[[[ code('1cb71dfcf3') ]]]
***

## Introducing Set

But, ES2015 added *one* more new object that's related to all of this: `Set`. It's
a lot like `Array`: it holds items... but with one important difference.

Open up `play.js` and set `foods` to an array:

[[[ code('fb58277abb') ]]]

Let's add `gelato` to the array and `tortas`. Clear everything else out:

[[[ code('d2a2b50ac6') ]]]

And ya know what? Gelato is so good, we should add it again. At the bottom, log `foods`:

[[[ code('948925f4dc') ]]]

When you run the script, there are no surprises: `gelato`, `tortas`, `gelato`.

But now, change the array to be a `new Set()`. To add items to a `Set`, you'll use
`add()` instead of `push()` - but it's the same idea:

[[[ code('b3bf21d906') ]]]

Try the script now.

Woh! Just *two* items! That's the key difference between `Array` and `Set`: `Set`
should be used when you need a *unique* collection of items. It automatically makes
sure that duplicates aren't added.

Oh, and there is also a `WeakSet`, which has the same super powers of `WeakMap` - all
that garbage collection stuff. But, I haven't seen any decent use-case for it.
Just use `Set`... or `Array` if values don't need to be unique.
