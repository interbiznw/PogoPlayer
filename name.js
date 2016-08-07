const pogobuf = require("pogobuf");

const args = {
  "a": "ptc"
};
var a;
for (let i = 2; i < process.argv.length; i++) {
  let arg = process.argv[i];
  let m = arg.match(/-(a|u|p|l|n)/);
  if (m) {
    a = m[1];
  } else {
    args[a] = arg;
  }
}
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
    client.checkCodenameAvailable(args.n)
    .then((n, um, ia, s) => {
      console.log(n,um,ia,s);
      if (ia) {
        client.claimCodename(args.n);
      }
    });
  }, 5000);
});