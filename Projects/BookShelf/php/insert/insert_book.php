<?php

require "../require/db.req.php";

function sanitizeInput($input)
{
  // Trim leading and trailing whitespaces
  $input = trim($input);

  // Remove HTML and PHP tags
  $input = strip_tags($input);

  // Convert special characters to HTML entities
  $input = htmlspecialchars($input, ENT_QUOTES, 'UTF-8');

  return $input;
}

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  // Validate and sanitize other form inputs
  $title = sanitizeInput($_POST["book-title"]);
  $author = sanitizeInput($_POST["book-author"]);
  $genre = sanitizeInput($_POST["book-genre"]);
  $family = sanitizeInput($_POST["book-family"]);
  $year = sanitizeInput($_POST["book-year"]);

  // Check if the title already exists
  $checkStmt = $conn->prepare("SELECT id FROM bookshelf WHERE title = ?");
  $checkStmt->bind_param("s", $title);
  $checkStmt->execute();
  $checkStmt->store_result();

  if ($checkStmt->num_rows > 0) {
    // Title already exists, handle it as needed (display an error message, redirect, etc.)
    header("Location: " . $_SERVER["HTTP_REFERER"] . "?error=already_registered");
    echo "Error: The title already exists in the database.";
  } else {
    // Title does not exist, proceed with inserting the new record
    if (isset($_FILES["image"]) && $_FILES["image"]["error"] == 0) {
      // Read image data
      if ($_FILES["image"]["error"] != 0) {
        echo "Error uploading file. Error code: " . $_FILES["image"]["error"];
        exit;
      }
      $imageData = file_get_contents($_FILES["image"]["tmp_name"]);

      // Insert image and other data into the database
      $insertStmt = $conn->prepare("INSERT INTO bookshelf (title, author, genre, family, publication_year, img) VALUES (?, ?, ?, ?, ?, ?)");
      $insertStmt->bind_param("ssssis", $title, $author, $genre, $family, $year, $imageData); // Assuming all other fields are strings ("ssssb" stands for four strings and one binary)

      if ($insertStmt->execute()) {
        echo "Image and data uploaded and inserted into the database.";
      } else {
        echo "Error inserting data into the database.";
      }

      $insertStmt->close();
    } else {
      echo "Error: Please select a valid image file.";
    }
  }

  $checkStmt->close();
}

// Close the connection
$conn->close();
