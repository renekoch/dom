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
