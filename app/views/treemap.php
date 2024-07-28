<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Treemap</title>
    <link rel="stylesheet" href="../public/styles.css">
</head>
<body>
    <div id="container">
        <div id="treemap"></div>
    </div>
    <script>
        const contagemUF = <?php echo json_encode($dados); ?>;
    </script>
    <script src="../public/treemap.js"></script>
</body>
</html>
