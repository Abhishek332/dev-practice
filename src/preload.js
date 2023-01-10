const { contextBridge } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  createSubdomain,
});


// async function createSubdomainPreload(port, subdomain) {
//   const tunnel = await localtunnel({
//     port: Number(port),
//     subdomain,
//   });
//   console.log("Host Successful : ", tunnel.url);
// }
function createSubdomain() {
  console.log("Create Preload");
}
