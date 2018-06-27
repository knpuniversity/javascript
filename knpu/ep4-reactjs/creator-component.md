# New Component to Hold our Form

Inside `RepLogs`, the form logic is starting to get pretty big: we have a handler
function and most of the markup comes from the form! And this is only going to
get *more* complex as we finish the form functionality *and* add future things like
validation.

So, to reduce complexity, I think it's time to take this form and put it into its
own *new* component. Remember: our app starts with `RepLogApp` on top: it's our
smart, stateful component. Then, it renders a dumb, presentation component that
holds the markup. That setup is important, and in a small app, it may be all you
need. But, if `RepLogs` gets too big or complex, you can *choose* to break things
down even more.

## Creating RepLogCreator

Inside the `RepLog` directory, create a new file called, how about, `RepLogCreator.js`.
This will hold our form logic. This will be another dumb, presentation component.
And so, it can just be a function, like `RepLogList`. Copy its import statements,
paste, and `export default function RepLogCreator` with the normal `props` arg.
Get things working by returning a hardcoded div:

> I'm going to be a form when I grow up!

Love it! Back in `RepLogs`, on top, `import RepLogCreator` from `./RepLogCreator`.
Then, for now, down in render, above the form, render this!

Ok, go check it out - give the page a good refresh! So far, so good.

Next, copy *all* of the form markup, delete it, go to `RepLogCreator` and... paste!
That *looks* cool... but, because nothing ever works on the first try, when we
refresh, we're rewarded with a nice big error!

> `handleFormSubmit` is not defined

Coming from `RepLogCreator` line 6: it's our `onSubmit`! I totally forgot that:
go grab it from `RepLogs` - check out how *small* this component is looking - 
then paste it inside `RepLogCreator`.

The *last* missing piece is the `onNewItemSubmit()` callback: this is passed from
`RepLogApp` to `RepLogs`. And now, we need to pass it once again to `RepLogCreator`.
Because we need a new prop, go to the bottom to define it in `propTypes`:
`RepLogCreator.propTypes = ` an object and... go steal this code from `RepLogs`.

Excellent! Now that we are *requiring* this prop, head back up to `render()` and
destructure it to a variable: `const { onNewItemSubmit } = props`.

Cool! *Finally*, in `RepLogs`, cool! PhpStorm is already telling us that we're
missing a required prop: pass this `onNewItemSubmit={onNewItemSubmit}`.

And, we're done! Probably... Let's go find out: refresh. The form renders... we
can select something and... it *does* print. Awesome!

## Introducing: Refs

It's time to start *bending* some of the rules we've been talking about. `RepLogCreator`
is a "dumb" component. It's like a template: its main purpose is to render markup,
*not* to contain state or a lot of logic. Because "dumb", presentation components
only really render things, we usually create them as *functions* instead of a class.

Well... that's a good rule, but it's not always true. Right now, our handler function
uses the *name* attribute of the input element so that it can get a reference to
the underlying DOM element. It uses *that* to read the value. It turns out that
React has its *own* system for making it easy to reference the corresponding DOM
element for *any* of our React elements. It's called "refs".

## Refactoring our Dumb Component to a Class

There are a few ways to use this "refs" system. But, the recommended way requires
your component to be a *class*. Yep, we *usually* write our dumb components as
functions. But... there *are* a few legitimate situations where a dumb component
needs a class. And refs are one of those.

No big deal: let's change this to a class! First, we need to also import `Component`
from React. Then, `export default class RepLogCreator extends Component`. And, of
course, we *now* need to put this all inside of a `render()` function. Let's indent
everything one level, and close the function.

Yep! Webpack is happy again! Now that we have a proper class, we don't need to put
`handleFormSubmit()` *inside* or `render()` anymore. Nope, we can access the props
from anywhere as `this.props`.

So, copy that function & the `const`, paste it in the class, turn it into a property,
and move the `const` *into* the function. Oh, and try not to mess up the syntax
like I just did.

Better! Back in `render()`, *now* we'll call `this.handleFormSubmit`.

Let's go see if it works! Head back to the browser and try it! It loads... and
when you submit... error! Woh! And then the page reloaded! Oh no!

There are actually *two* problems! First, my bad! We need to make sure that
`event.preventDefault()` is always the *first* line in a handle function. You'll
see why when we refresh and try the form again.

Ah yes: here is the *real* error:

> Cannot read property props of undefined

coming from line 7. We know this problem: we forgot to *bind* our handler function
to `this`... so `this` is *not* our `RepLogCreator` instance. Before, this error
killed our code even *before* we called `event.preventDefault()`.

We know the fix: *whenever* you have a handler function that's a property on your
class, we need to create a constructor, call `super(props)`, then bind that function
with `this.handleFormSubmit = this.handleFormSubmit.bind(this)`.

That should do it! Move back, refresh, fill in the form and... yes! Our app logs
correctly again. It's time to use `refs` to finish our form logic so we can update
the `repLogs` state.
