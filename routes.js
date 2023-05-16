const router = require('express').Router();
const { messages } = require('./db.js');

router.get('/messages', (req, res) => {
  res.send(messages);
});

router.get('/messages/:groupId', (req, res) => {
  const searchedMsg = messages.filter(msg => msg.groupId === req.params.groupId);
  if (searchedMsg.length === 0) {
    res.send({ error: 'Такого сообщения нет' });
    return;
  }

  res.send(searchedMsg);
});

router.post('/messages', (req, res) => {
  messages.push(req.body);

  res.send(messages);
})

module.exports = router;