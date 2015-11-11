
<todo>

  <h3>{ opts.title }</h3>

  <ul>
    <li each={ items }>
      <label class={ completed: done }>
        <input type="checkbox" checked={ done } onclick={ parent.toggle }> { title }
      </label>
    </li>
  </ul>

  <form onsubmit={ add }>
    <input name="input" onkeyup={ edit }>
    <button disabled={ !text }>Add #{ items.length + 1 }</button>
  </form>
  <button disabled={ !items.length } onclick={ action('todo_remove') }>Remove</button>

  this.mixin('tsore');

  var self = this
  self.disabled = true
  self.items = []

  this.attach('todos_changed', 'TodoStore', function(store,items) {
    self.items = items;
  });


  self.on('mount', function() {
    tsore.action('todo_init')
  });

  // Register a listener for store change events.


  edit(e) {
    self.text = e.target.value
  }

  add(e) {
    if (self.text) {
      tsore.action('todo_add', { title: self.text });
      self.text = self.input.value = '';
    }
  };

  toggle(e) {
    var item = e.item;
    item.done = !item.done;
    return true;
  };

</todo>