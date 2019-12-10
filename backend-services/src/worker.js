import queue from './queues';
import jobs from './jobs';
import configureConnection from './config/mongodb';

configureConnection();

Object.keys(jobs).forEach((queueName) => {
  const performer = queue(queueName, jobs[queueName].config);

  performer.queue.process(jobs[queueName].job);

  performer.queue.on('completed', (job, result) => {
    console.log(`Job completed with result ${result}`);
  });

  performer.queue.on('error', (job) => {
    console.log(`Job error with result ${job}`);
  });

  performer.queue.on('waiting', (job) => {
    console.log(`Job waiting with result ${job}`);
  });

  performer.queue.on('active', (job, jobPromise) => {
    console.log(jobPromise);
    console.log(`Job waiting with result ${job}`);
  });

});
