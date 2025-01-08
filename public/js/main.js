const select = (element) => {
    return document.querySelector(element);
}

select('#registerForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    
    let formData = new FormData(select('#registerForm'));

    let formObject = {};
    formData.forEach((value, key) => {
        formObject[key] = value;
    });

    fetch('/api/auth/register', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formObject),
    })
    .then((response) => response.json())
    .then((data) => {
        if(data.success)
        {
            alert(data.message);
            select('#registerForm').reset()
            location.href="/login"
        }
        else
        {
            alert(data.message);
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});

select('#loginForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    
    let formData = new FormData(select('#loginForm'));

    let formObject = {};
    formData.forEach((value, key) => {
        formObject[key] = value;
    });

    fetch('/api/auth/login', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formObject),
    })
    .then((response) => response.json())
    .then((data) => {
        if(data.success)
        {
            alert(data.message);
            select('#loginForm').reset()
            location.href="/"
        }
        else
        {
            alert(data.message);
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});
