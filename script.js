class Component
{
    notify() {
        this.callback();
    }

    register(callback) {
        this.callback = callback;
    }

    render() {}
}

class Renderer
{
    constructor(component, destination) {
        this.render = component.render.bind(component);
        this.destination = destination;

        component.register(() => {
            return this.listen();
        });

        this.listen();
    }

    listen () {
        this.destination.innerHTML = '';
        this.destination.appendChild(this.render());
    }
}


class Counter extends Component
{
    constructor() {
        super();

        this.count = 0;
    }

    render() {
        return $('<div>')
            .append($('<p>')
            .html(`Count: ${this.count}`)
            ).append([
                $('<button>').html('Increment').on('click', () => {
                    this.count++;
                    this.notify();
                }),
                $('<button>').html('Decrement').on('click', () => {
                    this.count--;
                    this.notify();
                })
            ])[0];
    }
}