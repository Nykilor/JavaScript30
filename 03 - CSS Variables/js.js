const inputs = document.querySelectorAll(".controls input");

function handleUpdate() {
 const suffix = this.dataset.sizing || "";
 document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);
}

inputs.forEach(input => input.addEventListener("change", handleUpdate));
//"input" - https://www.w3schools.com/jsref/event_oninput.asp
inputs.forEach(input => input.addEventListener("input", handleUpdate));
