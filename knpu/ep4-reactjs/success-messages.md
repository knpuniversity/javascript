# Success Messages

Coming soon...

So of course now that we're doing things with Ajax and loading messages, success messages, these are just important parts of creating a rich Ui and you can get as fancy as you want or not fancy like everything else. The more fancy you get, the more complexity it adds to your application. But when you add a new rep log, if you watch carefully here, there's a delay between when we actually click this and when it shows up, it was pretty quick locally, but that could be longer in production. And that's because we're not doing optimistic UI updates. We're actually not setting the state until the age x called finishes, which means that the user is stuck for some amount of time with nothing on the screen. So when I want to do is actually during that time, add a little loading row here. And then we're also going to add a little success message afterwards. 

So 

in terms of our application in rep log app, we need to know whether or not a rep log is currently in new rep log is currently being saved. So to do that, we're going to need a new pit of state, we'll call it is saving new rep log and we'll set it to false. Then of course, before we call Craig Rep log will say this, that set state is saving rep 

log to true 

because it's saving new rep blog to true. 

Okay. 

And then inside, once you've actually saved it, I use multiple lines. Set is saving the rep log to false. So I love how simple is to use that state inside of our rep log app. 

Now if 

ultimately we're going to use this down in a rep log list because below our actual ours I'm going to add a new t are temporarily that says that we're saving that future road to the database. It's going to be really cool. So that means we need to pass the prompts down a couple of levels. Now as you guys already know, as soon as we add state to rep log app, it's automatically passed onto rep logs. So that's automatic down rep logs. We'll add any prop would be called is saving new rep log and then up top of, well destructure this out of our props, but we're only getting it so that we can just pass it right on through to our rep log list. 

Okay. 

Then I'm like copy the new prop because of of course we need the same new prop in rep log list. Well these structure yet another prop here is saving new rep log and now we can use that to this down below to add that row. So after the tr right here is where we want to add the new row so he can use the same trick we did earlier we can say is saving new rep log and then and, and, and then I'll do open parentheses so we can hear right our new jsx because remember this case, if it's saving you reblog it's true. Then it will actually return and print whatever we have after that. So at the tr. Then we'll do td and I'll say lifting to the database, but I'm glad to actually a break this into multiple lines for it because we don't need to have call span of four. I'll give it some classes like at this a class 

and then when it loads up, I'm actually going to set the opacity to a little bit lower so it looks cool, so I'm going to add a style attribute for that. Now, one interesting thing about style and react is instead of this being a just a string of different styles, it's actually supposed to be react, wants it to be an array or an object, so you're actually gonna use another set of open parenthesis here and this looks a little bit confusing, the outside parentheses, or just getting us into jsx inside of Jsx. We're setting style to this object and we're going to add inside of here in opacity key said you point five. 

Okay, 

cool. All right, let's try that out. We've over refresh and kind of watch close to here because it is pretty fast. There was awesome. Looks perfect. Okay, so let's keep going and add his success message maybe on top of the table whenever something happens. So once again, in rep log APP, we're going to need new state to track the success message and I'm actually going to create a new generic state called success message because maybe we can use this in other ways inside of our APP. Then down here, instead of create rep log after it's saved, we'll also set one more piece of state here called success message set to rep log saved. Cool. Now this case, I want to print a message right on top of her application, a bar table. So to do that, this will actually, um, happened instead of rep locks. So because we have a new state, we instantly have a new prop, so albeit on a crop types and say prop types, that string that is required. Then we can go up these structure out the new success message and down below, right after our input here, we'll use it yet again, that same little trick where we say success message and an open parentheses. And here we'll just do a div, give it a couple of classes, we'll give the bootstrap alert class alert success and I'll send her my text 

inside. I'll print out my success message, then do my closing div. 

Perfect. Alright, so this is getting kind of cool. Let's move over. Make sure the page is refreshed. Miss Time. Let me delete a couple of rep logs here to make our list a little bit shorter. Yeah, well that's my lip, my Coffee Cup 12 times. And Boom, there is our message on top. Cool. Well except you don't have to get, it's up to you how fancy you want to get, but I kind of want that message to disappear after a few seconds. So no problem or we need to do is just use a normal timeout functionality to change the state a few seconds from now. So back in rep log APP. Actually first I'm going to create a new function inside of here called set success message that takes in the message. And inside of here I'll say this, that set state and I'll set these state that way. I'm doing this just uh, so maybe we can reuse this functionality and a couple other places and because the logic for setting the success message is about to get a little bit more complicated. So now up here, instead of setting this state right in that array, 

right for this, that set state will say this, that set success message and we'll paste it there. 

Now there is one downside to this approach that I want to point out and that's that every time you changed the state, react rerender, so now it's going to rerender once for this state and then it's actually going to rerender again afterwards. That is probably not something you need to worry about, but as your applications grow bigger and bigger and bigger, you want to at least be thinking about when is my react app or a rendering and try to avoid extra re renders if you can. So it's a price to pay for having this nice helper message here. This helper function, so declare that to actually clear the message. We can say set time out past us a call back with this dot set state success message set to empty quotes and we'll set that for three seconds. Perfect. All right, let's try this out one more time. Stress out again. This time, lift my big fat cat five times. There's the success message and gone year awful, except there's still one little edge case here, which is that if we created two rep logs very quickly after each other, 

then 

set success message would be called twice and the second message might actually get removed faster than three seconds. It might be just one second afterwards. It's a minor thing, but we can code this more responsibly. Basically what we want to do is before we call set time out, we want to make sure that we clear any previous time outs. To do this, we need to keep track of what's of eight, what's called the handle on the set timeout, so set time on extra returns, an Integer, which is a reference to the time on itself, which you can use to clear the timeout. So to keep track of that up in my constructor, I'm actually going to create a new property. This has nothing to do with react called success. Message Timeout handled equals zero. Zero is just a, 

uh, 

zero is not a real handle. It's kind of like setting that to know and I won't do anything. Then down in set success message before we call sat, time out, we'll call clear time out on this success message timeout handle to make sure that will be clear. Any existing handles, if there's not one, it'll be zero. And then clear time out doesn't do anything that actually set that will assign, it will say this dot success message. Talent, candle equals set time out. Then finally, just to be fully on top of things. 

Yeah, 

inside of the. After we reset the state will set this, a timeout handled back to zero. Cool. Small detail, but it clears things up a little bit. Now, um, there is still one edge case related to setting timeouts and that's related to react so far right now, right now, right now our rep log app is always on the page. It's always rented on the page. It will always be on the page, but in theory certain react components can actually be added to the page and then removed from the page. 

This is especially important if you have a single page app and you're using react router to actually change pages. If we change to the login page, for example, then our rep log app actually would be removed from the page and when you're component is removed from the page, you want to think about is there anything I need to clean up? And usually the answer is no, but in this case, because your object will still exist in memory, but it won't exist on the page anymore. One of the most common examples of things you need to clean up is actually these a timeout handlers. If our rep log app were removed from the page and then two seconds later, right set time out method was called, which set the state that would actually cause a big air and react. So if our APP is removed from the page, we actually want to clear our time out. Now, the way to do this is actually by adding another special method. I'll scroll up after component did about say components will unmapped. 

Okay. 

This is another one of those fancy functions component did mount is called right after your app. Your component is put on the page component. We'll unmount is right before it's removed. It's your chance to clean stuff up. It's not super common, are important, but something to keep in mind and there we will clear the time out. So if our components removed from the page, we're not going to get a huge error when it tries to set the state after it's removed.