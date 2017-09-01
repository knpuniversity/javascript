# Passing Server Data to JS

Watch... if I refresh... there's a *slight* delay before the table loads. That's
because... we designed it that way! Open `assets/js/Components/RepLogApp.js`. In
the constructor, we call `this.loadRepLogs()`, which... surprise! Loads the initial
rep logs... by making an AJAX call:

[[[ code('6c8bf1dad7') ]]]

This builds the table.

That's cool! But... I'm going to be unreasonable and make our life complicated. I
*demand* that this table load instantly! To make crazy me happy, let's update our
app so that when the page loads, our JavaScript *already* knows what the initial
rep logs are... without needing that AJAX call.

Well... if we still wrote JavaScript in our template... this would be pretty easy.
We could create a JavaScript variable and use Twig to print out all the rep logs
into that variable. Yep, mixing Twig and JavaScript is kinda handy.

But obviously... we can't start writing Twig code right in the middle of `RepLogApp.js`.
Sigh, nope, we need a *new* way to communicate from our server to JavaScript. And
there is a *great*... and simple solution.

## Refactoring initialRepLogs to an Argument

First, remove `loadRepLogs()`:

[[[ code('9fc8199421') ]]]

Instead, add `initialRepLogs` as a second argument to the `constructor`:

[[[ code('c9cfde51cb') ]]]

Whoever calls me will need to pass this in.

Down below, loop over these: `for (let repLog of initialRepLogs)`, then,
`this._addRow(repLog)`:

[[[ code('a82677144a') ]]]

Ok! Who creates this object? Ah yes, it's our entry file: `assets/js/rep_log.js`:

[[[ code('bcc7b77113') ]]]

Dang it! We can't put Twig code here either. For now, just to see if this is working,
I'll paste two hard-coded logs above this:

[[[ code('b624b40e0e') ]]]

This is the exact format returned by the AJAX endpoint. Pass `logs` as the second
argument:

[[[ code('478826fd2b') ]]]

In theory, this should work. Side note: you should *always* worry when a programmer
says:

> In theory, this should work!

But actually, it does this time! Sometimes we get lucky. The table starts with the
two hard-coded logs. Ok, we are close!

## Rendering initialLogs as a `data-` Attribute

Open up the server code: `src/AppBundle/Controller/RepLogController.php`. This is
the code for the AJAX endpoint that we *were* using before:

[[[ code('8ebcb4ad15') ]]]

Open `LiftController`, `indexAction()`: this is the method that renders the current
page:

[[[ code('a1af0192c2') ]]]

Here's the plan: I want to get all the of the initial rep logs as JSON, pass that
into the template, then render it in a way that our JavaScript can read.

Let's steal the first line of code from the AJAX controller. Paste it in `indexAction()`,
but rename the variable to `$repLogModels`:

[[[ code('5697e6e4a5') ]]]

Then, create another variable called `$repLogsJson` set to
`$this->get('serializer')->serialize($repLogModels, 'json')`:

[[[ code('0994129d6e') ]]]

Cool! Pass that into the template: `repLogsJson` set to `$repLogsJson`:

[[[ code('7bde30b417') ]]]

Get that template open: `app/Resources/views/lift/index.html.twig`. Ok, so how
can we pass the `repLogsJson` variable to JavaScript?

My *favorite* way is by leveraging *data* attributes. If you look inside `rep_log.js`,
we look for a `.js-rep-log-table` element:

[[[ code('33d38a39a3') ]]]

This lives near the top of the template. On it, add a new attribute:
`data-rep-logs="{{ repLogsJson|e('html_attr') }}"`:

[[[ code('c70e1a74cb') ]]]

Brilliant! That prints the rep logs and escapes them so that they can live safely
on an attribute.

Dude! Now our job is *easy*. In `rep_log.js`, delete the old `logs` variable. And
instead, say `$wrapper.data('rep-logs')`:

[[[ code('31460b0a2d') ]]]

That's it! Refresh and... yes! We *instantly* have a real table. My unreasonable
demands have been met!

So, whenever you want to pass data from your server to `JavaScript`,
a great option is to leverage data attributes.
