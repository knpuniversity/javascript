# Fixing "this" with bind()

So how can we fix this? If we're going to be fancy and use objects in JavaScript,
I don't want to have to worry about whether or not `this` is *actually* `this` in
each function! That's no way to live! Nope, I want to know *confidently* that
inside of my `whatIsThis` function, `this` is my `RepLogApp` object... not a random
array of pets and their noises.

More importantly, I want that same guarantee down in each callback function: I want
to be absolutely sure that `this` is *this* object, exactly how we'd expect our
methods to work.

And yes! This is possible: we can take back control! Create a new variable:
`var boundWhatIsThis = this.whatIsThis.bind(this)`:

[[[ code('18bf5e2a33') ]]]

Just like `call()`, `bind()` is a method you can call on functions. You pass it what
you want `this` to be - in this case our `RepLogApp` object - and it returns a *new*
function that, when called, will *always* have `this` set to whatever you passed
to `bind()`. Now, when we say `boundWhatIsThis.call()` and *try* to pass it an alternative
`this` object, that will be ignored:

[[[ code('77b665b433') ]]]

Try it out: refresh! Yes! Now `this` is `this` again!

## Binding all of our Listener Functions

Delete that debug code. Now that we have a way to *guarantee* the value of `this`,
all we need to do is repeat the trick on any listener functions. In practice, that
means that whenever you register an event handling function, you should call
`.bind(this)`. Add it to both event listeners:

[[[ code('2c2b9c7616') ]]]

## Replacing this in Event Listeners

But wait! That's going to totally mess up our function: we're *relying* on `this`:
expecting it to be the DOM Element object that was clicked! Dang! But no problem,
because we already learned that `this` is equal to `e.currentTarget`. Fix the problem
by adding `var $link = $(e.currentTarget)`:

[[[ code('cb0b94b874') ]]]

Now just change the `$(this)` to `$link`:

[[[ code('f5ead8d032') ]]]

And life is good!

Try it out! Refresh, click, and winning!

Finally, we can fix something that's been bothering me. Instead of saying `RepLogApp`,
I want to use `this`. We talked earlier about how `RepLogApp` is kind of like a
static object, and just like in PHP, when something is static, you can reference
it by its object name, or really, class name in PHP.

## Always Referencing this, instead of RepLogApp

But that's not going to be true forever: in a few minutes, we're going to learn how
to design objects that you can *instantiate*, meaning we could have many `RepLogApp`
objects. For example, we could have *five* tables on our page and instantiate five
separate `RepLogApp` objects, one for each table. Once we do that, we won't be able
to simply reference our object with `RepLogApp` anymore, because we might have five
of them. But if we always reference our object internally with `this`, it'll be
*future* proof: working now, and also after we make things fancier.

Of course, the problem is that inside of the callback, `this` won't be our `RepLogApp`
object anymore. How could we fix this? There are two options. First, we could `bind`
our success function to `this`. Then, now that `this` is our `RepLogApp` object inside
of `success`, we could also bind our `fadeOut` callback to `this`. *Finally*, that
would let us call `this.updateTotalWeightLifted()`.

But wow, that's a lot of work, and it'll be a bit ugly! Instead, there's a simpler
way. First, realize that whenever you have an anonymous function, you *could* refactor
it into an individual method on your object. If we did that, then I would recommend
binding that function so that `this` is the `RepLogApp` object inside.

But if that feels like overkill and you want to keep using anonymous functions,
then simply go above the callback and add `var self = this`:

[[[ code('6f0869421d') ]]]

The variable `self` is *not* important in any way - I just made that up. So, it doesn't
change inside of callback functions, which means we can say `self.updateTotalWeightLifted()`:

[[[ code('c1bee18006') ]]]

Try that! Ah, it works *great*.

So there are two important takeaways:

1. Use `bind()` to make sure that `this` is always `this` inside any methods in your object.
2. Make sure to reference your object with `this`, instead of your object's name.
   This isn't an absolute rule, but unless you know what you're doing, this will
   give you more flexibility in the long-run.
