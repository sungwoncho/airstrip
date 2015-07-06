Template.registerHelper('formatDate', function (date) {
  if (!date) return;

  var year = date.substring(0,4);
  var month = date.substring(4,6);
  var day = date.substring(6,8);
  return moment(year + '-' + month + '-' + day).format('MMMM D, YYYY');
});
