# Create Your Own Promise

Let's complicate things.

Our ajax call works really well, because when we make an ajax call to create the new rep log, our server returns a really nice structure that includes all of the details of the rep log.

That means that this promise, when we call dot then on it, the data is our rep log data, and we can very easily add the row. Awesome.

So let's make it harder.

Pretend that we don't have full control over our end point and instead of returning the rep log data, which is what this line does right here, it creates a response with the rep log JSon, instead, our API end point returns an empty response. So, null here means that the body of the response will be empty. 204 is just a different status code, that doesn't make any difference.

Go over now and refresh and fill out the form successfully.

Whoa!

Okay, we blew up. That's not too surprising. We get an error that says, 'total weight lifted is not defined', and if you look closely it's coming from underscore dot js and it's coming from when we render our template. That makes sense. Our client side template expects that when we pass data to addrow, this is eventually passed in as the variables to our template. Because we're returning an empty response, that means that our template isn't being passed any variables, so no surprise there.

However, check this out. There's a second error. JSon exception, unexpected token, and this is coming from rep log, line 94. It's actually coming from our catch.

Now, as we understand it, our catch is only going to be called when our promise fails. When we have an ajax error. When the server returns a 400 status code. But in this case, the server returned it a 200 status code. 204 status code. So there shouldn't have been a problem. The question is, why did our catch get called?

It turns out that your catch will be called if your promise is rejected, or if your then handler function throws an exception. Since our addrow throws an error, it ultimately triggers the catch code. Again, this works very much like a try-catch block would in php.

Before, we were thinking that this variable here would always going to be the jqXHR object, which is what jquery pass is when our ajax call fails. But now we realize it might not be that. Let's console that log, jqXHR, and when we refresh and fill out our form you can see that in the log, it's actually a reference error.

The catch will catch anything that went wrong, and the value passed to your handler is going to depend on what went wrong. That means that if you want to, you can do things like this. If jqXHR instance of reference error console dot log. Wow. In this case we would actually expect, since this is a reference error that is being thrown, that that would actually trigger a code. Refresh, lift some laptops and there it is.

What java script doesn't have is an ability to do a more intelligent try-catch block, where you catch only some exceptions. We're going to catch all errors here, but then if you want to, you can add code that is a little bit smarter.

In our case, this catch really is only meant to catch jqXHR errors. The jqXHR ... So one way that we can code defensively, if we want to, is we can just check to see if that jqXHR object is what we expect. We can say type of jqXHR dot response text equals, equals, equals undefined. If that's undefined, this is not the error that we intended to handle. So to not handle it and allow it to remain uncaught, you can say throw jqXHR, so we'll just re-throw that error.

Now if you want to, you can actually have another dot catch on the bottom, and then console dot log that. What will happen is, because this catch threw that error, it will actually keep going to the next catch, just like having multiple catches and then a try-catch block.

To refresh now, you can see that we get 2 of our errors. The first time that happens and the second time and the console dot log is showing that reference error.

Now, I'm going to remove the second catch here and my if statement. The reason is, I'm not going to code defensively unless what I'm coding against is something that might likely happen. In this case, this is a developer error. My code just isn't written correctly for this server, so I don't need to code defensively, I just need to see the error and change my code and update it.

It's the same way in php, where sometimes you will catch exceptions, but most of the times you will just let those exceptions happen because ti means you messed up.

Let's ignore this error that we're getting here for a second and go down and look at our ajax call here. This method returns a promise and then we call dot then on it, but our handlers expect that the promise's value will be the rep log data. So, what changes is that this now returns a promise whose data is null, because that's return from the server. We need to somehow fix this method so that it once again returns a promise whose value is the rep log data.

The way we're going to do that, is we're going to read this location header that's being set, which is the URL to the new rep log, and we're going to make a second ajax call to go fetch that data and return that as the value of our promise.

Let's start real simple. We're going to add another then on to this, which is pass data, text status and jqXHR, which because that's that jquery pass is at. Normally, promises are only passed to 1 argument, but in this case jquery actually passes you 3 arguments. Just to fetch the header, we can say counsel dot log, jqXHR dot get response header location.

Go back. Refresh. Try that. We still get the errors, but you can see slash rep slash 76. Great. Let's make an ajax call to that. I'll copy that jqXHR line. We'll once again say dollar sign dot ajax, set the URL to that header and then we'll had a dot then on to that with a function whose argument is data. Because now this should be the rep log data.

I'll say counsel dot log. Now we are really done and let's log that data just to make sure that it looks right. Refresh. Fill the form out. Ignore the errors. Now we can see that now we are really done and our object prints below it.

Here's the problem though. When we return dollar sign dot ajax here, that promise is resolved, meaning finished, the moment that the first ajax call is made. You can see that because the errors from the handlers actually happen first and then the second ajax call is finished.

What we need to do is somehow return a promise that isn't resolved or finished until this ajax call is finished.

What we need to do is actually create our own promise object and take control of exactly when it's resolved and what value is passed back.

If you look at the promise documentation, we are actually going to create our own new promise, which is actually very simple to do. You can say new promise and you pass that one argument, which is a function, with a resolve and a reject argument.

Inside of here you do your asynchronous code, and then as soon as your asynchronous code is done, you call the resolve function and you pass it what every value you want passed to the handlers. If something goes wrong then you call the reject function. The end result is going to be the exact same behavior that we're already seeing with the jquery ajax function. You can kind of present ... pretend that in jquery, this is what jquery is already doing and they're handing us back this promise.

The only tricky part is that, as I mentioned earlier, there is some browser compatibility problems here. This is a newer feature in java script, but unlike php, when new features come out in java script, we have to wait for the browsers to support them.

A lot of browsers do support this, but not all of them. But, no worries. What you do is google for promise java script promise polyfill. Actually, lets look for the cdn.

A polyfill is a library that you install that gives you functionality that's only available in a newer version. In php we also have polyfills. For example, if you were using php5 and you wanted a feature that's only available on php7, sometimes you can install a polyfill into your code that will actually give you that php7 functionality in php5. This polyfill guarantees that the promise object exists in java script. If it's already supporting the browser it just allows that to be used. Otherwise, it adds that functionality to your project.

Copy the promise dot auto dot men dot js, that's the one that automatically does the polyfill for you. Let's go into our base layout, app resources views base dot html twig and we'll add a script tag with src equals, and we'll paste that. Now we should have a promise object. Yay!

In that save rep log, we're actually going to say, return new promise. We're going to pass that function with the resolve and reject arguments. Inside of it, I'm going to move all of our code to the ajax call.

The only thing that we need to change, is we need to say when our asynchronous situation is finally resolved, which is actually down here. This is when we are finally done. This is when we can call resolved and we can pass that data, which will be our rep log data and things are going to work.

Go back now. Refresh. Watch the bottom here. Apply the big fat cat 10 times. Boom. It's added up there. Every thing works perfectly.

This is huge. Because save rep log used to return a jqXHR object, that implemented the promise interface, now that we've changed this to our own promise, our code here doesn't need to change. Our code here continues to call dot then, and dot catch, and those worked exactly as before, even though we just changed what this returned.

It's more complicated but it still returns a promise whose value resolves as the rep log data.

Of course, we also need to handle what happens with validation errors. If you refresh now, we see our 400 error, but it's not handled. That's because we never called reject, so our code is never rejected.

Very simply, down here after that then, we'll call dot catch to catch when this ajax call fails. Then we'll call reject to pass at jqXHR, which is the data that our dot catch expects here. We could also do a dot catch on this ajax call but I don't expect that one to fail. Whereas this one fails normally if you leave the fields blank.

Refresh. Try that out. Perfect.

You can get even cooler that this, because our dot catch handler actually just reads the response text off of the jqXHR and then uses the error data. If we want to, we can simplify the code in our listeners by doing that for them. I'll copy the error data line, put that down here and dot catch and call it error data in reject.

As soon as we do that, the error data is what's passed to our failure handlers and we don't have to worry about parson and JSON in any of those.

Refresh. Hit it. And it still works. Creating your own promises is not that common, but it's super powerful because now you can do multiple asynchronous actions and then return a promise when they all finish.

You can also take advantage by massaging the data of your response. We use multiple ajax call here to finally get the data that we wanted for resolve. In dot catch we did a little extra processing before we pass it to reject so it's beautiful.
