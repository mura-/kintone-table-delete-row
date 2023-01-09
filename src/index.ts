((PLUGIN_ID) => {
  kintone.events.on(['app.record.create.show', 'app.record.edit.show'], (event) => {

    const tableBody = document.querySelector<HTMLTableElement>('table.subtable-gaia > tbody');
    if(!tableBody) return event;

    let observer = new MutationObserver(mutationRecords => {
      console.log(mutationRecords, tableBody.rows.length); // console.log(the changes)
      switch (tableBody.rows.length) {
        // TODO: 0の場合にthにボタンを表示する処理
        case 1: {
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
    return event;
  });
})(kintone.$PLUGIN_ID);