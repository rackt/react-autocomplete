function getActiveDescendantId(listId, index) {
  return index && (listId + '-' + index);
}

module.exports = getActiveDescendantId;