# Old-School AJAX HTML

When we use AJAX to submit this form, there are two possible responses: one if
there was a form validation error and one if the submit was successful.

If we have an error response, for now, we need to return the HTML for this form,
but with the validation error and styling messages included in it.

In our project, find the `LiftController` in `src/AppBundle/Controller`. The `indexAction()`
method is responsible for both initially rendering the form on page load, and for
handling the form submit:

[[[ code('4b49aef277') ]]]

If you're not too familiar with Symfony, don't worry. But, at the bottom, add an
if statement: if this is an AJAX request, then - at this point - we know we've
failed form validation:

[[[ code('1c65748ef1') ]]]

Instead of returning the entire HTML page - which you can see it's doing right
now - let's render *just* the form HTML. Do that with `return $this->render('lift/_form.html.twig')`
passing that a `form` variable set to `$form->createView()`:

[[[ code('f32c66f94d') ]]]

Remember, the `_form.html.twig` template is included from index, and holds *just*
the form.

And just like that! When we submit, we *now* get that HTML fragment.

## Adding AJAX Success

Back in `RepLogApp`, add a `success` key to the AJAX call with a `data` argument:
that will be the HTML we want to put on the page:

[[[ code('94f1aed6fd') ]]]

We need to replace *all* of this form code. I'll surround the form with a new element
and give it a `js-new-rep-log-form-wrapper` class:

[[[ code('824cc060af') ]]]

Back in `success`, use `$form.closest()` to find that, then replace its HTML with
`data`:

[[[ code('48c6f2eff8') ]]]

***TIP
We could have also used the `replaceWith()` jQuery function instead of targeting
a parent element.
***

Sweet! Let's enjoy our work! Refresh and submit! Nice! But if I put 5 into the box
and hit enter to submit a second time... it doesn't work!? What the heck? We'll
fix that in a minute.

## Handling Form Success

What about when we *don't* fail validation? In that case, we'll want to dynamically
add a new row to the table. In other words, the AJAX call should once again return
an HTML fragment: this time for a single `<tr>` row: this row right here.

To do that, we need to isolate it into its own template. Copy it, delete it, and
create a new template: `_repRow.html.twig`. Paste the contents here:

[[[ code('b91dc3a49b') ]]]

Back in the main template, include this: `lift/_repRow.html.twig`:

[[[ code('3ef33e6302') ]]]

Now that we've done this, we can render it directly in `LiftController`. We know
that the form was submitted successfully if the code inside the `$form->isValid()`
block is executed. Instead of redirecting to another page, if this is AJAX, then
return `$this->render('lift/_repRow.html.twig')` and pass it the one variable it
needs: `repLog` set to `repLog`:

[[[ code('74fb3b63dc') ]]]

And just by doing that, when we submit successfully, our AJAX endpoint returns the
new `<tr>`. 

## Distinguishing Between Success and Error

But, our JavaScript code is already confused! It thought the new `<tr>` code was
the error response, and replaced the form with it. Lame! Our JavaScript code needs
to be able to distinguish between a successful request and one that failed with
validation errors.

There's a *perfectly* standard way of doing this... and I was being lazy until now!
On error, we should *not* return a 200 status code, and that's what the `render()`
function gives us by default. When you return a 200 status code, it activates jQuery's
`success` handler.

Instead, we should return a 400 status code, or really, anything that starts with
a 4. To do that, add `$html =` and then change `render()` to `renderView()`:

[[[ code('216dee9ae2') ]]]

This new method simply gives us the string HTML for the page. Next, return a `new Response`
manually and pass it the content - `$html` - and status code - `400`:

[[[ code('5ed46b0ba4') ]]]

As soon as we do that, the `success` function will *not* be called on errors. Instead,
the `error` function will be called. For an `error` callback, the first argument
is *not* the data from the response, it's a `jqXHR` object:

[[[ code('5fad86d3ff') ]]]

That's fine, because the response content is stored on `jqXHR.responseText`:

[[[ code('c3cad7b5e7') ]]]

*Now* we can use the `success` function to add the new `tr` to the table. Before
the AJAX call - to avoid any problems with the `this` variable - add
`$tbody = this.$wrapper.find('tbody')`:

[[[ code('c4035631f4') ]]]

And in `success`, add `$tbody.append(data)`:

[[[ code('2efe5ad1dc') ]]]

That should do it!

Try it! Refresh the page! If we submit with errors, we get the errors! If we submit
with something correct, a new row is added to the table. The only problem is that
it doesn't update the *total* dynamically - that still requires a refresh.

But that's easy to fix! Above the AJAX call, add `var self = this`. And then inside
`success`, call `self.updateTotalWeightLifted()`:

[[[ code('c49bdc71c1') ]]]

And now, it's all updating and working perfectly.

Except... if you try to submit the form twice in a row... it refreshes fully. It's
like our JavaScript stops working after one submit. And you know what else? If you
try to delete a row that was just added via JavaScript, *it* doesn't work either!
Ok, let's find out why!
