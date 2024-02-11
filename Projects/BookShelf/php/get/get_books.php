<?php
require "../require/db.req.php";

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
} else {
  // Fetch data from a specific table (replace 'your_table' with your actual table name)
  $table = 'bookshelf';
  $sql = "SELECT * FROM $table ORDER BY family ASC, book_order ASC";
  $result = $conn->query($sql);

  if ($result === false) {
    echo json_encode(array("error" => $conn->error));
  } else {
    $data = array();
    // Fetch data row by row
    while ($row = $result->fetch_assoc()) {
      $data[] = array(
        'id' => $row['id'],
        'title' => $row['title'],
        'order' => $row['book_order'],
        'author' => $row['author'],
        'genre' => $row['genre'],
        'publication' => $row['publication_year'],
        'family' => $row['family'],
        'img' => base64_encode($row['img']), // Encode binary data as base64
        'shop' => $row['book_shop'],
      );
    }

    // Set content type header
    header('Content-Type: application/json');

    // Output JSON
    echo json_encode($data);
  }
}

// Close the database connection
$conn->close();
