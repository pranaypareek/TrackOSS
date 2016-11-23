function showAlert(id, title, description, $mdDialog) {
  $mdDialog.show(
    $mdDialog.alert()
    .parent(angular.element(document.querySelector('#' + id)))
    .clickOutsideToClose(true)
    .title(title)
    .textContent(description)
    .ariaLabel('Alert Dialog')
    .ok('OK')
  );
}
