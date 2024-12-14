// Event listener for Register DNS button
document.getElementById("registerBtn").addEventListener("click", registerDNS);

// Event listener for Resolve DNS button
document.getElementById("resolveBtn").addEventListener("click", resolveDNS);

// Event listener for Delete DNS button
document.getElementById("deleteBtn").addEventListener("click", deleteDNS);

// Register DNS Entry
function registerDNS() {
  const domain = document.getElementById("domain").value;
  const ip = document.getElementById("ip").value;
  const ipClass = document.getElementById("ipClass").value;

  const data = { domain, ip, ipClass };

  fetch("http://localhost:3000/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data), // Send data to the server as JSON
  })
    .then((response) => response.text())
    .then((data) => {
      alert(data); // Display the server's response
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("There was an error with the request.");
    });
}

// Resolve DNS Entry
function resolveDNS() {
  const domain = document.getElementById("resolveDomain").value;
  const ip = document.getElementById("resolveIP").value;

  fetch(`http://localhost:3000/resolve?domain=${domain}&ip=${ip}`)
    .then((response) => response.text())
    .then((data) => {
      alert(data); // Display the server response
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("There was an error resolving the DNS.");
    });
}

// Delete DNS Entry
function deleteDNS() {
  const domain = document.getElementById("deleteDomain").value;

  fetch("http://localhost:3000/delete", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ domain }), // Send the domain to be deleted
  })
    .then((response) => response.text())
    .then((data) => {
      alert(data); // Display the server response
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("There was an error deleting the DNS.");
    });
}
