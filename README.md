# DOM
Yet another dom manipulation library

* 1.5k when compressed
* chainable
* easy to use

## Example
```javascript
import DOM from 'dom';

const div = DOM('div')
  .addClass('my-class')
  .attr({draggable: true})
  .css({
    color: 'red', 
    height: 100
  })
  .appendTo(document.body);
```

## Methods
* css(o) 
* attr(attributes) 
* on(evt, fn, add_direct_event = false) 
* off(evt, fn) 
* addClass(cls) 
* removeClass(cls) 
* toggleClass(cls, force) 
* hasClass(cls) 
* add(...children) 
* html(html) 
* text(text) 
* clear() 
* appendTo(parent) 
* remove() 
