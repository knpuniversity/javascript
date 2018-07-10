# Server Validation & fetch Failing

Earlier, we talked about the three types of validation. First, HTML5 validation
with things like the `required` attribute. It's dead-simple to setup, but it's
limited. Second, custom client-side validation, which we added because we wanted
to make sure the user entered a *positive* quantity. And third, *of course*, the
*one* type of validation you *must* have: server-side validation.

## Our Server Side Validation

For example, look at the `RepLog` entity. We already have a few important constraints:
the `reps` cannot be blank and needs to be a positive number, and the `item` also
cannot be blank.

Thanks to HTML5 validation & client-side validation, we are *already* preventing
these bad values from *even* being submitted to the server. And, yea, if some
annoying hacker wants to send bad values to the API, sure, *then* our server-side
validation is there to tell them to bugger off.

But, a lot of the time, I either skip client-side validation entirely, or just add
it for a *few* things, but not *everything*. And, in that case, if API request
fails because of failed validation, our React app needs to read those errors from
the server and tell the user.

Check out `RepLogController`. We're using the form system, but that's no important.
Nope, the *really* important thing is that we, somehow, get a `RepLog` object that's
populated with data, and run it through the validation system. The form does this
for us. But if you were manually setting up the object or using the serializer to
deserialize, you could pass the object directly to the validation system to get
back a collection of errors.

In this application, I added a shortcut method called `getErrorsFromForm`, which
lives in `BaseController`. This recursively loops over my errors to create a big
array of errors, where the key is the name of the field. This is what's returned
from our API.

When you use the form system, there is *one* other way to add validation, which
is often forgotten: on the form itself: `RepLogType`. The `ChoiceType` is normally
used to render a `select` element where `choices` is where you define the valid
options. When used in an API, if we submit a valid that is *not* in choices, the
form will fail validation.

## Sending a Bad "Item"

For testing purposes, let's purposely make this easy to do. In `RepLogCreator`,
find the `itemOptions` array: these items match what's configured inside the form.
Add a fake one: `invalid_item` with text `Dark Matter`.

The server will *not* like this value. Let's try it anyways! Move over, select
"Dark Matter", 10 and... ah! Run! Woh!

Ok, two things. First, you can see the request failed: 400 bad request. Great!
Our server-side validation is working and you can see the message in the response.
But, second, React exploded in a crazy way! Something aobut how each child in an
array should have a unique "key" prop from `RepLogList`.

We know that error... but why is it suddenly happening?

## Fetch is Afraid of Failure

There's *one* simple explanation and it's hiding in `rep_log_api.js`. If you used
jQuery's AJAX function, you might remember that if the server returns an error
status code, a failure callback is executed instead of your `.then()`, success
callbacks. That makes sense: the request failed!

But... `fetch()` does *not* do this. *Even* if the server sends back a 400 or 500
error... fetch thinks:

> We did it! We made a request! Yaaay! Let's execute the `.then()` success callbacks!

Thanks to that, our app parsed the JSON, thought it contained a rep log, tried to
add it to state, and things went bananas.

## Making fetch Fail

This behavior isn't great. So, let's fix it: I'll paste in a new function called
`checkStatus()`. If we call this function and the status code is not 200 or 300,
it creates an `Error` object, puts the response on it, and *throws* it. By the way,
you could change this logic to *also* throw an error for 300-level errors, that's
actually how jQuery works.

To use this, back up at `fetchJson()`, add this handler: `.then(checkStatus)`.

Let's try it! Refresh, select our bad item, a number and... yes! This is a much
more obvious message:
 
> Uncaught (in promise) Error: Bad Request at `checkStatus`

Now that `fetch` is behaving better, let's *use* this error response to add the
error to our app.