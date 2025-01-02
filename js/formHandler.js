emailjs.init("kQXOQBZTTubNRGzZV");

// Handle form submission
document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("#contactForm");

  if (form) {
    form.addEventListener("submit", async function (event) {
      event.preventDefault();

      const name = form.querySelector('[name="field-name"]').value.trim();
      const email = form.querySelector('[name="field-email"]').value.trim();
      const message = form.querySelector('[name="field-message"]').value.trim();

      if (!name || !email || !message) {
        showResponseMessage(
          "Please fill out all fields before submitting.",
          "error"
        );
        return;
      }

      const templateParams = {
        field_name: name,
        field_email: email,
        field_message: message,
      };

      try {
        const response = await emailjs.send(
          "service_7fka4ok",
          "template_sfycxui",
          templateParams
        );

        showResponseMessage(
          "Your message has been sent successfully!",
          "success"
        );
        form.reset();
      } catch (error) {
        showResponseMessage(
          "There was an error sending your message. Please try again.",
          "error"
        );
        console.error("Error sending email:", error);
      }
    });
  } else {
    console.error(
      "Form not found. Ensure the form selector matches your HTML."
    );
  }

  function showResponseMessage(message, type) {
    const responseMessageContainer = document.getElementById("responseMessage");
    if (responseMessageContainer) {
      responseMessageContainer.innerText = message;
      responseMessageContainer.className =
        type === "success" ? "success-message" : "error-message";
      responseMessageContainer.style.display = "block";
    }
  }
});
