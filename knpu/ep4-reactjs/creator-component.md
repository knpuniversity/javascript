# New Component to Hold our Form

Inside `RepLogs`, this form logic is starting to get pretty big: we have a handler
function and most of the markup comes from the form! And this is only going to
get *more* complex when we finish the form stuff *and* add future things like
validation.

So, to reduce complexity, I think it's time to take this form and put it into its
own *new* component. Remember: our app starts with `RepLogApp` on top: it's our
smart, good-looking, fun-loving, stateful component. Then, it renders a dumb,
tries-its-best, presentation component that holds the markup. That setup is important,
and in a small app, it may be all you need! But, if `RepLogs` gets too big or confusing,
you can *choose* to break things down even more.

## Creating RepLogCreator

Inside the `RepLog` directory, create a new file called, how about, `RepLogCreator.js`.
This will be another dumb, presentation component. And so, it can be a function,
like `RepLogList`. Copy its import statements, paste, and
`export default function RepLogCreator` with the normal `props` arg. Get things
working by returning a hardcoded div!

> I'm going to be a form when I grow up!

Love it! Back in `RepLogs`, on top, `import RepLogCreator` from `./RepLogCreator`.
Then, down in render, above the form, use `<RepLogCreator />`.

Ok, let's go check it out! So far, so good.

Next, copy *all* of the form markup, delete it, go to `RepLogCreator` and... paste!
That *looks* cool... but, come on. We know that nothing ever works on the first try.
Try it - yep... we are rewarded with a nice big error!

> `handleFormSubmit` is not defined

coming from `RepLogCreator` line 6: it's our `onSubmit`! I totally forgot about that!
Go grab it from `RepLogs` - and, by the way - check out how *small* this component
is looking - then, inside `RepLogCreator`, paste.

The *last* missing piece is the `onNewItemSubmit()` callback: this is passed from
`RepLogApp` to `RepLogs`. And now, we need to pass it once again to `RepLogCreator`.
Because we need a new prop, define it first at the bottom in `propTypes`:
`RepLogCreator.propTypes = ` an object and... go steal this code from `RepLogs`.

Excellent! Now that we are *requiring* this prop, head back up to `render()` and
destructure it: `const { onNewItemSubmit } = props`.

Cool! *Finally*, in `RepLogs`, nice! PhpStorm is already telling us that we're
missing a required prop: pass this `onNewItemSubmit={onNewItemSubmit}`.

And... we're done! Probably... Let's go find out: refresh. The form renders... we
can select something and... it *does* print. Awesome!

## Introducing: Refs

And *now*.... it's time to start *bending* some of the nice rules that we've been
talking about. `RepLogCreator` is a "dumb" component. It's like a template: its main
job is to render markup, *not* to contain state or a lot of logic. Because "dumb",
presentation components only really render things, we usually create them as *functions*
instead of a class... just because we can and we're lazy!

Well... that's a good rule, but it's not always true. Right now, our handler function
uses the *name* attribute of the input element to get a reference to the underlying
DOM element. Then, it reads its value. It turns out that React has its *own* system
for allowing you to reference the corresponding DOM element for *any* of our React
elements. It's called "refs".

## Refactoring our Dumb Component to a Class

There are a few ways to use this "refs" system. But, the recommended way requires
your component to be a *class*. And, that's ok! There *are* some legitimate situations
where a dumb component needs a class. Refs are one of those.

No big deal: let's change this to a class! First, we need to also import `Component`
from React. Then, `export default class RepLogCreator extends Component`. And, of
course, we *now* need to put all of this inside a `render()` function. Let's indent
everything one level, and close the function.

Yep! Webpack is happy! Now that we have a proper class, we don't need to put
`handleFormSubmit()` *inside* of `render()` anymore. Nope, we can access the props
from anywhere as `this.props`.

So, copy that function & the `const`, paste it in the class, turn it into a property,
and move the `const` *into* the function. Oh, and try not to mess up the syntax
like I just did.

Better! Back in `render()`, *now* we'll call `this.handleFormSubmit`.

Let's go check it out! Head back to the browser refresh! It loads... and when you
submit... error! Woh! And then the page reloaded! Oh no!

There are *two* evil problems working together against us! For the first, my bad!
We need to make sure that `event.preventDefault()` is always the *first* line in
a handle function. You'll see why when we refresh and try the form again.

Ah yes: here is the *real* error:

> Cannot read property props of undefined

coming from line 7. We know this problem: we forgot to *bind* our handler function
to `this`... so `this` is *not* our `RepLogCreator` instance. When the page refreshed,
it was because this error killed our code even *before* we called `event.preventDefault()`.

We know the fix: *whenever* you have a handler function that's a property on your
class, we need to create a constructor, call `super(props)`, then bind that function
with `this.handleFormSubmit = this.handleFormSubmit.bind(this)`.

That should do it! Move back, refresh, fill in the form and... yes! Our app logs
correctly again. It's time to use `refs` to finish our form logic so we can update
the `repLogs` state.
