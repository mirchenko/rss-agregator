
import parser from 'rss-parser';
import * as Channel from './controllers/channel';

export default app => {
  app.get('/', Channel.Index);
  app.post('/', Channel.Create);
  app.put('/', Channel.Update);
  app.patch('/', Channel.Patch);
  app.delete('/', Channel.Delete);
};
