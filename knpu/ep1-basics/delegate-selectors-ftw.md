# Delegate Selectors FTW

So dang. Every time we add something new, it adds to the AJAX, but then the link doesn't work. So what's going on here? Well, let's think about it. Inside RepLogApp, in initialize, in the constructor, this is called inside our document.ready. So it means the entire page is loaded. And then we initialize our RepLogApp and our constructor is called.

That means that at that moment it finds all js-delete-rep-log classes on the page and attaches this listener to that dom element. So if we have 10 delete links on the page when the page loads, it actually attaches this listener to those 10 individual dom elements. If we add a new js-delete-rep-log later, there's no listener attached to it. So the problem is really simple. The question is how to fix it.

You may have fixed this in the past by doing something where, when you load something via AJAX, you actually take your new element and attach the listener to it.

But there's a much, much, much better way. This is going to be the simplest thing ever. It's called a delegate selector. The idea is, instead of attaching the listeners to something that might be dynamically added to the page later, you attach the listeners to something, an element, that will always be on the page. In particular, we know our $wrapper here, that will always be on a page. So we're actually going to attach our listener to that. Looks like this. Instead of saying this.$wrapper.find, you say this.$wrapper.on to put the listener on that element. And then, you add an extra second argument, which is the selector you're looking for.

And that's it. That works the exact same way as before. It just says, attach the listener to the $wrapper and the when the $wrapper receives the click, jQuery checks to see if the original element that was clicked has the js-delete-rep-log class. And if so, it calls the handleRepLogDelete action and passes it an event argument where the current target is still the js-delete-rep-log link. So everything works just like before.

Let's keep going with this. We're going to use delegate selectors everywhere. Get rid of the .find. Add the selector as a second argument.

And that's it. Go back and refresh now. Add something new to the page, hit delete, and it works perfectly. We can also fail validation. This was another problem. Then if we submit again, it actually works. That was failing before because we dynamically put the form on the page and so it stopped working. So always use delegate selectors. They just make your life easy. And we could use it easily because we designed an application where we have an outside $wrapper that wraps everything and that's permanently on the page.
