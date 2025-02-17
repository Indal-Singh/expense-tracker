const select = (element) => document.querySelector(element);
const verifyLoginUser = async () => {
    const token = getCookie('token');
    console.log(token);
    try {
        const res = await fetch('/api/auth/verify', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}` 
            }
        });
        
        const data = await res.json();
        
        if (!data?.success) {
            return false;
        } else {
           
            return true;
        }
    } catch (err) {
       
        return false;
    }
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function formatDate(dateString) {
    const date = new Date(dateString);

    // Options for formatting
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true, // Use 12-hour clock
    };

    // Format the date using the options
    return date.toLocaleString('en-US', options);
}

function getFormattedDateTime() {
    const now = new Date();
  
    // Get local date components
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');  // Month is 0-based, so we add 1
    const day = now.getDate().toString().padStart(2, '0');
  
    // Get local time components
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
  
    // Format as 'YYYY-MM-DDTHH:mm'
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }