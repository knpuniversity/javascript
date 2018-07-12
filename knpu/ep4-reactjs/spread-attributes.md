# Smart Components & Spread Attributes

`RepLogApp` is a "smart", or "container" component: it holds state & logic... but
no markup. Instead, smart components wrap themselves around a dumb component -
like `RepLogs` - and *that* component renders all the elements.

Thanks to this pattern... a funny thing happens in smart components: you pretty
much *always* want to pass *all* of your state and props into your child so that
it can *actually* use them to render!

But, this can become tedious: each new piece of state needs to be initialized,
destructured into a variable, then passed as a prop... with the same name. Lame!
Let's use a shortcut.

## The Attribute Spread Operator

Delete all of the variables we destructured from state and props. Then, delete
all of the props we're passing to `RepLogs`, except for the callback. Instead,
here's the awesome part, use the spread operator: `{...this.props}` and
`{...this.state}`.

[[[ code('c994da3bf1') ]]]

That's it! Every prop and state is now being passed to the child as a prop. The
only things we need to pass by hand are any callbacks we need.

Move over and refresh. *No* problems. Our smart component is getting simpler
and simpler: it's *all* logic.

## Calculating the Total Weight Lifted

While we're here, it's time to finish one of our TODO's: fill in the total weight
lifted column. This is great! I usually end up forgetting about my TODO's until I
accidentally find them years later.

The value in this column will need to change whenever the repLogs state changes.
But... the total weight should *not* be stored in state! Why? Simple! We can already
calculate it by adding up all of the total weight values for the rep logs. No need
to introduce more state: that would be duplication.

Go to `RepLogs`: there's the TODO! And here's the plan: loop over the `repLogs` and
add up the weights. So, we need just a *little* bit of logic. If this component
were a class, I'd probably add a new method to the class and put that logic there.
But, darn! It's just a function! No problem: just go *above* the function and add...
another function! Call it `calculateTotalWeightLifted()` with a `repLogs` argument:
we will need to pass that in.

To do the calculation, I'll paste in some boooooring code: it loops over the
`repLogs`, adds up the `totalWeightLifted` for each and... returns.

[[[ code('ef1ed92b4b') ]]]

Copy the function name, move down to the TODO, and call it!
`{calculateTotalWeightLifted()}` passing it `repLogs`. The `repLogs` live inside
props, but we already destructured that into a variable.

[[[ code('4d0ded2540') ]]]

Moment of truth: refresh! Boom! We have a total! Let's mess with the state, like
change this to 200. Yes! It updates! The state change on `RepLogApp` causes both
`RepLogApp` and `RepLogList` to re-render. When that happens, our code uses the
*new* weights to calculate the *new* total. It's all very awesome.

## Super-Fancy (Confusing?) ES6 Syntax

This works *fine*. But, I'm going to write a new function that does this *same*
calculation... but with some crazy, fancy syntax. Check this out:

`const calculateTotalWeightFancier =` then `repLogs => repLogs.reduce()`. Pass
*this* another arrow function with two arguments: `total` and `log`. That callback
will *return* `total + log.totalWeightLifted`. Start the `reduce` function with
a 0 value.

[[[ code('b20f440ca6') ]]]

Phew! Before we understand this madness, copy the new function name, move down,
and paste! Find your browser - ah, the page is already reloading... and... it works!

[[[ code('b7424fdc76') ]]]

This fancier function doesn't contain anything new. But wow, even for me, this
is hard to understand. So, why are we doing this? Because, in the React world, you
*will* see syntax like this. And I want you to be at least comfortable reading it.

Let's walk through it.

This creates a variable that is set to a function that accepts one argument: `repLogs`.
Because the function doesn't have curly braces, it means the function *returns*
the result of `repLogs.reduce()`. The `reduce()` function - which you may
not be familiar with - *itself* accepts a callback function with two arguments.
Once again, because that function doesn't have curly braces, it means that it
*returns* `total + log.totalWeightLifted`.

If this makes your head spin, me too! Honestly, to me, this looks much more complex
than the original. But, when you see things like this in blog posts or documentation,
just break it down piece by piece: it's just boring code, dressed up in a different
style. And if you like this syntax, cool! Go nuts.
