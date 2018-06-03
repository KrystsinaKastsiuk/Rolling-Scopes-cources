
class TicTacToe {
  constructor(){
    this.symbols = ['O', 'X'],
    this.count = 0,
    this.turns = []
    for (var i = 0; i < 9; i++ ) {
      this.turns[i] = 0;
    }
  }
  
  domCreate() {
    var wrapper = document.createElement('div');
    wrapper.classList.add('wrapper');
    var table = document.createElement('table');
    var tbody = document.createElement('tbody');  
    for (let i = 0; i < 3; i++) {
      let tr = document.createElement('tr');
      for (let n = 0; n < 3; n++) {
        let td = document.createElement('td');
        td.classList.add('cell');
        td.classList.add('active');
        td.id = i*3 + n + 1;
        tr.appendChild(td);
      }
      tbody.appendChild(tr);
    } 
    table.appendChild(tbody);
    wrapper.appendChild(table);
    return wrapper;
  }
  
  listeners() {
    var _this = this;
    var allElem = document.querySelectorAll("td.cell");
    for (var i = 0; i < allElem.length; i++) {  
      allElem[i].addEventListener("click", function(element, i) {
        let num = i;
        if(this.classList.contains('active') && !_this.check()) {
          _this.move(this.id);
          this.innerHTML = _this.symbol();
          this.classList.remove("active");
          if (_this.check()) {
            alert(_this.check());
          }
        }
      });
    }
  }
  
  move(position) {
    if (position < 1 || position > 9 || isNaN(position)) { 
      return 'Select position > 0 and < 10';
    }
    if (this.turns[position - 1] != 0) {
      return 'Position is occupied';
    }
    this.count++;
    this.turns[position - 1] = this.symbol();
    this.turn += 1;
    return this;
  }

  symbol() {
    return this.symbols[this.count % 2];
  }

  check() {
    if (this.checkRow(0,1,2) || this.checkRow(3,4,5) || this.checkRow(6,7,8) || 
        this.checkRow(6,7,8) || this.checkRow(0,4,8) || this.checkRow(2,4,6) || 
        this.checkRow(0,3,6) || this.checkRow(1,4,7) || this.checkRow(2,5,8)) { 
      return this.symbol() + " wins";
    } else if (this.count == 9) {
    return "A draw";
  }
}

checkRow(a,b,c) {
  return (this.turns[a] !== 0 && this.turns[a] == this.turns[b] && this.turns[b] === this.turns[c])
};

}

document.addEventListener('DOMContentLoaded', function() {
  var game = new TicTacToe();
  document.body.appendChild(game.domCreate());
  game.listeners();
});