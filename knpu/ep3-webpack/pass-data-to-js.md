# Passing Server Data to JS

Watch... if I refresh... there's a *slight* delay before the table loads. That's
by design. Open `assets/js/Components/RepLogApp.js`. In the constructor, we call
`this.loadRepLogs()`, which initially populates the table by making an AJAX call.
And that's fine... but what if I want this to load instantly? I mean, when the page
loads, our JavaScript *already* knows what the initial rep logs are, without needing
the AJAX call.

Well, if we still wrote JavaScript in our template... this would be pretty easy.
We could, for example, create a JavaScript variable and use Twig to print out all
the rep logs into that variable. Yep, mixing Twig and JavaScript is kinda handy.

But obviously... we can't start writing Twig code right in the middle of `RepLogApp.js`.
Nope, we need a new way to communicate from our server to JavaScript. And I'm happy
to say, there's a really easy way to do this!

## Refactoring initialRepLogs to an Argument

First, remove `loadRepLogs()`. Instead, add `initialRepLogs` as a second argument
to the `constructor`. Whoever calls me will need to pass this in.

Down below, loop over these: `for (let repLog of initialRepLogs)`, then,
`this._addRow(repLog)`.

Ok! Now, who constructs this object? Ah yes, it's our entry file: `assets/js/rep_log.js`.

Of course, we can't put Twig code here either. For now, just to see if this is working,
I'll paste two hard-coded logs above this. This is the exact format returned by
the AJAX endpoint. Now, pass `logs` as the second argument.

In theory, this should work. Boy, that's a dangerous thing to say.

But yea, it *does* work! The list starts with those two logs. Now, we're close!

## Rendering initialLogs as a data- Attribute

Go in the server code: `src/AppBundle/Controller/RepLogController.php`. This is the
code for the AJAX endpoint that we *were* using before. Open `LiftController`,
`indexAction()`: this is the method that renders the current page.

Here's the plan: I want to get all the of the initial rep logs as JSON, pass that
into the template, then render it in a way that our JavaScript can read.

Let's steal the first line of code from the AJAX controller. Paste it in `indexAction()`,
but rename the variable to `repLogModels`. Then, create another variable called
`repLogsJson` set to `$this->get('serializer')->serialize($repLogModels, 'json')`.
Cool! Pass that into the template: `repLogsJson` set to `$repLogsJson`.

Next, open up the template: `app/Resources/views/lift/index.html.twig`. Ok, how
can we pass the `repLogsJson` variable to JavaScript?

One *great* way is by leveraging data attributes. If you look inside `rep_log.js`,
we look for a `.js-rep-log-table` element. This lives near the top of the template.
On it, add new attribute: `data-rep-logs="{{ repLogsJson|e('html_attr') }}"`.

Brilliant! That prints the rep logs and escapes them so they can live safely on an
attribute.

Dude! Now our job is *easy*. In `rep_log.js`, delete the old `logs` variable. And
instead, say `$wrapper.data('rep-logs')`.

That is it. Now when we refresh... yes! We instantly have a real table.

I know, it's simple. Whenever you want to pass data from your server to `JavaScript`,
a great option is to leverage data-attributes.
