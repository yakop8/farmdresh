<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login Page</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.2/css/all.min.css" rel="stylesheet">
    <style>
        body {
            font-family: 'Poppins', sans-serif;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background-image: url('/farmfresh/assets/img/bg.jpeg');
            background-size: cover;
            background-repeat: no-repeat;
        }

        .login_card {
            background-color: rgba(255, 255, 255, 0.8);
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            padding: 20px;
            width: 320px;
            text-align: center;
        }

        .login_card header h3 {
            margin: 0;
            color: #333;
        }

        .login_card form {
            margin-top: 20px;
        }

        .login_card form fieldset {
            margin-bottom: 15px;
        }

        .login_card form label {
            display: block;
            text-align: left;
            margin-bottom: 5px;
        }

        .login_card form input[type="text"],
        .login_card form input[type="password"],
        .login_card form select {
            width: 100%;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
        }

        .login_card form button {
            width: 100%;
            padding: 10px;
            background-color: #007bff;
            border: none;
            border-radius: 5px;
            color: #fff;
            cursor: pointer;
            transition: background-color 0.3s ease;
        }

        .login_card form button:hover {
            background-color: #0056b3;
        }

        .toggle-password {
            cursor: pointer;
            color: #007bff;
            margin-top: 10px;
        }

        .toggle-password .off {
            display: none;
        }

        .dark {
            background-color: #222;
            color: #fff;
        }
    </style>
</head>
<body>
<main>
    <div class="login_card" id="login">
        <header>
            <h3>Hello There!</h3>
        </header>
        <!-- PHP session status display -->
        <?php
        session_start();
        if(isset($_SESSION['status']) && $_SESSION['status'] !='') {
            echo '<h2 class="bg-danger text-white"> '.$_SESSION['status'].' </h2>';
            unset($_SESSION['status']);
        }
        ?>
        <form action="../pages/logincode.php" method="POST">
            <div class="login_card__info-data">
                <fieldset>
                    <label for="role">Select Role</label>
                    <select name="role" required>
                        <option value="petani">Petani</option>
                        <option value="pelanggan">Pelanggan</option>
                    </select>
                </fieldset>
                <fieldset>
                    <label for="email">
                        <span class="fas fa-envelope"></span> E-mail
                        <input type="text" name="email" placeholder="Email" required>
                    </label>
                </fieldset>
                <fieldset>
                    <label for="pass">
                        <span class="fas fa-lock"></span> Password
                        <input type="password" name="password" placeholder="Password" required>
                    </label>
                </fieldset>
            </div>
            <button type="submit" name="login_btn">Login</button>
        </form>
    </div>
</main>
<script>
    // Toggle dark and light mode
    const btn_check = document.getElementById('toogle_mode');

    btn_check.addEventListener('change', () => {
        document.body.classList.toggle('dark');
    });

    // Toggle password display
    const toggle_input = document.querySelector(".toggle-password");
    const input = document.querySelector("#senha");
    const password_on = document.querySelector(".toggle-password .on");
    const password_off = document.querySelector(".toggle-password .off");

    toggle_input.addEventListener("click", function (e) {
        e.preventDefault();
        if (input.type === "password") {
            input.type = "text";
            input.focus();
            password_on.classList.remove('hide');
            password_off.classList.add('hide');
        } else {
            input.type = "password";
            input.focus();
            password_on.classList.add('hide');
            password_off.classList.remove('hide');
        }
    })
</script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.0/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.2.3/js/bootstrap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/admin-lte/3.2.0/js/adminlte.min.js"></script>

<script>
    $(document).ready(function(){
        end_loader();
    })
</script>
</body>
</html>
