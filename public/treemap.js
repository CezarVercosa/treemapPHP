document.addEventListener('DOMContentLoaded', function () {
    const containerTreemap = document.getElementById('treemap');
    const totalContagem = Object.values(contagemUF).reduce((a, b) => a + b, 0);
    const maxContagem = Math.max(...Object.values(contagemUF));

    const larguraContainer = containerTreemap.clientWidth;
    const alturaContainer = containerTreemap.clientHeight;
    const areaTotal = larguraContainer * alturaContainer;
    const fatorEscala = areaTotal / totalContagem;

    Object.keys(contagemUF).forEach(uf => {
        const contagem = contagemUF[uf];
        const area = contagem * fatorEscala;
        const largura = Math.sqrt(area * larguraContainer / alturaContainer);
        const altura = Math.sqrt(area * alturaContainer / larguraContainer);
        const intensidadeCor = Math.floor((contagem / maxContagem) * 255);

        const div = document.createElement('div');
        div.style.width = `${largura}px`;
        div.style.height = `${altura}px`;
        div.style.backgroundColor = `rgb(0, 0, ${255 - intensidadeCor})`;
        div.textContent = `${uf}: ${contagem}`;
        div.className = 'item-treemap';

        containerTreemap.appendChild(div);
    });

    ajustarTamanhos();
    window.addEventListener('resize', ajustarTamanhos);

    function ajustarTamanhos() {
        distribuirQuadrados();
    }

    function distribuirQuadrados() {
        const items = Array.from(document.querySelectorAll('.item-treemap'));
        const larguraContainer = containerTreemap.clientWidth;
        const alturaContainer = containerTreemap.clientHeight;
        const rows = [];
        let currentRow = [];

        let rowWidth = 0;
        let rowHeight = 0;

        items.forEach(item => {
            const itemWidth = item.clientWidth;
            const itemHeight = item.clientHeight;

            if (rowWidth + itemWidth > larguraContainer) {
                rows.push(currentRow);
                currentRow = [];
                rowWidth = 0;
                rowHeight = 0;
            }

            currentRow.push(item);
            rowWidth += itemWidth;
            rowHeight = Math.max(rowHeight, itemHeight);
        });

        if (currentRow.length > 0) {
            rows.push(currentRow);
        }

        let yOffset = 0;
        rows.forEach(row => {
            let xOffset = 0;
            row.forEach(item => {
                item.style.position = 'absolute';
                item.style.left = `${xOffset}px`;
                item.style.top = `${yOffset}px`;
                xOffset += item.clientWidth;
            });
            yOffset += rowHeight;
        });
    }
});
