# Tsore.js - Flux-like store micro-library

The library is designed to realized simple Flux-like store
interface.

The code is based on [Riot.js](riotjs.org), [Loot.js](https://gist.github.com/mattmccray/53fe18e5211334c9943d), and [RiotControl.js](https://github.com/jimsparkman/RiotControl) libraries.

<blockquote>
Tsore was a Freighter Type C belonging to the Rebel Alliance during the Galactic Civil War.
[Source](http://starwars.wikia.com/wiki/Tsore)
</blockquote>

## Examples

Plese see the following examples:
* [Example 1 - Traffic Light Example](example1.html)
* [Example 2 - Manually defined dispatcher](example2.html)
* [Example 3 - Timer Store](example3.html)
* [Example 4 - Timer Store with action() function](example4.html)
* [Example 5 - Two Timer Stores with different actions() ](example5.html)
* [Example in Browser](examples/ex1-browser.html)
* [Example in Node.js](examples/ex1-node.js)


## Initializing

In browser:
```html
<script src="tsore.js"></script>
```

With [require.js]():
```js
   define(['tsore.js'],function(flux){

   });
```

In Node.js
```js
   var tsore = require('tsore');
```

## Example

Create new Store in simple way:
```js
    var store = tsore.observable();
    store.name = undefined;
    store.on('login',function(name){
    	this.name = name;
    	tsore.on('name_changed');
    });
    store.on('logout',function(name){
    	this.name = undefined;
    	tsore.on('name_changed');
    });
```

Or you can create new store with tsore.Store class constructor:
```js
    var store  = new tsore.Store({
        // Here we define actions
        login: function(name,password) {
        	this.name = name;
        	this.password = password;
    		return 'change'; 
    	},
    	logout: function() {
    		this.name = undefined;
    		return 'change';
    	},
    },
    // And here - functions and open default values
    {
        name: 'Andrey',
    	getName: function(){
    		return this.name;
    	}
    });
```
You also can create store manually with constructor function:
```js
   tsore.register('TrafficLight', function(){
        var state = 'red';
        on('Trigger', function(){
            state = state == 'red'?'green':'red';
            tsore.trigger('change');
        });
   })


Register new store with Tsore controller:
```js
    tsore.register(store);
    tsore.action('login','Andrey');
    console.log(store.getName);
```


## API

Functions for tsore:
```js
	tsore.register(store) or register('name',store)
	tsore.action('action',parameters)
	tsore.store('name')
	tsore.on('event',function(){})
	tsore.one('event',function(){})
	tsore.off('event',function(){})
	tsore.trigger('event',parameters);
```

Functions for tsore.observable:
```js
    tsore.observable(obj);
```
Alternative way to create new object:
```js
    var obj = tsore.observable({});
    // or
    var obj = tsore.observable();
```
This add following functions:
```js
    obj.on()
    obj.one()
    obj.off()
    obj.trigger()
```
See [Riot.js]() documentation for more detailes.

## Changes from Riot.js

Now you can define your own dispatcher function to process all events.

```js
    this.on('Action1 Action2 Action3'); // Registration of actions
    this.on(function(action){
    	if(action == 'Action1') {
    		// Do Action 1
    	} else if(action == 'Action2') {
    		// Do Action 2
    	} else if(action == 'Action3') {
    		// Do Action 3
    	}
    })
```


# tsore object

```tsore``` is the main object of the library. It plays the role of main dispatcher for the page.

# Flux Pattern

1. User creates and register the store
```js
    tsore.register('userStore',{
        Login:function(auth) {
            this.name = auth.name;
            this.passord = auth.password;
            tsore.trigger('change');
        }
    },{name:'',password:''});

2. View calls for action
```js
    tsore.action('Login',{name:'Andrey',password:'123'});
```

3. Dispatcher calls all registred stores for the action 'login'.

4. Store 'userStore' processes login in the Login action
```js
            this.name = auth.name;
            this.passord = auth.password;
```

5. At the end Store emit 'change' event:
```js
             tsore.trigger('change');
```

6. This event will be catched by the view. It uodate fields and call 'update' event:
```js
    tsore.on('change', function(){
        this.name = tsore.store('userStore').name;
        this.password = ''; // Hide the password
        this.update();
    })
```



# Riot.js and Tsore.js

You can use the both libraries together with Tsore mixin:
```js
	mixin('tsore');
	this.attach('storeName', updateFunction);
```
For example, you can link Riot element and Tsore store:
```
	mixin('tsore');
	this.attach('trafficLight', function(store){
		this.color = store.getState();
	});
```
This function will be called after each time the storage fires ```change``` event.
After the function run, Tsore will call ```this.update()``` after each call.

