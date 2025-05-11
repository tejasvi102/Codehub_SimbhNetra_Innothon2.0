export function getCookie(name){
    const value = `; ${document.cookie}`;
    const part = value.split(`; ${name} = `);
    if (part.length==2){
        return parts.pop().split(';').shift();
    }
    }