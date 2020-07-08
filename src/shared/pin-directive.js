// using bind and update lifecycle hooks
// this is a commom way to write directives
// now it wont be necessay refresh the page at every element change
// to declare this directive globally, do it at the main.js
export default function (element, binding) {
  Object.keys(binding.value).forEach((position) => {
    element.style[position] = binding.value[position];
  });
  element.style.position = 'absolute';
}

/* How to use
-> <span v-pin="{backgroundColor: red, bottom: '5px'}>Look at me!</span>"
*/

/* How to use -> v-pin:position.bottom.right
export default {
  bind: (element, binding) => {
    // console.log(`arg: ${binding.arg}`);
    // console.log(`modifiers: ${binding.modifiers}`);
    if (binding.arg !== 'position') return;
    Object.keys(binding.modifiers).forEach((key) => {
      element.style[key] = '5px';
    });
    element.style.position = 'absolute';
  },
};
*/
