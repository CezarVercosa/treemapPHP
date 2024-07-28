<?php

class TreemapController {
    public function index() {
        require_once '../app/models/TreemapModel.php';
        $model = new TreemapModel();
        $dados = $model->getDados();

        require_once '../app/views/treemap.php';
    }
}
