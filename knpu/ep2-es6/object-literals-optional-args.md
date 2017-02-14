# Object Literals & Optional Args

When it comes to functions and arrays, ECMAScript 2015 has a couple of things you
are going to love! Well, some of this stuff might look weird at first... but then
you'll love them!

## Object Keys... without the Key

Start in `_saveRepLog`. Right now, we're passing `$.ajax` some options: `url`, `method`
and `data`. Above that line, let's create a new `url` variable set to the URL. Then,
use that variable below.

Obviously, this will work *exactly* like before: nothing interesting yet. Well, in
ECMAScript 2015, if your key and your value are the same, you can just leave off
the key.

Yep, this means the same thing as before. So if you suddenly see an associative array
or object where one of its keys is missing... well, it *is* the key... and the value.

## Short Method Syntax

Next, you can do something similar with methods inside an object. The `loadRepLogs()`
method is just a `loadRepLogs` key assigned to a function. Simple, but too much work!
In ES2015, we can shorten this to `loadRepLogs()`.

Oh man, that's so much cooler! let's change it everywhere! Search for the word `function`,
because almost everything is about to change. Ultimately, the *only* function keywords
left are the self-executing function - which could be an arrow function - and the
two constructors. Nice!

## Optional Args

Ready for one more cool thing? This one is easy. Suppose we have a new method, not
`calculateTotalWeight`, but `getTotalWeightString`. Use the new shorthand syntax
and return `this.calculateTotalWeight()` and then add "pounds" to it.

Perfect! Then above, in `updateTotalWeightLifted`, instead of calling `calculateTotalWeight`
and passing that to HTML,pass `getTotalWeightString`.

Ok, nothing too crazy so far: when we refresh, at the bottom, yep, "pounds".

But now suppose that we want to have set a *max* weight on that. What I mean is,
if we are over a certain weight - maybe 500 - instead of printing the actual total,
we want to print "500+"

First, add a new argument called `maxWeight`. Then say `let weight = this.calculateTotalWeight()`.
And if `weight > maxWeight`, add `weight = maxWeight + '+'`. At the bottom, return
`weight` and "pounds". Head up top to try this: when we call `getTotalWeightString`,
pass this 500.

Refresh! Ok course, it still works perfect.

But what if I wanted to make this argument optional with a default value of 500?
Previously in JavaScript, you couldn't do this. Well, you could, but it was ugly.
Now, thanks to ES 2015, we can say `maxWeight = 500` - the same way we do in PHP.
Thanks to this, we can remove the argument and everything is still happy!

So, yes, finally, JavaScript has optional function arguments! Ok, we're ready for
perhaps the *biggest* change in ES2015: JavaScript *classes*,
