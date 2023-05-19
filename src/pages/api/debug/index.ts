import Pusher from "pusher";

const pusher = new Pusher({
  appId: "1600127",
  key: "5de20a9065b26377af84",
  secret: "7b2d304f71134aa358fe",
  cluster: "eu",
  useTLS: true,
});

export default function handler(req, res) {
  pusher.trigger("chat", "chat-event", {
    message: "hello world",
  });

  res.status(200).json({ name: "John Doe" });
}
