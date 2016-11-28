# Client Side Templating

Now, we need to turn to handling form success, which means adding a dynamic row to this table, but first, it means actually clearing out this form on success, removing errors, and actually setting the form fields back to their original spot.

That means that part of what we do in map errors to form is what you need to do on success. Specifically, we want to actually remove the errors, so let's isolate this code here to its own function down below, called Remove form errors.

Then, we can just call it from map function, but before we call that from success, the other thing we need to do is clear the form, reset the form fields back to their original spot. Let's create another field, a function that does that and removes the form's errors. We'll call it Underscore clear form. And then we'll first call Remove form errors and then we'll clear the form, by first selecting the form and then calling form Left square bracket zero dot reset. That's not so mysterious anymore.

We know that the J query object is actually an array of dom elements, so we're actually getting the first dom element, the first and only dom element and we're calling it reset directly on the dom element itself. Now, we can call this from up here in success, Self dot clear form.

With any luck, we can get some validation errors and when we submit, they go away. Cool. Let's talk about the real task at hand, which is that we need to add a new row to our table whenever we add one. How are we going to do that?

We're going to use client side templating. Let's start off simple. At the bottom of our object, add a new function called Add row. It will take a replog arguments. Now, I just want you to console that log replog. The idea here is that if we have some replog data, like what was lifted, the number of times it was lifted, and total weights, we can inside this function, actually add a t-h, a t-r dynamically. We'll call this from above in our success function, self dot add row and now we're going [jace on string 00:03:43] pass it the data, because our endpoint is already turning a really nice string of the newly added replog.

After we check this out already, you can see our really nice structure. ID item label links, which is a link back to itself reps in total weight lifted. All right, how do we run into the t-r With client side templating.

It's like Twig, but Twig in JavaScript. There are a lot of client side templating libraries. We're going to use a really simple one that comes from the underscore. JavaScript utility. Underscore JS is a nice little utility that has lots of helper functions, sort of like things that are missing in JavaScript.

It happens that they also have a very simple templating engine built into it. So, if you Google underscore cdm, we can find a cdm that hosts underscore, because right now that's the simplest way for us to add stuff to the app. Copy the mimify version, go back and we'll open app resources view, based on htm dot Twig. We'll add that on the bottom.

When you use clients side templates, the first thing you do is actually create a client side template. What I literally mean, is that you need to somewhere get a big string that is our template, so that we can reference it and render it later. If you look at the underscore docs, you'll see that they expect their templates to look a little bit like this.

Now, we don't want to actually put that into JavaScript the way they are, because that would defeat the purpose of having nice templates. They're multiple ways to do this, but the simplest way is actually to add a special script tag with Type equals text slash template and then an ID, something like JS replog row template, so that we can find it later. This is one of the few places where I actually use an ID in my code. Then, what we basically want to do is duplicate our underscore rep row template, which holds each row down there in the underscore dot JS version.

Temporarily, we are totally going to have duplication between our Twig service side template and our client side template, so I'll copy all of that code and I'm done here, I'll paste it. Then, we'll just start updating things to the underscore dot JS template format, which is less than percent equals and then we'll say total weight lifted and then we'll say percent less than.

What I'm doing here is, this is the print syntax, but I'm using the total weight lifted, because eventually we're going to use these keys here as our local variables, so total weight lifted, reps, IML ID,, and links. The next line, we do the same thing to print out item label, which is already the nice English version of our item. Keep going. Turn the next line into just reps. Once again, we'll print out the total wight lifted. Make sure you use the right syntax.

Then, down for the data dash URL, we can't use the path function anymore, because this will be used dynamically for many different replog ID's. We can use the links dot underscore reps key, because my API is actually returning the URL back to this specific object and because the API is built well, that happens to be that the same endpoint we used, the same URL we used to delete the replog slash rep slash [code race 00:09:20] ID is also the same URL we used to get it.

Fun way of saying that we can use [inaudible 00:09:29] percent equals links dot underscore self. Now, we have a nice client side template. In JavaScript, in our add row function, to use this, the first thing we do is to actually find that text, which we can use dots and open parentheses and pound sign and then JS replog row template dot HTML, so you can load templates from other places even via AJAX. Ultimately, we just need to get the template text. The other thing is to create a template object, a template function, called underscore dot template asset template text.

That doesn't render the function, it just prepares ... That doesn't render the template, it just prepares the template to be rendered. Notice I'm not getting autocomplete. My editor doesn't really know what underscore is. Just like last time, your editor might not, [inaudible 00:10:53] might not realize, might not have a local copy of this yet, so you can hit option enter and download library. With any luck, that should make this happier.

To actually render the template, we say var equals HTML equals TPL and use it like a function and you pass it the variables you want, so all the keys in replog are now local variables in templates. Finally, you can say this dot wrapper find tbody dot append dollar sign dot parse HTML html. The dollar sign parse html takes that html and puts it into a J quarry object and then we append that J quarry object onto our page.

This is a new row, so we'll also call this dot update Total Weight Lifted. Cool. Let's give it a shot. Refresh the page. Let's lift up our coffee cup ten times and oh, you get an error: Link is not defined, which we recognize is probably coming from our template. That's just Ryan being a little bit lazy. If you look at our post endpoint, it is links, not link. Let's fix that. Invalid variable. Go back. Refresh and let's lift our coffee cup twenty times. Boom. There it is.

If you watch closely, you'll see that it's even updating our total weight on the bottom. The only problem is that we have massive duplication. It's kind of a bummer to have this client side template and this service side template here. When you get into this situation, it might be better and I'll stop.
