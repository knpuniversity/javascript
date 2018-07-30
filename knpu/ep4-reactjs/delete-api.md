# Hitting the DELETE Endpoint

We did *all* the hard work in the beginning: setting up our components and passing
around state & callbacks. So now that it's time to make our React app talk to an
API, dang, life is fun!

Let's hook up the delete link to our API next. On `RepLogController`, we already
have an endpoint for this: a DELETE method to `/reps/{id}`.

Symfony queries for the `RepLog` entity object and we delete it. Oh, and then we
return an *empty* Response. 

In JavaScript, find `rep_log_api.js`: *this* is our home for *all* API requests
related to rep logs. Create a second function: `export function deleteRepLog()`
with an `id` argument. Let's cheat and copy the code from `getRepLogs()`. But,
for the URL, use ticks and say `/reps/${id}`.

[[[ code('2d22b3d6c0') ]]]

## Hardcoding URLs?

If you're a hardcore Symfony user... you might hate this! We're *hardcoding*
our URLs! Ah! In Symfony, we *never* do this. Nope, we always *generate* a URL
by using its route - like with the `path()` function in Twig.

When you're working in React - or inside any JavaScript  - you have two options
when it comes to URLs. Either, (A) hardcode the URLs like I'm doing or (B) somehow
generate them dynamically. To generate them, you could use FOSJsRoutingBundle, which
is a great option, or set them to a JavaScript variable in Twig and pass them as
props. You'll learn how to pass data from Twig to JavaScript later.

But honestly, hardcoding URLs in JavaScript is fine. Your API and your JavaScript
are partners: they work together. And that means, if you change something in your API,
like a URL - or even a field name - you need to realize that something will probably
*also* need to change in JavaScript. As long as you keep this in mind, it's no big
deal. It's even *less* of a big deal because we're organizing all of our
API calls into one spot.

## Calling the Endpoint

Anyways, the *other* change is that we need to make a `DELETE` request. Do that
with another option: `method: 'DELETE'`.

[[[ code('920df2e369') ]]]

Alright! Back to `RepLogApp` to put this in action! When a rep log is deleted,
`handleDeleteRepLog` is called and that removes it from state. Now, we also need to
call our endpoint. Head to the top and *also* import `deleteRepLog`. Down
below, do it: `deleteRepLog(id)`.

[[[ code('7f678e044f') ]]]

That, is, nice! Try it: move over, refresh and... click delete! Check it out!

> Fetch loading finished: DELETE /reps/27

I think it worked! Because this "fetch" call was *successful*, you can see it
under the XHR filter. To make sure it *really* deleted: refresh. Yep! Just these
*3* brave rep logs remain.

## Optimistic UI Updating

I want to point something out: notice that we *start* the AJAX request, but then
*immediately* update the state... even before it finishes. This is called an
"optimistic UI update": it's where you update your state & UI *before* your server
*actually* saves or deletes the data.

I think this is great, but in some situations, you might want to *wait* to update
the state, until the AJAX call finishes. For example, if the AJAX call might fail
due to some failed validation. We'll talk more about that later.

## Centralizing the fetch Call()

But first, it's time to centralize some code! In `rep_log_api.js`, we're starting
to repeat ourselves! We now have `credentials: 'same-origin'` in two places. That
may not *seem* like a big deal. But, if you were sending an API token and *always*
needed to set a header, centralizing this code would be super important.

Let's create a new utility function that *everything* else will use. At the top
of the file, create a function called `fetchJson()` with the two arguments
fetch needs: the URL and options. Inside, return `fetch()`, the URL, and, for the
options, use `Object.assign()` passing it an object with `credentials` set to
`same-origin`, comma, `options`.

[[[ code('59231d08bf') ]]]

`Object.assign()` is JavaScript's equivalent of `array_merge()` when dealing with
objects: it takes any options *we* might pass in and merges them into this object.
So, `credentials` will always be in the final options.

Then, because every endpoint will return JSON, we can `.then()` to transform the
Promise data from the `response` object into JSON.

[[[ code('280c92522e') ]]]

And just like that, we have a nice utility function that will set our credentials
*and* JSON-decode the response. We're awesome! In `getRepLogs()`, simplify:
`fetchJson('/reps')`. To *only* return the `items` key, add `.then(data => data.items)`.
This function now returns the same thing as before.

[[[ code('592945b53e') ]]]

For `deleteRepLog()`, use `fetchJson()` and remove the `credentials` key.

[[[ code('d4ee11b458') ]]]

Ok, try it out! Refresh! Yep! Everything works fine. Time to connect our *form*
with the rep log *create* API endoint.
