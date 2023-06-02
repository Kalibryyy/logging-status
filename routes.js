const router = require("express").Router();
const { celebrate, Joi } = require("celebrate");
const { messages } = require("./db.js");

router.get("/messages", (req, res) => {
  res.send(messages.slice().reverse());
});

router.get("/messages/:groupId", (req, res) => {
  const searchedMsgs = messages.filter(
    (msg) => msg.groupId === req.params.groupId
  );
  if (searchedMsgs.length === 0) {
    res.status(404).send({ message: "сообщение не найдено" });
  }

  res.send(searchedMsgs);
});

router.post(
  "/messages",
  celebrate({
    body: Joi.object().keys({
      id: [Joi.string().required(), Joi.number().required()],
      groupId: Joi.string(),
      message: Joi.string().required().max(500),
      status: Joi.string().max(500),
      timestamp: Joi.number(),
    }),
  }),
  (req, res) => {
    if (messages.find((msg) => msg.id && msg.id === req.body.id)) {
      res.status(400).send({ message: "сообщение с таким id уже есть" });
      return;
    } else if (
      req.body.status !== "info" &&
      req.body.status !== "warning" &&
      req.body.status !== "error"
    ) {
      res.status(500).send({ message: "неверно указан статус" });
      return;
    }

    const newMessage = req.body;

    messages.push(newMessage);

    res
      .status(201)
      .send({ message: "сообщение добавлено", message: newMessage });
  }
);

module.exports = router;
