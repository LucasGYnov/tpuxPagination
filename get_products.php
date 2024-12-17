<?php
header('Content-Type: application/json');

// Connexion à la base de données
try {
    $pdo = new PDO('mysql:host=localhost;dbname=tpux', 'root', '');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
    exit;
}

// Pagination - paramètres
$page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
$limit = 9; // Nombre de produits par page
$offset = ($page - 1) * $limit;

// Récupération des produits
$stmt = $pdo->prepare('SELECT * FROM products LIMIT :offset, :limit');
$stmt->bindValue(':offset', $offset, PDO::PARAM_INT);
$stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
$stmt->execute();

$products = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Compter le nombre total de produits pour la pagination
$totalStmt = $pdo->query('SELECT COUNT(*) FROM products');
$totalProducts = $totalStmt->fetchColumn();
$totalPages = ceil($totalProducts / $limit);

// Retour des produits et des infos de pagination
echo json_encode([
    'products' => $products,
    'pagination' => [
        'currentPage' => $page,
        'totalPages' => $totalPages
    ]
]);
?>
