# Handling Events (like onClick)!

I want to do something when the user clicks the `tr` element. In React, how can we
attach event listeners? What is the React version of selecting an element in jQuery
and adding an on `click` function?

## Attaching an Event

Oh, you're going to *love*... or maybe hate the answer. I love it, because it's
simple! To add a click handler to this `tr` add... `onClick` and pass this a
function. I'll use an arrow function and, for now, just
`console.log('OMG - an onClick!')`.

Move over, refresh, click, and... find the terminal. Boom!

## Updating with this.setState()

*Cool*. Let's review our goal: to highlight a row when we click on it. So... hmm...
onClick: if we could update the `highlightedRowId` state to the correct id, React
would re-render and take... care of the rest! Easy! Inside the arrow function, update
the state with `this.setState()`. Pass this an object with the state key or keys
that you want to change. For us, `highlightedRowId` set to the id of *this* rep
log: `repLog.id`.

Coolio! But, an important note! In the constructor, we initialized the state by
setting the `this.state` property directly. This is the *only* place, *ever*,
that you will change or set the state property directly. *Everywhere* else, always,
you need to call `this.setState()`. If you don't, puppies will stare at you with
sad eyes.

And, more important, if you modify the state property directly, React won't re-render.
The reason is simple: this is what React uses to *know* that you changed the state
and so, to start the re-rendering.

Bag, let's go try it! Refresh! And... click! Woohoo! We just added our *first* bit
of interactivity. In the React dev tools, if you click on `RepLogApp`, you can watch
the `highlightedRowId` state change as we click the rows. Pretty freaking cool.

## The SyntheticEvent

Just like with jQuery or plain JavaScript, when you add an event callback, your
function is passed an event object. We don't need the event in this case, but it
contains all the same information you're used to having. Actually, this isn't a
native DOM "event" object. React passes you what's called a "SyntheticEvent": an
event object that wraps the normal event, has all the same methods and properties,
but adds a few things to make life easier.

## Moving the Handler to the Class

Putting all this logic inline is fine... but it can become hard to read. So, instead,
I like to make the handler a property on my class. Start by adding a new method:
`handleRowClick` that will accept the `repLogId` that was just clicked and also
the event object itself... just to show that we can we pass this:

Next, steal the state-setting code and paste it here, but with `highlightedRowId`
set to `repLogId`. And... we should probably close the method so Webpack isn't
so mad at me!

Below, call it: `this.handleRowClick()` with `repLog.id` and `event`.

I like it! Let's make sure we didn't bork our cool app: back to the browser! Refresh!
Yea! It *still* works! 

*This* is the power of React! It doesn't care *how* many different things in your
UI need to change when some state changes, it takes care of everything.

And now, it's time to talk about organization. RepLogApp is *big*, and when things
get too big, they get confusing. Let's move some code into a new child component.
