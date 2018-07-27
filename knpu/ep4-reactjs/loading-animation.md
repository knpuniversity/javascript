# Loading Messages

Hmm. Refresh the page and watch closely. See it? When it first loads, the table is
empty *just* for a moment. Then, when our AJAX call finishes, it gets filled in.
That makes perfect sense, but it does make the page feel momentarily "broken"...
and it may not always load this quickly.

No worries! This is why the Internet invented loading messages and animations! How
can we add these in React? I have no idea! Let's find out!

Here's our goal: before our AJAX call finishes, I want to render one row that just
says "Loading". Hmm... this will need to happen inside `RepLogList`: that's where
the `tbody` lives. But, hmm again: this component somehow needs to know whether or
not the AJAX call has finished... and *that* is something that only `RepLogApp` knows.

To keep track of whether or not the AJAX call is finished, we need new state. On
top, add some new state `isLoaded: false`.

[[[ code('7daa1dc10a') ]]]

Then, down below, when `fetch()` finishes, set `isLoaded` to `true`!

[[[ code('3da50dd71b') ]]]

State, done! And thanks to how we're rendering `RepLogs`, this state is automatically
pass as a prop. And *now* we start the prop-passing dance! In `RepLogs`, add the
new prop type at the bottom: `PropTypes.bool.isRequired`. Oh, and you've probably
noticed that I like to make pretty much *everything* required. That's a personal
preference. Because this is *my* app, if I forget to pass a prop, it's probably a
typo and I want to know.

[[[ code('2ccda1092c') ]]]

Next, scroll up, destructure the `isLoaded` variable, find `RepLogList`, and pass
that prop: `isLoaded={isLoaded}`.

[[[ code('9e223cee58') ]]]

Finally, do the same in that component: I'll steal the prop type
and go up to destructure the variable.

[[[ code('fc9f0d66d5') ]]]

Ok, this is interesting: if the app is *not* loaded yet, we don't need to run *any*
of this code down here. So, we can short-circuit the entire process: if `!isLoaded`,
then return a completely new set of JSX, with a `tbody`, `tr` and
`<td colSpan="4" className="text-center">`. Say, "Loading...".

[[[ code('4b01b3266a') ]]]

Oh, and notice that this is `colSpan` with a *capital* "S". This is another, uncommon,
case where the prop is slightly different than the HTML attribute. PhpStorm made
it easy by auto-completing the correct version for React.

And... yea! That's it! Let's go refresh... but watch closely. There it was! And
because React's model is so flexible, if you ever needed to, for some reason,
*reload* the data, you could re-render that loading message simply by updating
one piece of state. Nice.

We're on a roll! So let's make the delete link talk to our API.
