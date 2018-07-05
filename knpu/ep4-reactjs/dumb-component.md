# Smart vs Dumb Components

So far, only `RepLogApp` has state. But, any component is allowed to have state,
as long as each specific *piece* of state like `highlightedRowId` lives in just
one place and isn't duplicated. But, yea, in general, any component can have state.

However, I'm going to create a rule, for now. And later, we'll talk about when
we can *bend* this rule. For now, I want you to keep *all* of your state on the
one, top level component. This means that all of your *other* components, which,
right now is just one, will be *stateless*.

Hmm, if you think about this, it's a bit like how controllers and templates work
in PHP. `RepLogApp` is like a controller: it's the place that controls all the data
and logic. It updates state, and will eventually load and save things via AJAX calls.

Then, `RepLogList` is like a template. It does... nothing. It's dumb! It just
receives data and prints that data. This separation is intentional. It means that
we have *two* types of components: smart, *stateful* components, sometimes called
"container components". And dumb, *stateless* components, sometimes called presentation
components.

## Stateless, Functional Components

Most dumb, stateless components also have something else in common: they usually
only have one method: `render()`. So, *purely* for convenience, or I guess, laziness,
you'll often see stateless components written, not as a *class*, but as a function.

Update this to: `export default function RepLogList`, but now without
`extends Component`. When a component is a function, React passes you one arg:
`props`. Now, we can remove one function level and... I'll unindent everything.

[[[ code('75e7cf389f') ]]]

Yep, the component is now *just* the render function... because that's all we needed!
Refresh to try it! Oh, big error:

> cannot read property props of undefined

Of course! Once a component is a function, there is no `this` anymore! That's fine,
just change the code to use `props`. Hmm, destructuring everything in one place
made that easy...

[[[ code('e98dd6e9c7') ]]]

Try it again! Move over and... reload! Yeehaw! Success!

We just saw *another* important pattern: we will have one smart component on top,
and then, because all its children are stateless and dumb, we will write those
components as functions. We *are* going to bend this rule later: you *can* have
more than one smart component and sometimes a "dumb" component *can* have state.
But, until then, internalize this rule: one smart component on top, and then all
dumb, *functional*, components inside of it that just receive data.

## Smart Components should not have HTML

Ok, so, a smart component is like a controller in Symfony. Except... check out
`RepLogApp`. It's a mixture of logic and... gasp! Markup! We would *never* put HTML
code into our Symfony controllers: controllers should be *pure* logic.

And... surprise! We're going to follow that *same* rule with React components.
New rule: a smart component should hold state & logic, but *no*, or, very little
markup. To make this possible, a smart component should always *wrap* a dumb component.

## A Smart Component Wraps a Dumb Component

Yep, we're going to split `RepLogApp` into two components: one with all the logic
and another will all the markup. Create a new file called `RepLogs.js`: this will
be our stateless, dumb component. So, this will look a lot like `RepLogList`: import
`React` from `react`. And then, `export default function RepLogs`.

[[[ code('8df3fdcf60') ]]]

Next, go copy *all* of the code from RepLogApp's `render()` function and, paste
it here.

[[[ code('b5f349c854') ]]]

This new component has basically no logic, except for a tiny bit on top that's
related to the markup itself.

Back in `RepLogApp`, delete all of that code! Instead, on top, import
`RepLogs` from `./RepLogs`. And then, in render, all we need is `<RepLogs />`.

[[[ code('2a38cf11d2') ]]]

That is it! Oh, it's great: look how pure & clean the top level component is!
Our business logic is *much* easier to read. And all the markup responsibilities
now belong to `RepLogs`.

By the way, *this* is why smart components are often called "container" components:
they are a container around a dumb, *presentational* component. People often even
use that to name their components, like `RepLogsContainer` instead of `RepLogApp`.

## Passing Props to the Dumb Component

*Anyways*, I'm sitting here celebrating our genius, but this won't actually work
yet: `RepLogs` needs a few pieces of data: `withHeart` and `highlightedRowId`.
Both of these are available in `RepLogApp`. Oh, and we also need to pass a prop
for the `handleRowClick` callback: *that* method *also* lives in `RepLogApp`.

But, before we fix that, add the missing import on top: `import RepLogList`
from `./RepLogList`.

[[[ code('97a7b7a478') ]]]

Then, while we're here, let's destructure the props we're about to receive:
`const { withHeart, highlightedRowId, onRowClick } = props`.

[[[ code('9db47da88b') ]]]

Use the new `onRowClick` variable down below: pass *this* into `RepLogList`.

[[[ code('69d7ad0eea') ]]]

Finally, head back to `RepLogApp` so that we can pass these props. I'll break things
onto multiple lines, then add: `withHeart={withHeart}`,
`highlightedRowId={highlightedRowId}` and `onRowClick={this.handleRowClick}`...
being sure not to actually *call* that function, even though PhpStorm is trying
to trick us!

[[[ code('cd981f5ffc') ]]]

Oh, and I made a big ugly mistake! In `RepLogs`, import from `RepLogList`: I was
trying to import myself! Strange and creepy things happen if you try that...

Ok, let's do this! Refresh! Yes! It still looks nice.

So here is our current system: one smart component on top, which acts like a
controller in Symfony. Then, it renders a dumb, presentation component, just like
how a controller renders a template. After that, you may *choose* to also render
*other* dumb components, just to help keep things organized. Heck, we do that same
thing in Symfony: a template can *include* another template.

This "pattern" is not an absolute rule, and, we'll talk more about how and when
you'll bend it. But, generally speaking, by following this pattern upfront - even
if you don't completely understand *why* it's important - it will save you big
time later.
