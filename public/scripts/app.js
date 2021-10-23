// Client facing scripts here

//Log in form config
$(() => {
  $(".login_form").on("submit", function (e) {
    e.preventDefault();

    const $loginContainer = $("#login_container");
    const $passwordsContainer = $("#passwords_container");
    $loginContainer.hide();
    $passwordsContainer.show();

    // const $formData = $(this).serialize();

    $.get("/api/passwords", function (passwords) {
      passwords.forEach((password) => {
        console.log(passwords)
        const passwordItem = `
        <tr>
          <td id="password_name">${password.name}</td>
          <td id="password_category">${password.category}</td>
          <td id="password_edit_btn">
            <form action="POST" action="/passwords/:id/edit">
              <button type="submit">Edit</button>
            </form>
          </td>
          <td id="password_delete_btn">
            <form action="POST" action="/passwords/:id">
              <button type="submit">Delete</button>
            </form>
          </td>
        </tr>;
        `;

        $(".list_of_passwords").append(passwordItem);
      });
    });
  });
});
