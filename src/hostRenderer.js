document.getElementById('form-btn').addEventListener('click', () => {
	const port = document.getElementById('port').value;
	const subdomain = document.getElementById('subdomain').value;
	window.features.createSubdomain(port, subdomain);
});
