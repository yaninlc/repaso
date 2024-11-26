// Inicialización de EmailJS
emailjs.init("ELUsZqPC9dkPZL456");

// Página de inicio (login)
document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const messageElement = document.getElementById("message");

    if (password === "1234") { // Simulación de verificación
        messageElement.textContent = "Ingreso exitoso.";
        messageElement.style.color = "green";

        // Enviar correo de notificación
        emailjs.send("service_mpp6kyh", "template_15sq7fi", {
            username: username,
        }).then(() => {
            console.log("Correo enviado.");
        }).catch((err) => {
            console.error("Error al enviar el correo:", err);
            alert("Error al enviar el correo. Intente nuevamente.");
        });

        setTimeout(() => {
            window.location.href = "main.html";
        }, 2000);
    } else {
        messageElement.textContent = "Contraseña incorrecta.";
        messageElement.style.color = "red";
    }
});

// Página principal: Envío de correos
if (document.getElementById("emailForm")) {
    document.getElementById("emailForm").addEventListener("submit", function (e) {
        e.preventDefault();

        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;

        emailjs.send("service_id", "template_id", {
            email: email,
            message: message,
        }).then(() => {
            alert("Correo enviado correctamente.");
        }).catch((err) => {
            console.error("Error al enviar el correo:", err);
            alert("No se pudo enviar el correo. Verifique los datos.");
        });
    });
}

// Cargar imágenes
if (document.getElementById("loadImages")) {
    document.getElementById("loadImages").addEventListener("click", function () {
        fetch("https://jsonplaceholder.typicode.com/photos?_limit=5")
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error al cargar las imágenes: ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                const container = document.getElementById("imageContainer");
                container.innerHTML = ""; // Limpia el contenedor antes de añadir nuevas imágenes

                data.forEach(img => {
                    const imageWrapper = document.createElement("div");
                    imageWrapper.style.textAlign = "center";

                    const image = document.createElement("img");
                    image.src = img.thumbnailUrl; // Usa miniaturas
                    image.alt = img.title;
                    image.style.width = "100px";
                    image.style.height = "100px";
                    image.style.border = "1px solid #ddd";
                    image.style.borderRadius = "5px";

                    const title = document.createElement("p");
                    title.textContent = img.title;
                    title.style.fontSize = "12px";

                    imageWrapper.appendChild(image);
                    imageWrapper.appendChild(title);
                    container.appendChild(imageWrapper);
                });
            })
            .catch(err => {
                console.error("Error al cargar las imágenes:", err);
                alert("No se pudieron cargar las imágenes. Intente nuevamente más tarde.");
            });
    });
}

// Obtener una broma
if (document.getElementById("fetchJoke")) {
    document.getElementById("fetchJoke").addEventListener("click", function () {
        fetch("https://official-joke-api.appspot.com/random_joke")
            .then(response => {
                if (!response.ok) throw new Error("Error al obtener la broma.");
                return response.json();
            })
            .then(data => {
                document.getElementById("joke").textContent = `${data.setup} - ${data.punchline}`;
            })
            .catch(err => {
                console.error("Error al obtener la broma:", err);
                alert("No se pudo obtener la broma. Intente nuevamente.");
            });
    });
}

