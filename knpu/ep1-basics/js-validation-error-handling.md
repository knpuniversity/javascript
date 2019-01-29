# Handling JSON Validation Errors

Our first goal is to read the JSON validation errors and add them visually to the
form. A moment ago, when I filled out the form with no rep number, the endpoint sent
back an error structure that looked like this: with an `errors` key and a key-value
array of errors below that.

## Parsing the Error JSON

To get this data, we need to parse the JSON manually with
`var errorData = JSON.parse(jqXHR.responseText)`:

[[[ code('4d3699757b') ]]]

That's the raw JSON that's sent back from the server.

To actually map the `errorData` onto our fields, let's create a new function below
called `_mapErrorsToForm` with an `errorData` argument. To start, just log that:

[[[ code('c5f5c5579d') ]]]

Above, to call this, we know we can't use `this` because we're in a callback. So
add the classic `var self = this;`, and *then* call `self._mapErrorsToForm(errorData.errors)`:

[[[ code('603076c383') ]]]

All the important stuff is under the `errors` key, so we'll pass *just* that.

Ok, refresh that! Leave the form empty, and submit! Hey, beautiful error data!

## Mapping Data into HTML

So how can we use this data to make actual HTML changes to the form? There are generally
two different approaches. First, the simple way: parse the data by hand and manually
use jQuery to add the necessary elements and classes. This is quick to do, but doesn't
scale when things get really complex. The second way is to use a client-side template.
We'll do the simple way first, but then use a client-side template for a more complex
problem later.

And actually, there's a third way: which is to use a full front-end framework like
ReactJS. We'll save that for a future tutorial.

## Creating a Selectors Map

In `_mapErrorsToForm`, let's look at the error data and use it to add an error `span`
below that field. Obviously, we need to use jQuery to find our `.js-new-rep-log-form`
form element.

But wait! Way up in our constructor, we're already referencing this selector:

[[[ code('046af80657') ]]]

It's no big deal, but I would like to *not* duplicate that class name in multiple places.
Instead, add an `_selectors` property to our object. Give it a `newRepForm` key that's
set to its selector:

[[[ code('ba56d19609') ]]]

Now, reference that with `this._selectors.newRepForm`:

[[[ code('71944f15ec') ]]]

Below in our function, do the same: `var $form = this.$wrapper.find(this._selectors.newRepForm)`:

[[[ code('88496df877') ]]]

## Mapping the Data Manually

Now what? Simple: loop over every field see if that field's `name` is present in
the `errorData`. And if it is, add an error message span element below the field.
To find all the fields, use `$form.find(':input')` - that's jQuery magic to find
all form elements. Then, `.each()` and pass it a callback function:

[[[ code('be4490ab86') ]]]

Inside, we know that `this` is actually the form element. So we can say
`var fieldName = $(this).attr('name')`:

[[[ code('e0011c61e4') ]]]

I'm also going to find the wrapper that's around the entire form field. What I mean
is, each field is surrounded by a `.form-group` element. Since we're using Bootstrap,
we also need to add a class to this. Find it with `var $wrapper = $(this).closest('.form-group')`:

[[[ code('ee774dac2a') ]]]

Perfect!

Then, if there is *not* any `data[fieldName]`, the field doesn't have an error.
Just `continue`:

[[[ code('05d9f3f2b0') ]]]

If there *is* an error, we need to add some HTML to the page. The easy way to do
that is by creating a new jQuery element. Set `var $error` to `$()` and then the
HTML you want: a span with a `js-field-error` class and a `help-block` class:

[[[ code('c5d4088617') ]]]

I left the span blank because it's cleaner to add the text on the next line:
`$error.html(errorsData[fieldName])`:

[[[ code('d12ffdd796') ]]]

This jQuery object is now done! But it's not on the page yet. Add it with
`$wrapper.append($error)`. Also call `$wrapper.addClass('has-error')`:

[[[ code('f4b4af62c2') ]]]

Yes! Let's try it! Refresh and submit! There it is!

The only problem is that, once I finally fill in the field, the error message stays!
AND, I get a second error message! Man, we gotta get this thing cleaned up!

No problem: at the top, use `$form.find()` to find all the `.js-field-error` elements.
And, remove those. Next, find all the `form-group` elements and remove the `has-error`
class:

[[[ code('aebb270077') ]]]

Refresh now, and re-submit! Errors! Fill in one... beautiful!

And if we fill in *both* fields, the AJAX call is successful, but nothing updates.
Time to tackle that.
