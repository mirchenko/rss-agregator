import Channel from '../../../models/channel';
import { isEmpty } from 'lodash';

import { REQUIRE_URL, EMPTY_NAME,  } from '../types';

const Update = (req, res, next) => {
  const { name, url } = req.body;

  if(!url) {
    res.status(422).send({ error: REQUIRE_URL });
  }

  if(isEmpty(name)) {
    res.status(422).send({ error: EMPTY_NAME });
  }

  Channel.findOne({ url }, (err, channel) => {
    if(err) { return next(err); }

    if(!channel) {
      res.status(422).send({ error: CHANNEL_NOT_EXIST });
    }

    channel.name = name;
    channel.save(err => {
      if(err) { return next(err); }

      res.json({ updated: true })
    });

  });

};

export { Update };
