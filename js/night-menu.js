// 夜の部ワインメニューの静的HTML生成（最新リスト）
document.addEventListener('DOMContentLoaded', function () {
    const wineItems = document.querySelector('.wine-items');
    if (!wineItems) return;
    wineItems.innerHTML = `
      <div class="wine-item">
        <span class="wine-type">WHITE WINE</span>・アメリカ（原産国：アメリカ）
        <span class="wine-name">GOT GRAPES Orange Muscat</span>
        <span class="wine-desc">100% Orange Muscat</span>
      </div>
      <div class="wine-item">
        <span class="wine-type">RED WINE</span>・イタリア（原産国：イタリア）
        <span class="wine-name">JOHA</span>
        <span class="wine-desc">Primitivo 80%, Susumaniello 20%</span>
      </div>
      <div class="wine-item">
        <span class="wine-type">SPARKLING WINE</span>・イタリア（原産国：イタリア）
        <span class="wine-name">La Jara</span>
        <span class="wine-desc">100% Pinot Noir (Blanc de Noir)</span>
      </div>
      <div class="wine-item">
        <span class="wine-type">SPARKLING WINE</span>・イタリア（原産国：イタリア）
        <span class="wine-name">プロセッコ ミレジマート</span>
        <span class="wine-desc">100% Glera</span>
      </div>
    `;
});
