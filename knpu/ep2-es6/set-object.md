# The Set Object

The `Map` object is perfect for maps, or associative arrays as we call them in the
PHP biz. ES2015 gives us another object called `Set`. This new fancy object replaces
using true, indexed arrays. 

For example, when the page loads, we call `loadRepLogs()`. This fetches an array of
`repLog` data via AJAX and then calls `_addRow()` on each to add the `<tr>` elements
to the table.

But once we add the table rows... we don't actually store those `repLog` objects
anywhere. Yep, we use them to build the page... then say: Adios!

Now, I *do* want to start storing this data on my object, and you'll see why in a
minute. Up in the `constructor`, create a `repLogs` property set to `new Set()`.
Then, down in `_addRow()`, say `this.repLogs` - which is the `Set` object -
`this.repLogs.add(repLog)`.

Yep - the `Set` object is just like an array, but with some helper methods! Back
up in `loadRepLogs`, after the `for` loop, let's see how this looks: `console.log(this.repLogs)`.
Oh, and let's also use one of its helper methods: `this.repLogs.has(data.items[0])`.
Obviously, this item *should* have been added to the `Set`!

Refresh! Yea! We see the new fancy `Set` and the word `true`. Awesome!

But... why are we keeping track of the `repLogs`? Because now, we can more easily
calculate the total weight. Before, we passed the `Helper` object the `$wrapper`
element so that it could find all the `tr` elements and read the weight from them.
We can simplify this! Instead, pass it our `Set`: `this.repLogs`.

At the bottom of this file, change the `constructor` for `Helper` to have a `repLogs`
argument. Set that on a `repLogs` property.

Below in `calculateTotalWeight`, instead of using the `$wrapper` to find all the
`tr` elements, just pass `this.repLogs` to the static function. Inside of that, update
the argument to `repLogSet`. 

Previously, `_calculateTotalWeight` would loop over the `$elements` and read the
`data-weight` attribute on each. Now, loop over `repLog of repLogSet`. Inside,
set `totalWeight += repLog.totalWeightLifted`. It's nice to calculate the total
weight from our source data, rather than reading it from somewhere on the DOM.

Okay! Try that out! The table still loads... and the total still prints! Say hello
to `Set`: an array with extra stuff. Oh, and there is also a `WeakSet`, which has
the same super powers of `WeakMap`. But, I haven't seen any decent use-case for it.
Just use `Set`!
