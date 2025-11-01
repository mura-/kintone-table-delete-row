((PLUGIN_ID) => {
  kintone.events.on(['app.record.create.show', 'app.record.edit.show'], (event) => {

    // すべてのテーブルを取得し監視する
    const tableBodies = document.querySelectorAll<HTMLTableElement>('table.subtable-gaia > tbody')
    tableBodies.forEach((tableBody) => {

      // 削除ボタンを強制的に表示する関数
      const forceShowDeleteButtons = () => {
        const removeRowButtons = tableBody.querySelectorAll<HTMLButtonElement>('tr > td.subtable-operation-gaia > button.remove-row-image-gaia');
        removeRowButtons.forEach((button) => {
          if (button.style.display === 'none' || button.style.display === '') {
            button.style.display = 'inline-block';
          }
        });
      };

      // 初回表示時に削除ボタンを表示
      forceShowDeleteButtons();

      // テーブル内の変更を監視（行の追加・削除）
      const tableObserver = new MutationObserver(() => {
        forceShowDeleteButtons();
      });

      tableObserver.observe(tableBody, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['style']
      });
    });

    return event;
  });
})(kintone.$PLUGIN_ID);