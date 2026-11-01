function removeItem(list, item){
    let index = list.indexOf(item);
    if (index !== -1){
        list.splice(index, 1);
    }
}