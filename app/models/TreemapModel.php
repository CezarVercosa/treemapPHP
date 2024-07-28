<?php

class TreemapModel {
    public function getDados() {
        $url = "http://dados.cultura.gov.br/dataset/72d4e4e0-6506-49ee-be75-cb4ce46844f2/resource/ab517acf-3001-44b5-8e70-ccb297c62bed/download/total-consumo-por-cnaeregiao-uf-ano-mes.json";
        $curl = curl_init($url);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        $response = curl_exec($curl);
        curl_close($curl);
        $dados = json_decode($response, true);

        $contagemUF = [];
        foreach ($dados['benf_autorizadas_completo'] as $registro) {
            $uf = $registro['UF'];
            if (!isset($contagemUF[$uf])) {
                $contagemUF[$uf] = 0;
            }
            $contagemUF[$uf]++;
        }

        return $contagemUF;
    }
}
