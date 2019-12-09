import path from 'path';

import queue from './queues';
import { allQueues } from './queues/constants';

allQueues.forEach((q) => {
  const processor = queue(q.name);
  processor.queue.process(path.join(__dirname, q.jobPath));
});
