import parser from 'rss-parser';
import Channel from '../../../models/channel';
import { map, isEmpty } from 'lodash';

import { CHANNEL_EXIST, BAD_URL, REQUIRE_URL } from '../types';

const Create = (req, res, next) => {
  const { url } = req.body;
  let { name } = req.body;

  if(!url) {
    return res.status(422).send({ error: REQUIRE_URL });
  }

  if(!name) { name = url};

  Channel.findOne({ url }, (err, existing) => {
    if(err) { return next(err); }

    if(existing) {
      return res.status(422).send({ error: CHANNEL_EXIST });
    }

    parser.parseURL(url, function(err, parsed) {
      if(err) {
        return res.status(422).send({ error: BAD_URL });
      }

      if(isEmpty(parsed)) {
        return res.status(422).send({ error: BAD_URL });
      }

      const { entries } = parsed.feed;
      map(entries, item => item.watched = false);

      const channel = new Channel({ name, url, entries });
      channel.save(err => {
        if(err) { return next(err); }

        res.json({ name, url, entries });
      });
    });
  });
};

export { Create };
