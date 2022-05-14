const wrapper = document.querySelector(".wrapper"),
  form = document.querySelector("form"),
  fileInp = form.querySelector("input"),
  infoText = form.querySelector("p"),
  closeBtn = document.querySelector(".close"),
  copyBtn = document.querySelector(".copy");

function fetchRequest(file, formData) {
  infoText.innerText = "Scanning QR Code...";
  fetch("http://api.qrserver.com/v1/read-qr-code/", {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json())
    .then((result) => {
      result = result[0].symbol[0].data;
      infoText.innerText = result
        ? "Upload QR Code to Scan"
        : "Couldn't scan QR Code";
      if (!result) return;
      document.querySelector("textarea").innerText = result;
      form.querySelector("img").src = URL.createObjectURL(file);
      wrapper.classList.add("active");
    })
    .catch(() => {
      infoText.innerText = "Couldn't scan QR Code";
    });
}

fileInp.addEventListener("change", async (e) => {
  let file = e.target.files[0];
  if (!file) return;
  let formData = new FormData();
  formData.append("file", file);
  fetchRequest(file, formData);
});

copyBtn.addEventListener("click", () => {
  let text = document.querySelector("textarea").textContent;
  navigator.clipboard.writeText(text);
});

form.addEventListener("click", () => fileInp.click());
closeBtn.addEventListener("click", () => wrapper.classList.remove("active"));

const wrapper2 = document.querySelector(".wrapper2"),
  qrInput = wrapper2.querySelector(".wrapper2 .form input"),
  generateBtn = wrapper2.querySelector(".wrapper2 .form button"),
  qrImg = wrapper2.querySelector(".wrapper2 .qr-code img");
let preValue;

generateBtn.addEventListener("click", () => {
  let qrValue = qrInput.value.trim();
  if (!qrValue || preValue === qrValue) return;
  preValue = qrValue;
  generateBtn.innerText = "Generating QR Code...";
  qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${qrValue}`;
  qrImg.addEventListener("load", () => {
    wrapper2.classList.add("active");
    generateBtn.innerText = "Generate QR Code";
  });
});

qrInput.addEventListener("keyup", () => {
  if (!qrInput.value.trim()) {
    wrapper2.classList.remove("active");
    preValue = "";
  }
});

document.body.classList.add(localStorage.getItem("pagecolor") || "red");
var el = document.querySelectorAll(".color-switch li");
var classeslist = [];
// starting make loop
for (var i = 0; i < el.length; i++) {
  // get classes list
  classeslist.push(el[i].getAttribute("data-color"));
  el[i].addEventListener(
    "click",
    function () {
      //remove old classes
      document.body.classList.remove(...classeslist);
      //add current class on click
      document.body.classList.add(this.getAttribute("data-color"));
      // add to local refresh

      localStorage.setItem("pagecolor", this.getAttribute("data-color"));
    },
    false
  );
}
console.log(localStorage.getItem("pagecolor"));
