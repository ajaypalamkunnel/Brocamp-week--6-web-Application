$("#signupForm").submit(function (event) {
  alert("User added successfully");
});

document.addEventListener("DOMContentLoaded", () => {
  const updateForm = document.getElementById("updateForm");

  updateForm.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent the default form submission

    const userId = updateForm.getAttribute("action").split("/").pop(); // Extract user ID from form action
    const formData = new FormData(updateForm);

    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    try {
      const response = await fetch(`/admin/updateUser/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        document.getElementById("success-msg").innerText =
          "User updated successfully!";
        console.log("Update successful:", result);
      } else {
        const error = await response.json();
        document.getElementById(
          "error-msg"
        ).innerText = `Error: ${error.message}`;
        console.error("Update failed:", error);
      }
    } catch (err) {
      document.getElementById("error-msg").innerText =
        "Error updating user information";
      console.error("Error:", err);
    }
  });
});


function deleteUser(){


document.addEventListener("DOMContentLoaded", () => {
  console.log("hi guyyy");
  if (window.location.pathname === "/") {
    const deleteButtons = document.querySelectorAll(".table tbody td a.delete");

    deleteButtons.forEach((button) => {
      button.addEventListener("click", function (event) {
        event.preventDefault(); // Prevent the default action

        const id = this.getAttribute("data-id");
        const request = {
          url: `http://localhost:5000/admin/deleteUser/${id}`,
          method: "DELETE",
        };

        if (confirm("Do you want to delete this record?")) {
          fetch(request.url, {
            method: request.method,
          })
            .then((response) => response.json())
            .then((data) => {
              alert("User deleted successfully!");
              location.reload(); // Reload the page to reflect changes
            })
            .catch((error) => {
              console.error("Error:", error);
              alert("Error deleting user.");
            });
        }
      });
    });
  }
});

}