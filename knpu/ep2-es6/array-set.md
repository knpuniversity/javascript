# Array, Set and ES2016

The `Map` object is perfect for maps, or associative arrays as we call them in the
PHP biz. But what about true, indexed arrays? Well actually, JavaScript has *always*
had a great way to handle these - it's not new! It's the Array object.

Well, the Array object isn't new, but it *does* have a new trick. Let's check out
an example: when the page loads, we call `loadRepLogs()`. This fetches an array of
`repLog` data via AJAX and then calls `_addRow()` on each to add the `<tr>` elements
to the table.

But once we add the table rows... we don't actually store those `repLog` objects
anywhere. Yep, we use them to build the page... then say: Adios!

Now, I *do* want to start storing this data on my object, and you'll see why in a
minute. Up in the `constructor`, create a `repLogs` property set to `new Array()`.
If you've never seen that `Array` object before... there's a reason - stay tuned!
Then, down in `_addRow()`, say `this.repLogs` - which is the `Array` object -
`this.repLogs.push(repLog)`.

Back up in `loadRepLogs`, after the `for` loop, let's see how this looks: `console.log(this.repLogs)`.
Oh, and let's also use one of its helper methods: `this.repLogs.includes(data.items[0])`.
Obviously, this item *should* have been added to the `Array`!

Refresh! Yea! We see the fancy `Array` and the word `true`. Awesome!

But hold on! The `Array` object may not be new, but the `includes` function *is*
new. In fact, it's *really* new - it wasn't added in ES2015, it was added in *ES2016*!
ES2015 came with a *ton* of new features. And now, new ECMAScript releases happen
yearly, but with many fewer new things. The `Array` `includes` function is one of
those few things in ES2016. Cool!

Oh, and by the way, you don't typically say `new Array()`... and PHPStorm is yelling
at us! In the wild, you just use `[]`. That's right, when you create an array in
JavaScript, it's actually this `Array` object.

## Calculating the Total Weight

But... why are we keeping track of the `repLogs`? Because now, we can more easily
calculate the total weight. Before, we passed the `Helper` object the `$wrapper`
element so that it could find all the `tr` elements and read the weight from them.
We can simplify this! Instead, pass it our `Array`: `this.repLogs`.

At the bottom of this file, change the `constructor` for `Helper` to have a `repLogs`
argument. Set that on a `repLogs` property.

Below in `calculateTotalWeight`, instead of using the `$wrapper` to find all the
`tr` elements, just pass `this.repLogs` to the static function. Inside of that, update
the argument to `repLogs`. 

Previously, `_calculateTotalWeight` would loop over the `$elements` and read the
`data-weight` attribute on each. Now, loop over `repLog of repLogs`. Inside,
set `totalWeight += repLog.totalWeightLifted`. It's nice to calculate the total
weight from our source data, rather than reading it from somewhere on the DOM.

Okay! Try that out! The table still loads... and the total still prints!

## Introducing Set

But, ES2015 added *one* more new object that's related to all of this: `Set`. It's
a lot like `Array`: it holds items... but with one important difference.

Open up `play.js` and set `foods` to an array. Let's add `gelato` to the array and
`tortas`. Clear everything else out. And ya know what? Gelato is so good, we should
add it again. At the bottom, log `foods`.

When you run the script, there are no surprises: `gelato`, `tortas`, `gelato`.

But now, change the array to be a `new Set()`. To add items to a `Set`, you'll use
`add` instead of `push` - but it's the same idea. Try the script now.

Woh! Just *two* items! That's the key difference between `Array` and `Set`: `Set`
should be used when you need a *unique* collection of items. It automatically makes
sure that duplicates aren't added.

Oh, and there is also a `WeakSet`, which has the same super powers of `WeakMap` - all
that garbage collection stuff. But, I haven't seen any decent use-case for it.
Just use `Set`... or `Array` if values don't need to be unique.
