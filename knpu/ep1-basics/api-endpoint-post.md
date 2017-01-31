# POSTing to the API Endpoint

Before we keep going, I want to go back and look at what it *used* to look like
when we submitted the form. I have *not* refreshed yet, and this AJAX call is an
example of what the POST request looked like using our *old* code.

Click that AJAX call and move to the "Headers" tab. When we sent the AJAX call
before, what did our request look like? At the bottom, you'll see "Form Data".
But more interestingly, if you click "View Source", it shows you the raw request
body that we sent. It's this weird-looking, almost query-string format, with `&`
and `=` between fields.

This is the *traditional* form submit format for the web, a data format called
`application/x-www-form-urlencoded`, if you want to get dorky about it. When you
submit a normal HTML form, the data is sent like this. In PHP, that data is parsed
into the familiar `$_POST` variable. We don't realize that it originally looked like
this, because PHP gives us that nice associative array.

I wanted to show this because we are *not* going to send data in this format. Remember,
our endpoint expects pure JSON. So `$form.serialize()` is not going to work anymore.

Instead, above the AJAX call, create a new `formData` variable set to an associative
array, or an object:

[[[ code('ebcd7c9ec1') ]]]

Next, use `$.each($form.serializeArray())`:

[[[ code('dc5e1eaf20') ]]]

If you Google for that function - jQuery `serializeArray()` - you'll see that it finds
all the fields in a form and returns a big array with keys `name` and `value` for each
field.

This is not exactly what we want: we want an array where the `name` is the array key
and that field's value is its value. No problem, because we can loop over this and
turn it into that format. Add a function with `key` and `fieldData` arguments. Then
inside, simply say, `formData[fieldData.name] = fieldData.value`:

[[[ code('f5f8306321') ]]]

Now that `formData` has the right format, turn it into JSON with `JSON.stringify(formData)`:

[[[ code('8c54eada62') ]]]

Remember, we're doing this because that's what our endpoint expects: it will `json_decode()`
the request body.

Ok, moment of truth. Refresh! Let's lift our laptop 10 times. Submit! Of course,
nothing on the page changes, but we *do* have a successful POST request! Check out
the response: `id`, `item`, `label`, `reps` and `totalWeightLifted`. Cool!

Also check out the "Headers" section again and find the request body at the bottom.
It's now *pure* JSON: you can see the difference between our old request format and
this new one.

Ok! It's time to get to work on our UI: we need to start processing the JSON response
to add errors to our form and dynamically add a new row on success.
