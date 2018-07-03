# API Setup & AJAX with fetch()

Ok people: it's time to make our React app *legit*, by loading and saving data
to the server via AJAX. Our Symfony app already has a functional set of API endpoints
to load, delete and save rep logs. We're not going to spend a lot of time talking
about the API side of things: we'll save that for a future tutorial. That's when
we'll also talk about other great tools - like ApiPlatform - that you *won't* see
used here.

Anyways, I want to at least take you through the basics of my simple, but very
functional, setup.

## The API Setup

Open `src/Controller/RepLogController.php`. As you an see, we already have API
endpoints for returning all of the rep logs for a user, a single rep log, deleting
a rep log and adding a new rep log. Go back to the browser to check this out:
`/reps`. Boom! A JSON list of the rep logs.

This endpoint is powered by `getRepLogsAction()`. The `findAllUsersRepLogModels()`
method lives in the parent class - `BaseController`, which lives in this same
directory. Hold Command or Ctrl and click to jump to it.

The *really* important part is this: I have *two* rep log classes. First, the
`RepLog` entity stores all the data in the database. Second, in the `Api` directory,
I have *another* class called `RepLogApiModel`. *This* is the class that's transformed
into JSON and used for the API: you can see that it has the same fields that you
see over here in JSON.

The `findAllUsersRepLogModels` first queries for the `RepLog` entity objects. Then,
it loops over each and *transforms* it into a `RepLogApiModel` object by calling
another method, which lives right above this. The code is *super* boring and not
fancy at all: it simply takes the `RepLog` entity object and, piece by piece,
converts it into the `RepLogApiModel`.

Finally, back in `getRepLogsAction()`, we return `$this->createApiResponse()` and
pass it that array of `RepLogApiModel` objects. This method also lives inside
`BaseController` and it's dead-simple: it uses Symfony's serializer to turn the
objects to JSON, then puts them into a `Response`.

That's it! The most interesting part is that I'm using *two* classes: the entity
and a separate class for the serializer. Having 2 classes means that you need to
do some extra work. However... it makes it *really* easy to make your API look
*exactly* how you like! But, in a lot of cases, serializing your entity object
directly will probably work great.

## Using fetch()

So here's our first goal: make an API request to `/reps` and use that to populate
our initial `repLogs` state so that they render in the table.

In the `assets/js` directory, create a new folder called `api` and then a new file
called `rep_log_api.js`. This new file will contain all of the logic we need for
making API requests related to the rep log API endpoints. As our app grows, we
might create *other* files to talk to *other* resources, like "users" or "products".

You probably also noticed that the filename is lowercase. That's because, instead
of exporting a class, this module will export some functions... so that's just a
naming convention. Inside, export function `getRepLogs()`.

The question now is... how do we make AJAX calls? There are several great libraries
that can help with this. But... actually... we don't need them! All modern browsers
have a built-in function that makes AJAX calls *easy*. It's called `fetch()`.

Try this: return `fetch('/reps')`. `fetch()` returns a `Promise` object, which
is a *super* important but kinda-confusing object we talked a lot about in previous
tutorials. To *decode* the JSON from our API into a JavaScript object, we can
add a success handler: `.then()`, passing it an arrow function with a `response`
argument. Inside, return `response.json()`.

With this code, our `getRepLogs()` function will *still* return a `Promise`. But
the "data" for that should now be the decoded JSON. Don't worry, we'll show this
in action.

By the way, I mentioned that `fetch` is available in all modern browsers. So yes,
we *do* need to worry about what happens in older browsers. We'll handle that later.

Go back to `RepLogApp`. Ok, as *soon* as the page loads, we want to make an AJAX
call to `/reps` and use that to populate the state. The constructor is a good place
for that code. Oh, but first, import it: `import { getRepLogs }`
from `../api/rep_log_api`. For the first time, we're not exporting a `default`
value: we're exporting a *named* function. And we'll export more named functions
later, for inserting and deleting rep logs.

Oh, and, did you see how PhpStorm auto-completed that for me? That wasn't video
magic: PhpStorm was awesome enough to guess that correct import path.

Ok, down below, add `getRepLogs()` and chain `.then()`. Because we decoded the
JSON in the other file, this should receive that decoded `data`. Just log it
for now.

Ok... let's try it! Move over and, refresh! Oof! An error:

> Unexpected token in JSON at position zero

Hmm. It *seems* like our AJAX call might be working... but it's having a problem
*decoding* the JSON. It turns out, the problem is authentication. Let's learn how
to debug this and how to authenticate our React API requests next.