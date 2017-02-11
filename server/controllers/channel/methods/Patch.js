import Channel from '../../../models/channel';
import { findIndex } from 'lodash';

import { REQUIRE_PATCH_LINK, REQUIRE_URL, CHANNEL_NOT_EXIST } from '../types';

const Patch = (req, res, next) => {
  const  { url, link } = req.body;

  if(!url) {
    return res.status(422).send({ error: REQUIRE_URL });
  }

  if(!link) {
    return res.status(422).send({ error: REQUIRE_PATCH_LINK });
  }

  Channel.findOne({ url }, (err, channel) => {
    if(err) { return next(err); }

    if(!channel) {
      return res.status(422).send({ error: CHANNEL_NOT_EXIST });
    }

    const entryIndex = findIndex(channel.entries, entry => entry.link === link);
    channel.entries[entryIndex].watched = true;
    channel.markModified('entries');
    channel.save(err => {
      if(err) { return next(err); }

      res.json({ patched: true });
    });

  });
};

export { Patch };
