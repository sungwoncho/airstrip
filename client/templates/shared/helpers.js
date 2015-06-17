Template.registerHelper('formatDate', function (date) {
  return moment(date).format('MMMM D, YYYY');
});
