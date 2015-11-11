(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof exports === 'object') {
    	/** alasql main function */
        module.exports = factory();
    } else {
        root.tsore = factory();
    }
}(this, function () {


// Main object definition

var Tsore = function(store){
	if(typeof store == 'string') {
		return this.store(store);
	}

	var storeMap = {}, storeList = [];

//	this.stores = storeMap;

	Tsore.prototype.register = function(name,actions,defaults,controller) {
		if(typeof arguments[0] != 'string') {
			controller = defaults;
			defaults = actions;
			actions = name
			name = ''+Date.now();
		};
//      console.log(typeof actions);
		if(typeof actions == 'object' && actions instanceof tsore.Store) {
			var store = actions;
		} else {
			var store = new tsore.Store(actions,defaults,controller);
		};
		storeMap[name] = store;
		storeList.push(store);
    return store;
	};

	Tsore.prototype.reset = function () {
	    storeList.forEach(function(store){
	      store.off('*')
	    })
	    storeList = []
	    storeMap = {}
	};

	// // Generate event for each store
 //  	['on','one','off','trigger'].forEach(function(name){
	//     tsore[name] = function() {
	//       var args = [].slice.call(arguments);

	//       storeList.forEach(function(store){
	//         store[name].apply(store, args);
	//       });
	//     };
	//  });

	Tsore.prototype.dispatch = Tsore.prototype.action = function() {
      var args = [].slice.call(arguments);
      storeList.forEach(function(store){
//      	console.log(62,store,args[1]);
//        store.on[action].apply(store, args);
//console.log(66,args);
        store.trigger.apply(store, args);
      });
	};	

	Tsore.prototype.store = function(name) {
		return storeMap[name];
	};

	return this;
};

// This code was borrowed from Riot.js

Tsore.prototype.observable = function(el) {

  /**
   * Extend the original object or create a new empty one
   * @type { Object }
   */

  el = el || {}

  /**
   * Private variables and methods
   */

  var callbacks = {},
    onEachEvent = function(e, fn) { e.replace(/\S+/g, fn) },
    defineProperty = function (key, value) {
      Object.defineProperty(el, key, {
        value: value,
        enumerable: false,
        writable: false,
        configurable: false
      })
    }

  /**
   * Listen to the given space separated list of `events` and execute the `callback` each time an event is triggered.
   * @param  { String } events - events ids
   * @param  { Function } fn - callback function
   * @returns { Object } el
   */

  defineProperty('on', function(events, fn) {
    if (typeof events == 'string' && typeof fn == 'undefined') {
      fn = function(){};
     // return el;
    }

    if (typeof events == 'function') {
      fn = events;
      events = '*';
    }
//     if (events == '*') {
//       console.log(114,this,arguments);
// //      callbacks = {}
//     } else {
      onEachEvent(events, function(name, pos) {
        (callbacks[name] = callbacks[name] || []).push(fn)
        fn.typed = pos > 0
      });
//    }
    return el;
  });

  /**
   * Removes the given space separated list of `events` listeners
   * @param   { String } events - events ids
   * @param   { Function } fn - callback function
   * @returns { Object } el
   */

  defineProperty('off', function(events, fn) {
    if (events == '*') callbacks = {}
    else {
      onEachEvent(events, function(name) {
        if (fn) {
          var arr = callbacks[name]
          for (var i = 0, cb; cb = arr && arr[i]; ++i) {
            if (cb == fn) arr.splice(i--, 1)
          }
        } else delete callbacks[name]
      })
    }
    return el
  });

  /**
   * Listen to the given space separated list of `events` and execute the `callback` at most once
   * @param   { String } events - events ids
   * @param   { Function } fn - callback function
   * @returns { Object } el
   */

  defineProperty('one', function(events, fn) {
    function on() {
      el.off(events, on)
      fn.apply(el, arguments)
    }
    return el.on(events, on)
  });

  /**
   * Execute all callback functions that listen to the given space separated list of `events`
   * @param   { String } events - events ids
   * @returns { Object } el
   */

  defineProperty('trigger', function(events) {

    // getting the arguments
    // skipping the first one
    var arglen = arguments.length - 1,
      args = new Array(arglen)
    for (var i = 0; i < arglen; i++) {
      args[i] = arguments[i + 1]
    };

    // Trigger * event
    var star = Object.keys(callbacks).indexOf('*')>-1;
    var starFn = callbacks['*'];

    onEachEvent(events, function(name) {

      var fns = (callbacks[name] || []).slice(0)

      for (var i = 0, fn; fn = fns[i]; ++i) {
        if (fn.busy) return
        fn.busy = 1

//        try {
          var arr = args.slice(0);
          arr.unshift(name);
          if(star) {
            starFn.forEach(function(sfn){
              sfn.apply(el, arr);
            });
          }
          fn.apply(el, fn.typed ? arr : args);
//        } catch (e) { /* error */}
        if (fns[i] !== fn) { i-- }
        fn.busy = 0
      }

        if (callbacks.all && name != 'all') {
          var arr1 = args.slice(0);
          arr1.unshift(name);
          arr1.unshift('all');

          el.trigger.apply(el, arr1);
        }
    })

    return el
  })

  return el

};

Tsore.prototype.observable(Tsore.prototype);

var tsore = new Tsore();


Tsore.prototype.Store = function(actions, defaults, controller){
  // Save this
  var self = this;

  // Arguments
  if(typeof actions == 'function') {
    controller = actions;
    actions = {};
    defaults = {};
  } else if(typeof defaults == 'function') {
    controller = defaults;
    defaults = {};
  }    
	// Make it observable
	tsore.observable(self);

	// First - set defaults
	for(var f in defaults) {
		if(defaults.hasOwnProperty(f)) {
			self[f] = defaults[f];
		}
	};

	// Second - add actions
	for(var f in actions) {
		if(actions.hasOwnProperty(f)) {
//			self.on[f] = function(){
//				var self2 = this;

      (function(actionsf, ff) {
  			self.on(ff, function() {

  				var args = [].slice.call(arguments);
  				if(typeof controller != 'undefined') {
  //					console.log(226,f.append(args));
  					controller.apply(self,[ff].concat(args));
  				}
  				var res = actionsf.call(self,args);
  				if(typeof res === 'string') {
  					tsore.trigger(res);
  				} else if(res === true) {
  					tsore.trigger('change');						
  				} else if(res instanceof Promise) {
  					res.then(function(data){
  						if(typeof res === 'string') {
  							tsore.trigger(res);
  						} else if(res === true) {
  							tsore.trigger('change');						
  						}
  					});
  				}
  			});
      })(actions[f],f);
//			};
		}
	};

	// Initially we call controller without any parameters
	if(typeof controller == 'function') {
		controller.apply(self);
	}

	// Return object
	return this;
}

return tsore;
}));

if(typeof riot !== 'undefined') {
	riot.mixin('tsore',{
	    init: function() {
	      this.disposables = []
	      this.on('unmount', function() {
	        this.disposables.forEach(function(unsubscribe){
	          unsubscribe()
	        })
	      })
	    },	

      attach: function(event,store,fn) {
        if(arguments.length == 2) {
          fn = store;
          store = event;
          event = 'change';
        }
        var self = this;
        tsore.on(event,function(){
          var args = [].slice.call(arguments);
          fn.apply(self,[tsore.store(store)].concat(args));
          self.update();
        }); 
        // First time call
        fn.call(self,tsore.store(store));


      },	
    action: function(action){
      return function(){
        tsore.action(action);
      }
    },

    // Not clear how to use
		store1: function(name,readOnly){
	     var store = tsore.store(name);

	      if (!store) {
	        throw new Error("Store not found: "+ name)
	      };

	      if (readOnly !== true) {
	        var _store = store

	        store = Object.create(_store, {
	          on: { value: _autoDispose(this, _store.on, _store.off) },
	          one:{ value: _autoDispose(this, _store.one, _store.off) }
	        })
	        store.on(CHANGE_EVENT, this.update)
	      }
		}
	});
};

