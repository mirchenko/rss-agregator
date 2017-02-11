import Channel from '../../../models/channel';

const Delete = (req, res, next) => {
  const { url } = req.body;
  Channel.remove({ url }, (err) => {
    if(err) { return next(err); }

    res.json({ deleted: true });
  });
};

export { Delete };
