# Post Proper API Endpoint

Our rep log app is more or less working. It's pretty cool. The only problem is that in the new form, we're still using the old-school way of handling ajax, which means instead of sending and receiving JSon, we're receiving HTML directly from the server.

It would be better to treat a server like a true API that sends back JSon, where we then use that JSon to build any dom elements that we need to. So, let's do that.

First, in rep log controller ... First, in lift controller, index action, we add in a couple spots where if the request for ajax returns some html. Let's remove those now. In fact, we're not even going to use this end point any more. We're going to build a new end point that has a true JSon API end point, so I'll close this file.

Next, go to your page, refresh a fresh page. Refresh the view source. Now, I want you to find the form element and actually copy that entire thing. Then go over, find underscore form to html twig and paste it here.

We're going not use the symphony form components in this case, but not because we can't, but because I want to give a little more transparency as to how our form looks. You're free to use the symphony form component or not use it.

Two adjustments that I do want you to make is; first, get rid of the csrf token. Protecting your api against csrf attacks is a little more complicated and a topic for another time. The real change that I want you to make is, when you use the symphony form component, it makes sort of complicated name attributes for all of your fields. Simplify that to just item and reps, which is the way that you might create this form if you weren't relying on the form component.

By the way, if you did use symphony's form component, you can tell it to generate simple names like that, simply by overriding the get block prefix function and setting that to an empty stream. It's very easy to do with the symphony form component also.

Our goal is to send this to a true api end point and then get back JSon and start handling that.

If you look in your app in src app bundle controller, rep log controller, this is a controller that I created before the tutorial with a bunch of end points that help us do things with the rep logs that we're going to use.

One of them is called new rep log action. It's slash reps, say post end points, and this is a true api end point that allows us to create new rep logs.

Couple of things to notice, you'll notice that it expects us to send the server JSon. Then if you're a symphony user, it does actually process that through the symphony form system like normal. Then, if it's invalid, it's actually going to send us back a JSon collection of the validation errors. This create api response that you see here, this is simply something that uses symphony serializer, but the important thing is that it ultimately returns a JSon response, so we're sending back JSon.

On success, it does the same thing. It actually sends back a certain JSon. Don't worry about the details inside of this controller. If you're interested, open it up, look at it. The point is that we're receiving and sending JSon. We'll see what that JSon looks like inside of our java script in a second.

First, we need to send an ajax end point up to this end point. In rep log app, down in handle new form submit, we somehow need to get that URL. It's no longer going to be the action attribute of the form. Instead, lets go to the form. Let's add a data dash URL, [inaudible 00:05:04] set to path, and then the name of that route, which is rep log new.

Rep log new. Perfect.

Now, in rep log app, we can get to work.

First, I'm going to start by clearing all the code that actually updates our dom, meaning updating the form with the form errors, or adding the new row. We're going to handle all of this stuff later. Instead, I'll put a little to do. And we'll console that log success. Down here to do. Console log error. With the URL we now know that we can just change this to form dot data URL.

Before we update the rest of this, I want to go back and look at what it used to look like when we submitted a form. So, I have not refreshed yet, so this is still using all of our old code.

When I hit submit you see that the page goes crazy because our controller is now returning a full html page. That's fine. What I want to look at, is in our network tab ... hmm ...

I'll go back to my browser, and here I actually have an example form a second ago of the post request that I got using the old code when I submitted this form. When I selected big fat cat and 10 and hit submit, it made this post request right here.

The key thing I want you to see is not the response, but the headers. What does our request look like? When we send that ajax request, at the bottom here you can see form data. This is the format that our data is sent up. If you hit view source, it will show you literally the body of our request, is this weird looking, almost query string format. You can see a a little ampersand here and you can see the equals inside of there.

In traditional form submits, when you click submit on a form, it actually sends the form data in this format. In php, that's turned into the familiar dollar sign, underscore, post variable, where you can grab this data out as an associative array.

I mention this because we are not going to send data in this way. We are going to send data as pure JSon. So form dot serialize isn't going to work anymore because it sends it in that old format.

Instead, above the ajax call, create a new form. Data variable, set to an associative array, or an object. Then, do dollar sign dot each form dot serialize array. If you google for that function real quick, jquery j serialize array, this is a nice little function that you can point at your form and it gives you back a format like this. A big array with keys name and values for each field.

Now that's not exactly what we want. We want a array where the name is the key and the value is this value key. That's fine, because we can loop over it and turn it into that format.  [inaudible 00:10:36] function and field data argument. Then inside simply say, form data [inaudible 00:10:43] back at field data dot name, the name key, equals field data dot value key.

For data down here, our form data is in associative array, so we want to call it JSon dot stringify and pass that form data, and that should be it. We're doing that because our controller is expecting the body or the content of the request to be JSon. It decodes it and then sends it into our form for processing.

Go back and refresh. Let's lift our laptop 10 times. Submit. Notice that nothing changes. It doesn't get added to the page yet of course, but you can see the successful post request on here. Check out the response. ID, item label, reps, total weight lifted. Cool. The response is coming back as JSon, but also check out the headers so we can prove what we just did. Check out inform data down here. It is now pure JSon, so you can see the difference with what we did.

All right. Next. We need to actually start handling our JSon to put errors, or a new row on the page.
