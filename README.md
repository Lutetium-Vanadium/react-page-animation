# PageAnimation

It is a very basic animation wrapper that has a very specific use case.

It allows you to have different routes within react-router places as if in a grid and provide customized transitions based
on the direction.

## Props

@param {RegExp[][]} grid Which is a RegExp 2D array which is used to match against the route to determine the direction

@param {number} timeout The time after previous component is unmounted.

@param {string} classExtension Gives the base name for each class.

@param {any} children What to render in each page

@param {string} className A className to apply to the PageTransition root div

@param {boolean} animate Whether to animate or not [Can be used as an easy toggle if there is a setting to disable animations]

@param {"vertical"|"horizontal"} bias As currently diagnol directions arent supported, bias controls whether to check for
up/down first or left/right. eg: If the page is to the top-left, if bias is "vertical", the direction `top` will be given.
If the bias was "horizontal", left would be given

There are three 'classStates' - `enter`, `done`, `leave`.
`enter`- When the component, as well as the previous component, are mounted.
`done`- When the previous component is unmounted.
`leave`- When this component is going to be unmounted.

There are four directions - `top`, `bottom`, `left` and `right`, as well as `same-forward` and `same-backward`
These all refer to the direction the next component is in where same means same position in the grid, and
forward means further down the url tree

The classes are of the form `classExtension-direction-classState`
eg. pages-left-done
`pages` The name supplied to the Transition component
`left` The current component was to the left of the previous component
`done` The previous component has been unmounted and backward means behind in the url tree
