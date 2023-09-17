// Change iframe content when clicking on nav elements
document.addEventListener("DOMContentLoaded", function () {
    // Get references to the navigation links and the iframe
    const aboutLink = document.querySelector('a[href="about"]');
    const portfolioLink = document.querySelector('a[href="projects"]');
    const contactLink = document.querySelector('a[href="links"]');
    const iframe = document.querySelector('iframe');

    // Function to update the iframe src
    function updateIframeSrc(src) {
      iframe.src = src;
    }

    // Add click event listeners to the navigation links
    aboutLink.addEventListener("click", function (e) {
      e.preventDefault(); // Prevent the default link behavior
      updateIframeSrc("About/about.html"); // Update the iframe src
    });

    portfolioLink.addEventListener("click", function (e) {
      e.preventDefault();
      updateIframeSrc("Projects/projects.html");
    });

    contactLink.addEventListener("click", function (e) {
      e.preventDefault();
      updateIframeSrc("Links/links.html");
    });
});