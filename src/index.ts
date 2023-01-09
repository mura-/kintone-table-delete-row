((PLUGIN_ID) => {
  kintone.events.on(['app.record.create.show', 'app.record.edit.show'], (event) => {

    // すべてのテーブルを取得し監視する
    const tableBodies = document.querySelectorAll<HTMLTableElement>('table.subtable-gaia > tbody') 
    tableBodies.forEach((tableBody) => {

      let observer = new MutationObserver(mutationRecords => {
        switch (tableBody.rows.length) {
          // TODO: 0の場合にthにボタンを表示する処理
          case 1: {
            // 削除ボタンを取得し表示させる
            const removeRowButton = tableBody.querySelector<HTMLButtonElement>('tr > td.subtable-operation-gaia > button.remove-row-image-gaia');
            if(removeRowButton) removeRowButton.style.display = 'inline-block';
          }
          default:
            return;
        }
      });
    
      observer.observe(tableBody, {
        childList: true,
      });
    });

    return event;
  });
})(kintone.$PLUGIN_ID);