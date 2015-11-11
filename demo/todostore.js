tsore.register('TodoStore',
    {
      todo_add: function(newTodo) {
        console.log(4,newTodo,this);
        this.todos.push(newTodo[0]);
        tsore.trigger('todos_changed', this.todos);
      },

      todo_remove: function() {
        this.todos.pop();
        tsore.trigger('todos_changed', this.todos);
      },

      todo_init: function() {
        tsore.trigger('todos_changed', this.todos);
      }
  },
  {
    todos: [ 
    { title: 'Task 1', done: false },
    { title: 'Task 2', done: false }  
    ]
  }
);
