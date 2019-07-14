export default class Timer {
    constructor(deltaTime = 1 / 60){
        let accumlatedTime = 0
        let lastTime = 0;

        this.updateProxy =  (time) => {
            accumlatedTime += (time - lastTime) / 1000;

            while (accumlatedTime > deltaTime) {
                this.update(deltaTime);
                accumlatedTime -= deltaTime;
            }
            lastTime = time

            this.enqueue();
        }
    }

    enqueue() {

        requestAnimationFrame(this.updateProxy);
    }

    start() {
        this.enqueue();

    }
}