<?php
// Database connection details
$servername = "localhost";
$username = "root"; // Default WAMP username
$password = ""; // Default WAMP password is empty
$dbname = "mydb"; // Replace with your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Fetch employees data
$sql = "SELECT * FROM Employees";
$result = $conn->query($sql);

// Display data
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        echo "<p>Employee: " . $row["first_name"]. " " . $row["last_name"] . "</p>";
    }
} else {
    echo "0 results";
}

$conn->close();
?>
