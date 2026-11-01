//.click()
// list.shift()  take the first element and remove it
//bombcell.get(cell);

let win = 0;
let clears = [];
let checked = [];
let marked = [];


function table(event){
    let cell = event.target.closest("td");
    if (!cell) return;
    if (!markMode && cell.classList.contains("mark")) return;
    let row = cell.parentElement.rowIndex;
    let col = cell.cellIndex;

    clears = [];
    checked = [];
    if (markMode){
        if (cell.classList.contains("table")){
            cell.classList.remove("table");
            cell.classList.add("mark");
            marked.push(cell);
        }
        else if (cell.classList.contains("mark")){
            cell.classList.remove("mark");
            cell.classList.add("table");
            removeItem(marked, cell);
        }
    }
    else{
        allcells[row][col].classList.remove("table");
        allcells[row][col].classList.add("clor");
        if (bombs.includes(allcells[row][col])){
            winner.innerHTML = 'You Lost'
            cell.innerHTML = '<img src="image/bomb.png" width="24px" height="20px">';
            tab.querySelectorAll("td.mark").forEach(cel => {
                cel.classList.remove("mark");
            });
            if (allclick){
                allclick = false;
                for (let i of allcells){
                    for (let j of i){
                        j.click();
                    }
                }
            }
        }
        else if (clearcell.includes(allcells[row][col])){
            let clears = [[row, col]];
            let checked = [allcells[row][col]];
            let dirs = [[1, 0],[-1, 0],[0, 1],[0, -1]];

            while (clears.length > 0){
                let [r, c] = clears.shift();
                for (let d of dirs){
                    let nr = r + d[0];
                    let nc = c + d[1];
                    if (nr < 0 || nc < 0 || nr >= allcells.length || nc >= allcells[0].length) continue;

                    let neighbor = allcells[nr][nc];
                    if (checked.includes(neighbor)) continue;
                    checked.push(neighbor);

                    if (clearcell.includes(neighbor)){
                        clears.push([nr, nc]);
                        neighbor.classList.remove("table");
                        neighbor.classList.add("clor");
                    }
                    if (bombcell.has(neighbor)){
                        neighbor.click();
                    }
                }
            }
        }
        else if (bombcell.has(cell)){
            cell.classList.add("cclor");
            cell.textContent = bombcell.get(cell);
            win--;
        }
        if (win === 0){
            winner.innerHTML = 'You Won'
        }
    }
}
let allclick = true;
let allcells = [];
let bombs = [];
let bomb = 0;
let bombcell = new Map();
let clearcell = [];


function restart(){
    winner.innerHTML = ''
    win = 0;
    marked = 0;
    allclick = true;
    tab.innerHTML = "";
    for (let i = 0; i < 20; i++) {
        let row = tab.insertRow();
        for (let j = 0; j < 20; j++) {
            row.insertCell();
        }
    }
    allcells = [];
    for (let arow of tab.rows){
        let rowlist = [];
        for (let acol of arow.cells){
            rowlist.push(acol);
        }
        allcells.push(rowlist);
    }
    bombs = [];
    bomb = 0;
    bombcell = new Map();
    clearcell = [];
    for (let i = 0; i < 20; i++){
        for (let j = 0; j < 20; j++){
            allcells[i][j].classList.remove("mark");
            allcells[i][j].classList.remove("clor");
            allcells[i][j].classList.remove("cclor");
            allcells[i][j].classList.add("table");
            num = Math.floor(Math.random() * 19);
            if (num === 5 || num === 6 || num === 7){
                bombs.push(allcells[i][j]);
            }
        }
    }
    for (let i = 0; i < 20; i++){
        for (let j = 0; j < 20; j++){
            if (!bombs.includes(allcells[i][j])){
                checkbomb(i, j);
            }
        }
    }
    clearcell[0].click();
}
/*
        up = therow-1 >= 0;
        down = therow+1 < rows;
        right = thecol+1 < cols;
        left = thecol-1 >= 0;
*/



function checkbomb(i, j){
    let rows = allcells.length;
    let cols = allcells[0].length;
    bomb = 0;
    if (i-1 >=0){
        if (bombs.includes(allcells[i-1][j])){
            bomb++;
        }
        if (j+1 < cols && bombs.includes(allcells[i-1][j+1])){
            bomb++;
        }
        if (j-1 >=0 && bombs.includes(allcells[i-1][j-1])){
            bomb++;
        }
    }
    if (i+1 < rows){
        if (bombs.includes(allcells[i+1][j])){
            bomb++;
        }
        if (j+1 < cols && bombs.includes(allcells[i+1][j+1])){
            bomb++;
        }
        if (j-1 >=0 && bombs.includes(allcells[i+1][j-1])){
            bomb++;
        }
    }
    if (j+1 < cols && bombs.includes(allcells[i][j+1])){
        bomb++;
    }
    if (j-1 >= 0 && bombs.includes(allcells[i][j-1])){
        bomb++;
    }
    if (bomb > 0){
        win++;
        bombcell.set(allcells[i][j], bomb);
    }
    else{
        clearcell.push(allcells[i][j]);
    }
    tab.addEventListener("click", table);
}