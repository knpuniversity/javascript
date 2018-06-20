# Prop Validation: PropTypes

Look at `RepLogList`: it uses 2 props: `highlightedRowId` and `onRowClick`. But,
what *guarantees* that `RepLogList` is *actually* passed these props? What prevents
us from *forgetting* to pass those two *exact* props from `RepLogs`?

The answer is... absolutely nothing! In PHP, when you instantiate an object, if
that object has a constructor with required arguments, we are forced to pass those
arguments. But, with React components, there is nothing like that. There is simply
no guarantee that we are passed *any* of these props. There's also no way for a
component to easily document, or advertise what props it requires.

This is an especially big problem  `onRowClick`, because, if we don't pass this
prop, our whole app will break when someone clicks on a row.

## Introducing PropTypes

To fix this, React leverages something called "prop types", which uses an external
library. Find your terminal and install it:

```terminal
yarn add prop-types --dev
```

And... ding! With prop types, we can tell React *exactly* which props a component
needs, and even what they should look like. At the bottom of the component, add
`RepLogList.propTypes =` and pass it an object. This is where you describe all the
different props this component might have. But first, back on top, import
`PropTypes` from `prop-types`. And... back down below, add `highlightedRowId` set
to `PropTypes.any`. Then, `onRowClick` set to `PropTypes.func`.

For `highlightedRowId`, we could have used `PropTypes.number`, because, it *is*
a number right now. But later, we're going to refactor our ids to be uuid's, which
are a string.

## PropTypes Give us Warnings

Let's see this in action! Go back to `RepLogs` and, instead of passing in a function,
be devious: pass a string!

Check it out: move back to your browser! An error! Oh, and, notice: the page actually
refreshed automatically before we got here. That's thanks to the `dev-server` we're
running: when we save a file, our browser automatically refreshes, which, is kinda
nice.

*Anyways*, we see:

> Invalid prop `onRowClick` of type string supplied to `RepLogList`, expected function.

*This* is what PropTypes give you: clear & early warnings when we mess up. I
mess up a lot!

## Required PropTypes

Oh, and like I mentioned earlier, the `highlightedRowId` prop in `RepLogList` is
technically an *optional* prop: if we forget to pass it... no problem! No rows
are highlighted.

But the `onRowClick` prop... that's a different story: if we forget this, boom!
Our code will explode in grand fashion when the user clicks a row.

By default, all the propTypes are optional. To make one required, just add
`isSuperDuperImportant`. I'm kidding, it's `isRequired`. But, I feel like my name
would have been much more awesome.

Back in `RepLogs`, let's mess with stuff! "Forget": to pass that prop entirely.
Move to your browser and... yep!

> The prop onRowClick is marked as required... but its value is undefined.

## PhpStorm ❤️'s PropTypes!

I love it! Enough fun: let's re-add the prop. But check it out! We're getting
auto-complete!! Yeaaa! PhpStorm *reads* the `propTypes` and uses them to help us
out. Booya!

*And*, in `RepLogList`, before, we had big red warnings when we referenced our
props. That came from ESLint: it was telling us that we forgot to add the prop
types. Now, everyone is happy. 

## Adding propTypes Everywhere Else

Because propTypes are *amazing*, let's add them everywhere else, like in `RepLogApp`.
Here, we're relying on a `withHeart` prop. And, *there* is the warning I was just
talking about:

> Missing props validation

You guys know the drill! First, import `PropTypes` from `prop-types`. Then, at
the bottom, `RepLogApp.propTypes =` an object with `withHeart` set to `PropTypes.bool`.
The prop isn't *really* required, so we'll leave it optional.

The *last* place we need propTypes is in `RepLogs`: we depend on 3. Go copy the
import statement from `RepLogApp`, and paste it here. At the bottom, add the
`RepLogs.propTypes = ` part.

The 3 props are: `withHeart`, `highlightedId` and `rowClick`. Copy `withHeart`
from `RepLogApp` and paste it here. Then, copy the other two from `RepLogList`
and put those here too.

Hmm, this shows off a common pattern in React. Frequently, you will pass props
into one component, just so that it can pass them into another component. For
example, in `RepLogApp`, we 3 props. But, two of them aren't really used in
`RepLogs`: they're just passed down to a child.

This "prop passing" can he kind of annoying. But, it's not necessarily a sign of
a bad design. It's just part of using React, There *are* ways to organize our code
to help this, but many are more advanced. The point is: this is ok.

Next, let's make a small production optimization with prop types.
