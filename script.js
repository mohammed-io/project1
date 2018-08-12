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

class Stopwatch extends Component
{
    constructor() {
        super();
        
        this.time = 0;
    }

    start() {
        this.handle = setInterval(() => {
            this.time += 10;

            this.notify();
        }, 10);
    }

    pause() {
        clearInterval(this.handle);
    }

    formatTime(number) {
        const hours = Math.floor(number / 1000 / 60 / 60);
        const minutes = Math.floor(number / 1000 / 60) % (3600);
        const seconds = Math.floor(number / 1000) % 60;
        const milliSeconds = number % 1000;

        return `${('0' + hours).slice(-2)}:${('0' + minutes).slice(-2)}:${('0' + seconds).slice(-2)}.${('00' + milliSeconds).slice(-3)}`;
    }

    reset() {
        this.time = 0;
        this.notify();
    }

    render() {
        return $('<div class="col-md-12 text-center mono-font">')
        .append([
            $('<h1>').html(this.formatTime(this.time)),
            $('<button class="btn btn-primary">').html('Start').on('click', this.start.bind(this)),
            $('<button class="btn btn-warning">').html('Pause').on('mousedown', this.pause.bind(this)),
            $('<button class="btn btn-danger">').html('Reset').on('click', this.reset.bind(this))
        ])[0];
    }
}

