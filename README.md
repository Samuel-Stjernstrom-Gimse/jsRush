# jsRush
https://samuel-stjernstrom-gimse.github.io/kegl/

jsRush is a lightweight framework for creating web components. It’s designed to be simple and easy to use with minimal setup. The goal is to help you create reactive, interactive components without requiring complex tools or build steps.

## **Core Concepts**

js-Rush revolves around three main classes:

- **`Construct`**: The base class for components, responsible for managing the shadow DOM and scoped styles.
- **`Component`**: Extends `Construct` and adds functionality for managing state, handling events, and working with attributes.
- **`State`**: A reactive class that allows components to manage state and trigger re-renders when state changes.
---

## **Creating a Component**

To create a custom component, extend the `Component` class. Here’s an example:

```js
class MyComponent extends Component {
    handleClick() {
        this.subState.value++;
        const imgCone = this.select('#img-cone');

        imgCone.style.transform = 'scale(1.1)';
        setTimeout(() => imgCone.style.transform = 'scale(1)', 100);
    }

    render() {
        this.css(`
            div {
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
            }
            
            img {
                height: 10rem;
                transition: 0.1s;
            }
            
            img:hover {
                filter: drop-shadow(0 0 15px rgba(255, 165, 0, 0.8)); /* Orange glow effect */
            }

        `);

        this.html(`
            <div>
                <img id="img-cone" src="https://www.svgrepo.com/show/10031/traffic-cone.svg" alt="cone">
                <h1>${this.params.value}</h1>
                <button id="btn">count is ${this.subState.value} </button>
            </div>
        `)

        this.attachEvent('#btn', 'click', () => this.handleClick());
    }
}
```

---

## **Important Methods**

### **`render()`**
The `render()` method is where you define your component's HTML structure and styles.

- **`this.css()`**: Applies scoped styles to your component.
- **`this.html()`**: Updates the HTML of the component’s shadow DOM.

### **`attachEvent(target, event, callback)`**
This method adds an event listener to an element inside your component. 

Example:
```js
this.attachEvent('#btn', 'click', () => this.handleClick());
```
This adds a click listener to the button with the ID `btn`.

### **`this.select(target)`**
This method is used to select elements within the component’s shadow DOM.

Example:
```js
this.select('#img-cone')
```

### **`State Management (subState & params)`**
`State` objects allow you to manage internal state in your component. You can subscribe to state changes with the `subRender` method, which triggers a re-render when the state changes.

#### Example:
```js
this.params = new State({ name: 'samuel', params: '' });
this.subState = new State(0);
```

Whenever `subState.value` or `params.value` changes, the component re-renders automatically.

### **`this.params` & `this.subState`**
These are instances of the `State` class, where you store the component’s internal state. For instance, `this.subState.value` holds a counter, and `this.params.value` holds a custom string.

---

## **HTML & CSS Inside `${}`**

Inside the `${}` template literals (used in `html()`), you can insert dynamic values from the component’s state. The expression is evaluated, and the result is inserted as text or HTML.

Example:
```js
this.html(`
    <h1>${this.params.value}</h1>
    <button id="btn">count is ${this.subState.value}</button>
`);
```
Here, the values of `params.value` and `subState.value` will be displayed in the HTML.

---

## **Scoped Styles**

The `css()` method applies scoped styles to your component. These styles are encapsulated inside the shadow DOM, meaning they won't affect other elements on the page.

Example:
```js
this.css(`
    div {
        display: flex;
        justify-content: center;
        align-items: center;
    }
`);
```

The styles above will only apply to elements inside the shadow DOM of your component.


## **Component Styles**

to alter styles for all components do this:
```js
sharedStyles.replaceSync(`
    css here
`)
```
---

## **Attributes & Observed Attributes**

You can listen for changes to specific attributes using `observedAttributes` and `attributeChangedCallback`:

```js
static get observedAttributes() {
    return ['params'];
}

attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'params') {
        this.params.value = newValue;
    }
}
```

When the `params` attribute changes, the `attributeChangedCallback` is triggered, and you can update the component’s state.

---

## **State Class**

The `State` class is used for reactive state management. It allows you to subscribe to changes in the state and automatically re-render the component when the state changes.

```js
class State {
    constructor(initialState) {
        this._state = initialState;
        this.subscribers = [];
    }

    get value() {
        return this._state;
    }

    set value(newValue) {
        if (newValue !== this._state) {
            this._state = newValue;
            this.notify();
        }
    }

    subscribe(subscriber) {
        this.subscribers.push(subscriber);
    }

    subRender(subscriber) {
        this.subscribers.push(() => subscriber.render());
    }

    notify() {
        this.subscribers.forEach(subscriber => subscriber());
    }
}
```

- `get value`: Retrieves the current state.
- `set value`: Updates the state and notifies all subscribers if the value changes.
- `subRender()`: A special method to subscribe a component’s render method to state changes.

---
## **Stash**
You can stash states in the stash variable. and from there share them to other components with get
```js
    stash.addState({storedName: state})
    stash.getState().storedName
```



## **Conclusion**

jsRush provides a simple and flexible way to create web components with minimal setup. By extending the `Component` class and using the `State` class, you can build interactive, reactive components. Whether you’re working on a small project or a large-scale web app, jsRush makes component-based development straightforward.

