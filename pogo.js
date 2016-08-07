const pogobuf = require("pogobuf");
const fs = require("fs");

const acc = fs.readFileSync("./accounts.csv", "utf-8").split("\n").map(x=>x.split(","));
console.log(acc);

for (let i = 0; i < acc.length; i++) {
  let a = acc[i];
  console.log(`Auth service: ${a[0]}, Username: ${a[1]}, Password: ${a[2]}, Location: ${a[3]},${a[4]}`);
  
  let login = a[0] === "ptc"
    ? pogobuf.PTCLogin()
    : pogobuf.GoogleLogin();
  let client = pogobuf.Client();
  login.login(a[1], a[2])
  .then(token => {
    client.setAuthInfo(a[0], token);
    client.setPosition(parseFloat(a[3]), parseFloat(a[4]));
    return client.init();
  })
  .then(() => {
    let timeOut = Math.random()*3000+5000|0;
    console.log(`Logged in. Doing stuff in ${timeOut/1000} seconds`);
    setTimeout(() => {
      new Promise((resolve) => {
        resolve(client.encounterTutorialComplete(1))
      })    
      .then(() => {
        new Promise((resolve) => {
          resolve(client.markTutorialComplete(0, false, false));
        })
        .then(plr=>{
          new Promise(resolve=>{
            resolve(client.checkCodenameAvailable(a[5]));
          })
          .then(data=>{
            if (data.is_assignable) {
              new Promise((resolve)=>{resolve(client.claimCodename(a[5]));})
              .then(() => {
                console.log(`${a[5]} codename has been picked!`);
              })
            } else {
              console.log(`Failed to get${a[5]} codename at ${i} index/line`);
            }
          });
        });
      });
    }, timeOut);
  })
  .catch(err => {
    console.error(err);
  });
}


