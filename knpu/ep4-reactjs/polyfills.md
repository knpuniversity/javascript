# Polyfills

Coming soon...

Because we're using the API, which is an actual built in functionality on browsers. We don't need an external library to make Ajax calls. Yay. Except that we need to sit. Probably need to support older browsers. If you look at, can I use for fetch? 

Yeah. 

You can get a good idea about whether or not this is something that you're actually gonna need to. 

Um, 

whether or not this is going to be something that's going to be a problem. As you can see, I 11 does not support fetch. Um, so it might be something that causes a problem. So what do you do if you need a sport fetch? Well, like anything, if there's a new. 

Well, 

if you use a new syntax in Java script, like the Arrow function, we use Babel behind the scenes to transliterate to rewrite that. Go back to old javascript. So that's taken care of. But when you use a whole new feature, like a fetch battle can't take care of that for you. Instead you need a refill, which is a fancy word of saying that you are actually going to get a down. Use a javascript library that will add this global function if it doesn't exist. So check this out. Go for fetch polyfill and you'll find a library actually from get hub all about this. So if you scroll down, you can see the name of the library is what wg that's fresh. So I'm gonna copy that move back over to my terminal and say yarn, add that library, Dash, Dash, Dev. Now the width it polyfills work is you just need to import the file and that file, we'll figure out whether or not be current browser has the missing feature fetch. And if it doesn't, it will add that global function to the window object. 

So literally all we need to do, it's just important the library. Now, where do we import it from where we could actually import it from our main entry point rep log, react that would make sure that it's right at the very beginning. We guarantee that the fish libraries available and then it's included everywhere. Or we could even do it from rap log Api since that's where we're using the match function. Um, but actually what I do is, since I use a lot, I'm actually going to go into my layout file now. The significance of this is that if you look at my Westpac, I can fit that js, this is what's known as the shared entry and encore and that's basically a fancy way of saying that anything inside of layout dot js is actually going to be included on every single page. So I'm going to actually import the polyfill from layout dot js so that everywhere in my application I can safely rely on the fact that there will be the fetch function available. So inside of layout dot Js, I'm just going to say important what wg Dash Fetch, and to really prove what this is doing, you can go to node modules. 

I'm going to surf search for what wg fetch and if you look inside of there, it's just a single file fetch dot js. And if you look all the way at the bottom, this is a self executing function, but basically it passes this into the self executing function, which in a browser environment is the global window object. Then up here on top, the window object is passed and as a self variable and then it literally checks to see, hey, does the global environment have a fetch function on it? So if you're not familiar with this index, when we call fetch like this, that's actually anytime you call a global function, that global function actually lives on a window object. So here it's checking to see, hey, does the window object have the fetch function? If it does, it just returns. If it doesn't, the whole rest of this code here is basically code to add the fetch function. So in fact you can see self dot fetch equals that's where it actually modifies and ads that global function. So that's how polyfills work. Now while we're here, you'll also notice if you look back, it says you will also need a promise poly fill for older browsers. Actually, we should have looked at that. If you look inside of here, it actually uses the promise object internally, which we know because we're taking advantage of that already. 

Yeah, 

promises. Also another object that may or may not exist in your browsers. So let's poly fill it also just in case. So here they point to another library. This is a very similar, we'll just copy the name of the library, move over and say yarn, add promise, Pie fell, Dash, Dash, Dev 

and moved back over. And in this case if you look, you'll see two different imports here. The difference is that if you want to, you can actually just import the promise object like normal so you can actually get back to the same way we've been important things. You can import the promise object and if you do it this way, it doesn't actually add a global function. It just the function well because this is a polyfill, we're gonna use the first one. This is the one that actually modifies the global scope and actually adds that global function so that anybody can just use the polyfill. And that's it. So just to make sure we didn't break anything, let's go back to our tablet runs encore. We'll rerun yarn, run encore and Dev Dash Server. Perfect. And we now know that we support a older browsers.