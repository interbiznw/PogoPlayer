const pogobuf = require("pogobuf");


const args = {
  "a": "ptc",
  "i": [1,4,7][Math.random()*3|0]
};
var a;
for (let i = 2; i < process.argv.length; i++) {
  let arg = process.argv[i];
  let m = arg.match(/-(a|u|p|l|i)/);
  if (m) {
    a = m[1];
  } else {
    args[a] = arg;
  }
}
args.l = args.l.split(",");
const login = args[a] === "ptc"
  ? pogobuf.PTCLogin()
  : pogobuf.GoogleLogin();
const client = pogobuf.Client();

login.login(args["u"], args["p"])
.then(token => {
  client.setAuthInfo(args[a], token);
  client.setPosition(args.l[0], args.l[1]);
  return client.init();
})
.then(() => {
  setInterval(() => {
    client.encounterTutorialComplete(args.i)
    .then(() => {
      client.markTutorialComplete(0, false, false);
    });
  }, 5000);
});