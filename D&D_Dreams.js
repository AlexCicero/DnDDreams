// D&D_Dreams.js

// Toggle between showing and hiding the dropdown content
function toggleDropdown(dropdownId) {
    // Get all dropdown contents
    var dropdowns = document.getElementsByClassName("dropdown-content");
    
    // Close all dropdowns except the one that was clicked
    for (var i = 0; i < dropdowns.length; i++) {
        if (dropdowns[i].id !== dropdownId) {
            dropdowns[i].classList.remove("show");
        }
    }
    
    // Toggle the clicked dropdown
    document.getElementById(dropdownId).classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(e) {
    if (!e.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        for (var i = 0; i < dropdowns.length; i++) {
            if (dropdowns[i].classList.contains('show')) {
                dropdowns[i].classList.remove('show');
            }
        }
    }
};