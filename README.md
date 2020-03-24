# PageAnimation

## Index

- [Example](#example)
- [CSS Classes](#css-classes)

It is a very basic animation wrapper that has a very specific use case.

It allows you to have different routes within react-router places as if in a grid and provide customized transitions based
on the direction.

There is only one `export default` which is the `PageAnimation` Componant

## PageAnimation Props

| Name             | Type                       | Default    | Purpose                                                                                                                                               |
| ---------------- | -------------------------- | ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `animate`        | `boolean`                  | `true`     | Whether to animate the between screens or directly jump to next screen. (note: this is added for an easy toggle)                                      |
| `bias`           | "vertical" \| "horizontal" | "vertical" | Since currently only the 4 cardinal directions are supported, if the relative direction is at non 90 degree angle, the bias resolves which one to use |
| `children`       | `any`                      | _Required_ | The regular React children which gets rendered on each page                                                                                           |
| `classExtension` | `string`                   | _Required_ | The base className from which all the directions extend                                                                                               |
| `className`      | `string`                   | `null`     | The `className` to be applied on the wrapper div which holds all the rendered screens                                                                 |
| `grid`           | `RegExp[][]`               | _Required_ | This is the grid of pages which is matched against location path from which realtive direcctions are found                                            |
| `timeout`        | `number`                   | _Required_ | The time delay after which previous screen will be unmounted                                                                                          |

> ### `bias`:
>
> As noted before, currently diagnol directions arent supported, bias controls whether to check for up/down first or left/right.
> eg: If the page is to the `top-left`, if bias is "vertical", the direction `top` will be given. If the bias was "horizontal", left would be given

# Example

Taking this example setup

```tsx
<PageTransition classExtension="direction" timeout={500} grid={[[/\/$/, /\/about$/], [/\/products$/]]}>
  <Switch>
    <Route path="/about" component={About} />
    <Route path="/products" component={Product} />
    <Route path="/" component={Home} />
  </Switch>
</PageTransition>
```

The basic page layout then is -

<table>
<tr>
  <td>Home  [/]</td>
  <td>About [/about]</td>
</tr>
<tr>
  <td colspan=2>Products [/products]</td>
</tr>
</table>

If a user is at `/` and then clicks to go to `/product`, then the css class which is added is

- for `/` screen: `direction-down-leave`
- for `/products` screen: `direction-down-enter`
  > After 500 milliseconds, `/` screen will be unmounted and `/products` will have the class `direction-done`

Similarily, if a user is at `/products` and clicks to go to `/about`, then the css class which is added is

- for `/products` screen: `direction-top-leave`
- for `/abourt` screen: `direction-top-enter`
  > After 500 milliseconds, `/products` screen will be unmounted and `/about` will have the class `direction-done`

# CSS Classes

In general the classes are generated in the following format:  
"`classExtension`-`direction`-`timePosition`" _where `classExtension` is supplied as a prop, `direction` is the relative direction between 2 screens, and the `timePostion` is position of the animation in the lifecycle of the component_

> eg. pages-left-done
> `pages` The name supplied to the Transition component
> `left` The current component was to the left of the previous component
> `done` The previous component has been unmounted and backward means behind in the url tree

## classExension

The prop supplied by you.

## direction

There are six directions - `top`, `bottom`, `left` and `right` which are the relative postions in the grid. <br>
If the same grid location is detected, depending on the relative depth of the url, `same-backward`, `same-forward` and `same` are set as the direction.

> eg: Both the urls are matched to the same position on the grid path.
> If the previous url is `/users` and the next url is `/users/232`, then the same-forward animation will be triggered

<br>

## timePosition

There are three 'timePositions' - `enter`, `done`, `leave`.

- `enter` - When the component, as well as the previous component, are mounted.
- `done` - When the previous component is unmounted.
- `leave`- When this component is going to be unmounted. _[Note: this correlated to the next components `enter` timePosition]_
