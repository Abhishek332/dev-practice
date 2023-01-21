const { contextBridge } = require('electron');
contextBridge.exposeInMainWorld('features', {
	createSubdomain,
});

function createSubdomain(port, subdomain) {
	console.log('Host Successful : ', port, subdomain);
	//  const tunnel = await localtunnel({
	//    port: Number(port),
	//    subdomain,
	//  });
}
