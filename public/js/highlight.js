const activePage = window.location.pathname;                                // get page name
const navLinks = document.querySelectorAll('li a').forEach(link => {        // find links
    if(link.href.includes(`${activePage}`)) {                               // find link that matches page name and add class to it
        console.log(`${activePage}`);
        link.parentElement.classList.add('selected');
    }
})