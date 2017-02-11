import Channel from '../../../models/channel';

const Index = (req, res, next) => {
  Channel.find((err, result) => {
    if(err) { return next(err); }

    res.json({ result });
  });
};

export { Index };
