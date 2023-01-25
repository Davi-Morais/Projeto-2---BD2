/*const sampleForm = document.getElementById("enviar-anotacao");

sampleForm.addEventListener("submit", async (e) => {
  
  e.preventDefault();

  let form = e.currentTarget;

  let url = form.action;

  try {
    let formData = new FormData(form);

    let responseData = await postFormFieldsAsJson({ url, formData });

    let { serverDataResponse } = responseData;

    console.log(serverDataResponse);
    document.location.reload(true);
  } catch (error) {
    console.error(error);
  }
});

async function postFormFieldsAsJson({ url, formData }) {
  let formDataObject = Object.fromEntries(formData.entries());
  let formDataJsonString = JSON.stringify(formDataObject);

  let fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: formDataJsonString,
  };

  let res = await fetch(url, fetchOptions);

  if (!res.ok) {
    let error = await res.text();
    throw new Error(error);
  }
  
  return res.json();
}
*/
