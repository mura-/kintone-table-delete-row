((PLUGIN_ID) => {
  kintone.events.on('app.record.index.show', (event) => {
    console.log('これはプラグインのテスト')
    return event;
  });
})(kintone.$PLUGIN_ID);