# The POST Create API

We now GET *and* DELETE the rep logs via the API. The last task is to *create*
them when the form submits. Look back at `RepLogController`: we can POST
to `/reps` to create a new rep log. I want to show you *just* a little bit
about how this works.

## About the POST API Code

The endpoint expects the data to be sent as JSON. See: the *first* thing we do is
`json_decode` the request content. Then, we use Symfony's form system: we have a
form called `RepLogType` with two fields: `reps` and `item`. This is bound directly
to the `RepLog` entity class, not the model class.

Using the form system is optional. You could also just use the raw data to manually
populate a new `RepLog` entity object. You could *also* use the serializer to
*deserialize* the data to a `RepLog` object.

These are all great options, and whatever you choose, you'll ultimately have a
`RepLog` entity object populated with data. I attach this to our user, then flush
it to the database.

For the response, we *always* serialize `RepLogApiModel` objects. So, after saving,
we convert the `RepLog` *into* a `RepLogApiModel`, turn that into JSON and return
it.

I also have some data validation above, which we'll handle in React later.

## Fetching to POST /reps

To make the API request in React, start, as we *always* do, in `rep_log_api.js`.
Create a *third* function: `export function createRepLog`. This needs a `repLog`
argument, which will be an object that has all the fields that should be sent to
the API.

[[[ code('eb5a34a850') ]]]

Use the new `fetchJson()` function to `/reps` with a `method` set to `POST`. This
time, we *also* need to set the `body` of the request: use `JSON.stringify(repLog)`.
Set one more option: a `headers` key with `Content-Type` set to `application/json`.
This is optional: my API doesn't actually read or care about this. But, because
we *are* sending JSON, it's a best-practice to say this. And, later, our API
*will* start requiring this.

[[[ code('92b4888dec') ]]]

Ok, API function done! Head back to `RepLogApp` and scroll up: import `createRepLog`.
Then, down in `handleAddRepLog`, use it! `createRepLog(newRep)`. To see what
we get back, add `.then()` with `data`. `console.log()` that.

[[[ code('767694e81f') ]]]

Well... let's see what happens! Move over and refresh. Okay, select "Big Fat Cat",
10 times and... submit! Boo! The POST failed! A 400 error!

## Matching the Client Data to the API

Go check it out. Interesting... we get an error that this form should not contain
extra fields. Something is not right. In Symfony, you can look at the profiler
for *any* AJAX request. Click into this one and go to the "Forms" tab. Ah, the error
is attached to the *top* of the form, not a specific field. Click `ConstraintViolation`
to get more details. Oh... this `value` key holds the secret. Our React app is sending
`id`, `itemLabel` and `totalWeightLifted` to the API. But, look at the form! The only
fields are `reps` and `item`! We shouldn't be sending *any* of these other fields!

Actually, `itemLabel` is *almost* correct. It *should* be called `item`. And instead
of being the *text*, the server wants the `value` from the selected option - something
like `fat_cat`.

Ok, so we have some work to do. Head back to `RepLogApp`. First: remove the stuff
we *don't* need: we don't need `id` and we're not responsible for sending the
`totalWeightLifted`. Then, rename `itemLabel` to `item`. Rename the argument
too, because this *now* needs to be the option value.

[[[ code('1d5954edaf') ]]]

This function is eventually called in `RepLogCreator` as `onAddRepLog`.
Instead of `text`, pass `value`.

[[[ code('7900533256') ]]]

## Updating State *after* the AJAX Call

In `RepLogApp`, `newRep` *now* contains the data our API needs! Woohoo! But...
interesting. It turns out that, at the moment the user submits the form, we don't
have all the data we need to update the state. In fact, we never did! We were just
faking it by using a random value for `totalWeightLifted`.

*This* is a case where we *can't* perform an optimistic UI update: we *can't*
update the state *until* we get more info back from the server. This is no big
deal, it just requires a bit more work.

Comment out the `setState()` call.

[[[ code('74e3f87f96') ]]]

Let's refresh and *at least* see if the API call works. Lift my
big fat cat 55 times and hit enter. Yes! No errors! The console log is coming
from the POST response... it looks perfect! Id 30, *it* returns the `itemLabel`
and also calculates the `totalWeightLifted`. Refresh, yep! There is the new rep log!

Ok, let's update the state. Because our API rocks, *we* know that the `data` is
actually a `repLog`! Use `this.setState()` but pass it a callback with `prevState`.
Once again, the *new* state depends on the *existing* state.

[[[ code('469a78e688') ]]]

To add the new rep log without mutating the state, use `const newRepLogs =` an
array with `...prevState.repLogs, repLog`. Return the new state: `repLogs: newRepLogs`.
Remove all the old code below.

[[[ code('6daa526b8a') ]]]

Let's try it! Make sure the page is refreshed. Lift our normal cat this time,
10 times, and boom! We've got it!

## Using UUID's?

This was the *first* time that our React app did *not* have all the data it needed
to update state immediately. It needed to wait until the AJAX request finished.

Hmm... if you think about it, this will happen *every* time your React app
*creates* something through your API... because, there is *always* one piece of data
your JavaScript app doesn't have before saving: the new item's database id! Yep,
we will *always* need to create a new item in the API first so that the API can send
us back the new id, so that *we* can update the state.

Again, that's no *huge* deal... but it's a bit more work, and it will require you
to add more "loading" screens so that it looks like your app is saving. It's just
*simpler* if you can update the state immediately.

And *that* is why UUID's can be awesome. If you configure your Doctrine entities to
use UUID's instead of auto-increment ids, you *can* generate valid UUID's in JavaScript,
update the state immediately, and send the new UUID on the POST request. The server
would then make sure the UUID has a valid format and use it.

If you're creating a lot of resources, keep this in mind!
