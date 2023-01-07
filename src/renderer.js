const Form = document.getElementById("form");

Form.addEventListener("submit", () => {
  // const port = document.forms[0].elements["port"].value;
  // const subdomain = document.forms[0].elements["subdomain"].value;
  console.log(Form);
  window.electronAPI.createSubdomain();
});
