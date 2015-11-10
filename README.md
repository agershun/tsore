# Tsore.js - Flux-like store micro-library

The library is designed to realized simple Flux-like store
interface.

The code is based on [Riot.js](riotjs.org), [Loot.js](), and [RiotControl.js]() libraries.

## Example


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
        login: function(name,password) {
        	this.name = name;
        	this.password = password;
    		return 'name_changed'; 
    	},
    	logout: function() {
    		this.name = undefined;
    		return 'name_changed';
    	},
    },{
    	getName: function(){
    		return this.name;
    	}
    });
```

Register new store with Tsore controller:
```js
    tsore.register(store);
    tsore.dispatch('login','Andrey');
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

# Riot.js and Tsore.js

You can use the both libraries together with Tsore mixin:
```js
	mixin('tsore');
	this.store('store', updateFunction);
```
For example, you can link Riot element and Tsore store:
```
	mixin('tsore');
	this.store('trafficLight', function(store){
		this.color = store.getState();
	});
```
This function will be called after each time the sorage fires ```change``` event.
After the function run, Tsore will call ```this.update()``` after each call.

