import Queue from 'bull';
import env from '../config/env';

class Performer {
  constructor(queueName) {
    this.q = new Queue(queueName, env.redis_url);
    this.performLater = this.performLater.bind(this);
  }

  get queue() {
    return this.q;
  }

  set queue(q) {
    this.q = q;
  }

  performLater(params) {
    this.q.add(params);
  }
}

const queue = (queueName) => (
  new Performer(queueName)
);

export default queue;
