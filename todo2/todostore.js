if(typeof export === 'object') {
	tsore = require('tsore');
}

tsore.register('todos',{
	mixins: ['simplesync'],
	server: {
		defaults: [
			{name: 'Close the window'}, 
			{name: 'Open the door'}
		]
	},
	client: {
		actions: {
			add: function(a){
				this.push(a);
				return true;
			},
			remove: function(i){
				this.pop();
				return true;
			},
			done: function(i){
				this[i] = !this[i];
				return true;
			}
		}
	},
});

