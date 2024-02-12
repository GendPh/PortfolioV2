// This event listener listens for the form submission and prevents the default form submission behavior
document.getElementById("mail-form").addEventListener("submit", (e) => {
  e.preventDefault();

  // Selecting elements related to the submit button
  const submit_btn = document.querySelector("#mail-form button[type='submit']");
  const submit_btn_loader = document.querySelector("#mail-form button[type='submit'] .loader");
  const submit_btn_text = document.querySelector("#mail-form button[type='submit'] .text");

  // Disabling the submit button, showing loader and hiding text
  submit_btn.classList.add("pointer-events-none", "opacity-40");
  submit_btn_loader.classList.remove("hidden");
  submit_btn_text.classList.add("hidden");

  // Initializing emailjs with public key
  const publicKey = "faIOzRWyYu1xzdu7D";
  emailjs.init({
    publicKey: publicKey,
  });

  // Selecting input fields and getting their values
  let form_name_input = document.querySelector("#mail-form input[name='client_name']");
  let form_email_input = document.querySelector("#mail-form input[name='client_email']");
  let form_message_input = document.querySelector("#mail-form textarea[name='client_message']");

  // Sanitizing input values
  let form_name_value = sanitizeInput(form_name_input.value);
  let form_email_value = sanitizeInput(form_email_input.value);
  let form_message_value = sanitizeInput(form_message_input.value);

  // Service and template keys for sending email via emailjs
  const service_key = "service_x5i917r";
  const template_key = "template_q07z7yi";

  // Parameters for email template
  const templateParams = {
    client_name: form_name_value,
    client_email: form_email_value,
    client_message: form_message_value,
    destination_email: "gabferreira983@gmail.com",
  };

  // Sending email using emailjs
  emailjs.send(service_key, template_key, templateParams).then(
    (response) => {
      // If mail is sent successfully, update button text and hide loader
      submit_btn.classList.remove("pointer-events-none", "opacity-40");
      submit_btn_text.textContent = "Mail Sent Successfully";
      submit_btn_loader.classList.add("hidden");
      submit_btn_text.classList.remove("hidden");
    },
    (error) => {
      // If there's an error in sending mail, show appropriate message
      submit_btn_loader.classList.add("hidden");
      submit_btn_text.classList.remove("hidden");
      submit_btn.classList.remove("opacity-40");
      submit_btn_text.textContent = "Something failed. Please try again later"
    },
  );

  // Resetting form input values after submission
  form_name_input.value = "";
  form_email_input.value = "";
  form_message_input.value = "";
});

// Function to sanitize input by removing HTML tags
function sanitizeInput(input) {
  return input.replace(/<[^>]*>?/gm, '');
}
