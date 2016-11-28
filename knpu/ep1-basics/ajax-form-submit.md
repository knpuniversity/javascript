# Ajax Form Submit

Let's keep going and adding more JavaScript functionality to our form. Down here at the bottom when we add new rep logs, this is a very traditional server-side form submit, nothing fancy. I want to update this to happen all client-side with no refreshes. There are generally two ways to do this. There's the old school way, which is where we submit this form via AJAX, and the server returns with HTML. For example, if you forget to actually select and item to lift, the AJAX would return the form HTML with the error in it or maybe on success, it would return a new row that we can insert into the table. That's generally an easier approach because you don't need to be as good with JavaScript, but it's just kind of outdated.

The second approach, the more modern approach, is to actually treat your backend application like an API, which means sending JSON back and forth. The trick with that is that it means you have to do more work on the client side. If the server sends you back JSON, you might need to actually build the new row and put it in the table in JavaScript.

The more modern way is definitely the better way to go, but we're actually going to work through the old school way first, then refactor to the modern way on our way to getting things more and more complicated. Either way, the first thing we need to do is we need to add a listener on submit of our form. Inside of our main template ... the form itself has actually included via another template called _form.html@twig, which is over here in app resources view is lit _form.html@twig.

This is a simponi forum, but it just renders a form tag. Let's add another class of form tag called js-new-rep-log-form. Then we can copy that, and we can go attach a listener inside of a rep log app. Now, the only problem is that the [donnerson] wrapper here is actually this table element, and the form actually lives outside of the table element. When you create little JavaScript applications like a rep log app, you want the wrapper to be an element that goes around everything inside of your application.

What I'm actually going to do is move our js rep log table class from the table itself, and I'm going to put it up here on this dib that surrounds our entire application. Down at the bottom, I don't need to change anything down here. I'm actually going to rename this variable to wrapper because it's not really a table anymore.

Okay. Now, we can very easily add our listener with this.wrapper.find. We're looking for .js-new-rep-log-form.on. We'll follow the exact same pattern as before. This time, we're going to be on submit. We'll say this.handlenewformsubmit ... don't forget your .bindthis.

Down below ... we'll add that new function, give the event argument, to [inaudible 00:04:03] prevent the faults so that the form doesn't actually try to submit. Now, cancel that log just for now. Submit it. Perfect.

To go back and refresh, clean it out, the form doesn't submit, you have to cancel that log. Select is good. Now, actually submitting this is going to be really, really easy. The form is already set up on the server-side, as we know because it works under 'hit submit'. We can literally just send that same exact request up, but the AJAX.

First, let's find the form itself. Put the form as an e.currenttarget. Then I'm going to use [inaudible 00:04:53] AJAX. We can set the URL to form.attraction, but the action attribute is of the form. Method, we'll set to post. Then, for the data that we want to send up, we'll use the j query form .serialize. A really lazy way to get all the fields in the form and put them in the exact format that the server is used to seeing when you submit things. That should be enough to get this to work.

Hit 'submit'. You can see the AJAX [inaudible 00:05:29] code. Of course, it doesn't refresh, and we don't see the new rows added to the page, but if we refresh the page ... you can see all of our entries being added to it.

This was easy, but the real work is going to be to actually show the validation errors down here and actually dynamically add the new row inside of this. Let's do that next, at first by returning HTML.
