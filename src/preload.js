const { contextBridge } = require('electron');
const localtunnel = require('localtunnel');
contextBridge.exposeInMainWorld('features', {
  createSubdomain,
});

async function createSubdomain(port, subdomain) {
  const tunnel = await localtunnel({
    port: Number(port),
    subdomain,
  });
  console.log('Host Successful: ', tunnel.url);
}
