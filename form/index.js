// declaration de variable
const form = document.querySelector('form');
const inputs = document.querySelectorAll(
    'input[type="text"], input[type="password"]'
);
let pseudo, email, password, confirmPass;
const progressBar = document.getElementById('progress-bar');
// creation de fonction



const errorDisplay = (tag, message, valid) => {
    const container = document.querySelector("." + tag+"-container");
    const span = document.querySelector("." + tag+"-container > span");

    if (!valid) {
        container.classList.add('error');
        span.textContent = message;
    } else {
        container.classList.remove('error');
        span.textContent = message;
    }
}

const pseudoChecker = (value) => {
    if (value.length > 0 && (value.length < 3 || value.length > 20)
    )   {
        errorDisplay("pseudo","le pseudo doi faire entre 3 et 20 caracteres"
        );
        pseudo = null;
    } else if(!value.match(/^[a-zA-Z0-9_.-]*$/)) {
        errorDisplay(
        "pseudo",
        "Le pseudo ne doit pas contenir de caracteres speciaux"
        );
        pseudo = null;   
    } else {
        errorDisplay("pseudo", "", true);
        pseudo = value;
    }
};

const emailChecker = (value) => {
    if (!value.match(/^[\w_-]+@[\w-]+\.[a-z]{2,4}$/i)) {
        errorDisplay("email", "Cet mail est invalide");
        email = null;            
    } else {
        errorDisplay("email", "", true);
        email = value;
    }
};
    
    const passwordChecker = (value) => {
        progressBar.classList = "";

        if (
            !value.match(/^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\w]){1,})(?!.*\s).{8,}$/
            )
            ) {
                errorDisplay(
                "password", 
                "Minimum de 8 caracteres, une majuscule, unchiffre eu un caractere special"
                );
                progressBar.classList.add("progressRed");
                password = null;
            } else if (value.length < 12){
                progressBar.classList.add("progressBlue");
                errorDisplay("password", "", true);
                password = value;
            } else {
                progressBar.classList.add("progressGreen");
                errorDisplay("password", "", true);
                password = value;
            }
    };
    
    const confirmChecker = (value) => {
        if (value !== password) {
            errorDisplay("confirm", "Les mots de passe ne correspondent pas");
            confirmPass = false;
        } else {
            errorDisplay("confirm", "", true);
            confirmPass = true;
        }
    };

    inputs.forEach((input) => {
        input.addEventListener('input', (e) => {
            switch (e.target.id) {
                case "pseudo":
                    pseudoChecker(e.target.value);
                    break;
                case "email":
                    emailChecker(e.target.value);
                    break;
                case "password":
                    passwordChecker(e.target.value);
                    break;
                case "confirm":
                    confirmChecker(e.target.value);
                    break;
                default:
                    nul;
//e.target.value c'est ce qui est entrer dans l'input     
        }
    });
});
form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (pseudo && email && password && confirmPass) {
        const data = {
            pseudo: pseudo,
            email: email,
            password: password,
        };
        console.log(data);

        inputs.forEach((input) => (input.value = ""));
        progressBar.classList = "";

        pseudo = null;
        email = null;
        password = null;
        alert("Inscription validee !");
    }   else {
        alert("veuillez remplir correctement les champs");
    }
})