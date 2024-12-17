<?php
$host = 'localhost';
$db = 'tpux';
$user = 'root';
$pass = '';

$pdo = new PDO("mysql:host=$host;dbname=$db", $user, $pass);
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

require_once 'vendor/autoload.php';
$faker = Faker\Factory::create();

$numProducts = 750;

for ($i = 0; $i < $numProducts; $i++) {
    $name = $faker->word;
    $description = $faker->sentence(10);
    $price = $faker->randomFloat(2, 1, 100);
    $image_url = $faker->imageUrl(400, 300, 'products');

    $stmt = $pdo->prepare("INSERT INTO products (name, description, price, image_url) 
                           VALUES (:name, :description, :price, :image_url)");
    $stmt->execute([
        ':name' => $name,
        ':description' => $description,
        ':price' => $price,
        ':image_url' => $image_url
    ]);
}

echo "Produits générés avec succès!";
?>
